// Worker-ul site-ului tulnic.ro.
// Primește formularul de cerere (POST /api/cerere), îl verifică din nou și îl trimite pe e-mail, apoi duce omul
// pe /cerere-trimisa/ sau pe /cerere-eroare/, cu 303, ca reîncărcarea paginii să nu retrimită formularul.
// Pornește doar pentru /api/* (run_worker_first în wrangler.jsonc); restul site-ului vine direct din dist/, ca înainte.
// Nu păstrează cererile nicăieri în afară de e-mail și nu pune cookie-uri.
import { computerOptions, errorPage, maxLength, maxLinks, requestSubject, sentPage, sourceOptions } from '../src/data/request';

interface Env {
  /** Fișierele site-ului, din dist/. */
  ASSETS: { fetch(request: Request): Promise<Response> };
  /** Cloudflare (send_email în wrangler.jsonc). Nefolosită acum: cere Email Routing pe tulnic.ro sau Workers Paid. */
  EMAIL?: {
    send(message: {
      from: { email: string; name: string };
      to: string;
      subject: string;
      text: string;
      replyTo: string;
    }): Promise<{ messageId: string }>;
  };
  /** Cheia Brevo, ținută ca secret (Worker → Settings → Variables and Secrets), niciodată în repo. */
  BREVO_API_KEY?: string;
  /** Limita de trimiteri (ratelimits în wrangler.jsonc). Fără ea, formularul merge, dar fără limită. */
  RATE_LIMITER?: { limit(options: { key: string }): Promise<{ success: boolean }> };
  FORM_FROM: string;
  FORM_TO: string;
}

interface Fields {
  nume: string;
  birou: string;
  email: string;
  telefon: string;
  calculatoare: string;
  mesaj: string;
  sursa: string;
  pagina: string;
}

interface Mail {
  subject: string;
  text: string;
  replyTo: string;
}

// Cum apare expeditorul în căsuța de e-mail.
const senderName = 'Formular tulnic.ro';

// Un formular completat de om are câțiva KB; ce e mult peste nu se mai citește.
const maxBodyBytes = 32 * 1024;

// Adresa de e-mail, cu aceeași regulă ca browserul la type="email": nume@domeniu.
const emailPattern =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

const linkPattern = /https?:\/\/|www\./gi;

// Etichetarea automată din Google Ads pune gclid în adresa pe care intră omul (pe iPhone, uneori gbraid sau wbraid).
const adParams = ['gclid', 'gbraid', 'wbraid'];

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    // Ce nu e /api/* merge la fișierele site-ului, cu pagina 404 pentru adresele care nu există.
    if (!url.pathname.startsWith('/api/')) return env.ASSETS.fetch(request);

    if (url.pathname !== '/api/cerere' || request.method !== 'POST') {
      return new Response('Metodă nepermisă.\n', {
        status: 405,
        headers: { Allow: 'POST', 'Cache-Control': 'no-store', 'Content-Type': 'text/plain; charset=utf-8' },
      });
    }

    return handleRequest(request, env, url);
  },
};

async function handleRequest(request: Request, env: Env, url: URL): Promise<Response> {
  const goTo = (path: string) =>
    new Response(null, { status: 303, headers: { Location: new URL(path, url).href, 'Cache-Control': 'no-store' } });

  // Doar formulare trimise de pe site: când browserul spune de unde vine cererea, trebuie să fie chiar tulnic.ro.
  const origin = request.headers.get('Origin');
  if (origin !== null && origin !== url.origin) return goTo(errorPage);

  // Cel mult câteva trimiteri pe minut de pe aceeași adresă IP.
  if (env.RATE_LIMITER) {
    const { success } = await env.RATE_LIMITER.limit({ key: request.headers.get('CF-Connecting-IP') ?? 'necunoscut' });
    if (!success) return goTo(errorPage);
  }

  if (Number(request.headers.get('Content-Length') ?? 0) > maxBodyBytes) return goTo(errorPage);

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return goTo(errorPage);
  }

  // Capcana: oamenii nu văd câmpul. Dacă vine completat, cererea se aruncă, iar robotul vede pagina de mulțumire.
  const trap = form.get('website');
  if (trap !== null && trap !== '') return goTo(sentPage);

  const fields = readFields(form);
  if (!fields) return goTo(errorPage);

  try {
    await send(env, compose(fields, request.headers.get('Referer'), url.origin));
  } catch (error) {
    // În Workers Logs apare doar motivul, nu datele din formular.
    console.error('Cererea nu a plecat:', describeError(error));
    return goTo(errorPage);
  }

  return goTo(sentPage);
}

// Aceleași verificări ca în browser (obligatorii, lungimi, e-mail), pentru că browserul poate fi ocolit,
// plus valori doar din liste și cel mult două linkuri în mesaj. Orice abatere: null, adică /cerere-eroare/.
function readFields(form: FormData): Fields | null {
  const values: Record<string, string> = {};
  for (const name of ['nume', 'birou', 'email', 'telefon', 'calculatoare', 'mesaj', 'sursa', 'pagina']) {
    const value = form.get(name) ?? '';
    if (typeof value !== 'string') return null;
    values[name] = clean(value, name === 'mesaj');
  }

  const { nume, birou, email, telefon, calculatoare, mesaj, sursa, pagina } = values;

  if (!nume || !birou || !email || !calculatoare || !sursa) return null;
  if (
    nume.length > maxLength.nume ||
    birou.length > maxLength.birou ||
    email.length > maxLength.email ||
    telefon.length > maxLength.telefon ||
    mesaj.length > maxLength.mesaj
  ) {
    return null;
  }
  if (!emailPattern.test(email)) return null;
  if (!(computerOptions as readonly string[]).includes(calculatoare)) return null;
  if (!(sourceOptions as readonly string[]).includes(sursa)) return null;
  if ((mesaj.match(linkPattern) ?? []).length > maxLinks) return null;

  return { nume, birou, email, telefon, calculatoare, mesaj, sursa, pagina: normalizePage(pagina) };
}

// Fără caractere de control; rândurile noi rămân doar în mesaj. Browserul trimite rândurile din textarea ca \r\n,
// dar maxlength le numără ca pe un singur caracter, așa că și aici devin \n înainte de numărat.
function clean(value: string, multiline: boolean): string {
  const text = value.replace(/\r\n?/g, '\n');
  const cleaned = multiline
    ? text.replace(/[\u0000-\u0008\u000B-\u001F\u007F‪-‮⁦-⁩]/g, '')
    : text.replace(/[\u0000-\u001F\u007F‪-‮⁦-⁩]/g, ' ');
  return cleaned.trim();
}

// Pagina de pe care a plecat cererea, de exemplu /it-contabilitate/. Altceva decât o adresă de pagină nu ajunge în e-mail.
function normalizePage(value: string): string {
  if (!/^\/[a-z0-9/-]{0,100}$/.test(value)) return 'necunoscută';
  return value.endsWith('/') ? value : `${value}/`;
}

// Browserul trimite adresa completă a paginii în Referer doar spre același site (Referrer-Policy din _headers),
// deci aici se vede pagina de pe care a plecat formularul. În e-mail se scrie doar „da” sau „nu se știe”; codul nu se păstrează.
function fromGoogleAd(referer: string | null, origin: string): boolean {
  if (!referer) return false;
  try {
    const page = new URL(referer);
    return page.origin === origin && adParams.some((param) => page.searchParams.has(param));
  } catch {
    return false;
  }
}

function compose(fields: Fields, referer: string | null, origin: string): Mail {
  const sentAt = new Intl.DateTimeFormat('ro-RO', {
    timeZone: 'Europe/Bucharest',
    dateStyle: 'full',
    timeStyle: 'short',
  }).format(new Date());

  const text = [
    'Cerere nouă din formularul de pe tulnic.ro.',
    '',
    `Nume: ${fields.nume}`,
    `Birou: ${fields.birou}`,
    `E-mail: ${fields.email}`,
    `Telefon: ${fields.telefon || '—'}`,
    `Calculatoare: ${fields.calculatoare}`,
    `Cum a aflat de Tulnic IT: ${fields.sursa}`,
    '',
    'Mesaj:',
    fields.mesaj || '—',
    '',
    `Pagina: ${fields.pagina}`,
    `Din reclamă Google: ${fromGoogleAd(referer, origin) ? 'da' : 'nu se știe'}`,
    `Trimisă: ${sentAt} (ora României)`,
  ].join('\n');

  // Răspunsul din căsuța de e-mail merge direct la om, nu la adresa formularului.
  return { subject: requestSubject(fields.pagina), text, replyTo: fields.email };
}

async function send(env: Env, mail: Mail): Promise<void> {
  // Cloudflare, doar dacă legătura send_email e pusă în wrangler.jsonc.
  if (env.EMAIL) {
    await env.EMAIL.send({
      from: { email: env.FORM_FROM, name: senderName },
      to: env.FORM_TO,
      subject: mail.subject,
      text: mail.text,
      replyTo: mail.replyTo,
    });
    return;
  }

  // Brevo, prin API: trimiterea folosită acum.
  if (env.BREVO_API_KEY) {
    const response = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: { 'api-key': env.BREVO_API_KEY, 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        sender: { email: env.FORM_FROM, name: senderName },
        to: [{ email: env.FORM_TO }],
        replyTo: { email: mail.replyTo },
        subject: mail.subject,
        textContent: mail.text,
      }),
    });
    if (!response.ok) throw new Error(`Brevo a răspuns cu ${response.status}`);
    return;
  }

  throw new Error('Nu e configurată nicio trimitere: lipsește secretul BREVO_API_KEY (sau legătura EMAIL).');
}

function describeError(error: unknown): string {
  if (error instanceof Error) {
    const code = (error as Error & { code?: unknown }).code;
    return typeof code === 'string' ? code : error.message;
  }
  return String(error);
}
