// Oferta pentru birouri, într-un singur loc.
// Prețurile de aici apar pe Acasă și pe Servicii; le schimbi doar aici.

export const sizes = ['Până la 10', '11–20', '21–30'] as const;

export const officePrices = [
  { id: 'diagnostic', name: 'Diagnostic', period: 'o singură dată', prices: [500, 700, 900] },
  { id: 'setup', name: 'Punere în ordine', period: 'o singură dată', prices: [2000, 3500, 5000] },
  { id: 'essential', name: 'Abonament Esențial', period: 'lunar', prices: [350, 550, 750] },
  { id: 'standard', name: 'Abonament Standard', period: 'lunar', prices: [700, 1100, 1500] },
] as const;

export const hourlyRate = 150; // ore peste cele incluse și schimbări în aplicații

// Acces de acasă printr-o conexiune protejată (VPN): un preț pentru primele persoane, apoi un preț pentru fiecare persoană în plus.
// Include configurarea, instalarea pe calculatoarele de acasă și instrucțiunile scrise; echipamentele și licențele nu sunt incluse.
export const vpnAccess = { price: 500, people: 5, extraPerson: 50 } as const;

// Deplasarea: în București e inclusă; în Ilfov se adaugă suma de aici la fiecare vizită la sediu.
// Diagnosticele gratuite din oferta de lansare nu plătesc deplasarea.
export const ilfovTravel = 50;

export const appPrices = {
  internalApp: [6000, 12000],
  integration: [2000, 5000],
  hosting: [150, 400], // pe lună
} as const;

// Site-uri de prezentare (pagina Site-uri). Un preț sau un interval; prețul fix se stabilește după structură.
export const sitePrices = {
  onePage: 500, // o singură pagină
  presentation: [1000, 1500], // până la șase pagini
  wordpress: [1500, 2000], // WordPress, până la opt pagini, modificate de client
  wordpressCare: 200, // întreținere WordPress, pe lună
} as const;

// Verificarea gratuită a unui site existent (pagina Site-uri). Pune false când nu mai ai timp de ea.
export const siteCheckOffer = true;

// TODO: confirmă statutul de TVA. Dacă devii plătitor, schimbă textul.
// Statutul de TVA mai e scris în textele de pe /diagnostic-it/, din src/data/niches/ și în blocul „Ce primiți” de pe /servicii/.
export const vatNote = 'PFA neplătitor de TVA, deci prețurile sunt finale.';

// Oferta de lansare: câte locuri au mai rămas din cele trei.
// Scazi numărul după fiecare birou; la 0, oferta dispare singură de pe tot site-ul.
export const launchSpotsLeft: number = 2;
export const launchOffer = launchSpotsLeft > 0;

// „mai sunt trei locuri”, „mai sunt două locuri”, „a mai rămas un singur loc”
const spotWords: Record<number, string> = { 2: 'două', 3: 'trei' };
export const launchSpotsText =
  launchSpotsLeft === 1 ? 'a mai rămas un singur loc' : `mai sunt ${spotWords[launchSpotsLeft] ?? launchSpotsLeft} locuri`;

type PackageId = (typeof officePrices)[number]['id'];

const formatNumber = (value: number) => value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');

// Spațiul dintre număr și „lei” nu se rupe pe rânduri diferite.
// În tabele: „500 lei”.
export const lei = (value: number) => `${formatNumber(value)}\u00a0lei`;

export const leiRange = ([min, max]: readonly [number, number]) =>
  `${formatNumber(min)}–${formatNumber(max)}\u00a0lei`;

// În frază: „500 de lei”, „2.500 de lei”, dar „15 lei” și „101 lei”, după regula lui „de” din română.
const de = (value: number) => (value >= 20 && (value % 100 === 0 || value % 100 >= 20) ? 'de\u00a0' : '');

export const leiInText = (value: number) => `${formatNumber(value)}\u00a0${de(value)}lei`;

// „500–900 de lei”; liniuța nu rămâne singură la capăt de rând.
export const leiRangeInText = ([min, max]: readonly [number, number]) =>
  `${formatNumber(min)}\u2060–\u2060${formatNumber(max)}\u00a0${de(max)}lei`;

export const priceFrom = (id: PackageId) =>
  officePrices.find((item) => item.id === id)?.prices[0] ?? 0;

// Cel mai mic și cel mai mare preț al unui pachet, de exemplu la diagnostic: 500 și 900.
export const priceRange = (id: PackageId) => {
  const prices = officePrices.find((item) => item.id === id)?.prices ?? [0];
  return [Math.min(...prices), Math.max(...prices)] as const;
};
