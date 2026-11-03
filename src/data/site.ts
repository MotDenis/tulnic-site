// Datele site-ului, într-un singur loc.

export const site = {
  name: 'Tulnic',
  tagline: 'IT făcut temeinic',
  homeTitle: 'Tulnic — IT pentru birouri mici din București',
  email: 'contact@tulnic.ro',
  phone: '+40 741 704 551',
  hours: 'Luni\u2060–\u2060vineri 9\u2060–\u206021, sâmbătă 9\u2060–\u206017',
  reply: 'De luni până sâmbătă, cererile primite până la ora 15:00 primesc răspuns în aceeași zi.',
  legal: {
    name: 'Mot Denis-Cristian PFA', 
    regNo: 'F2/2/2023',
    cui: '47400356', 
    seat: 'Comuna Dieci, nr. 16, județul Arad',
  },
} as const;

export const navLinks = [
  { href: '/', label: 'Acasă' },
  { href: '/servicii/', label: 'Servicii' },
  { href: '/aplicatii/', label: 'Aplicații' },
  { href: '/site-uri/', label: 'Site-uri' },
  { href: '/de-ce-tulnic/', label: 'De ce Tulnic' },
  { href: '/contact/', label: 'Contact' },
] as const;


// Linkuri de e-mail cu subiectul și întrebările deja scrise.
const mailto = (subject: string, lines: string[]) =>
  `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join('\r\n'))}`;

// Pentru birouri: butonul „Scrieți un e-mail” de pe Contact și din panoul de la finalul paginilor.
export const diagnosticMailto = mailto('Cerere diagnostic', [
  'Bună ziua,',
  '',
  'Numele biroului:',
  'Câți oameni și câte calculatoare:',
  'Ce folosiți pentru e-mail și documente (Google, Microsoft, altceva):',
  'Ce vă supără acum:',
  'Când v-ar conveni o primă vizită:',
]);

// Pentru aplicații și automatizări (pagina Aplicații).
export const appMailto = mailto('Aplicație sau automatizare', [
  'Bună ziua,',
  '',
  'Ce țineți acum în Excel sau faceți de mână:',
  'Câți oameni ar folosi aplicația:',
  'Ce programe folosiți deja (facturare, magazin online, altele):',
  'Până când ați avea nevoie de ea:',
]);

// Pentru firmele de IT care caută un subcontractor (Servicii, #firme-it).
export const partnerMailto = mailto('Colaborare ca subcontractor', [
  'Bună ziua,',
  '',
  'Firma:',
  'Ce lucrări aveți (migrări de servere, backup, rețea, altele):',
  'Cât de des și când ar trebui făcute:',
]);

// Pentru site-uri de prezentare (pagina Site-uri).
export const siteMailto = mailto('Site de prezentare', [
  'Bună ziua,',
  '',
  'Numele firmei și ce faceți:',
  'Aveți deja un site? Dacă da, adresa lui:',
  'Aveți un domeniu (de exemplu firma.ro)?',
  'Vreți să modificați singuri conținutul site-ului?',
  'Până când ați avea nevoie de site:',
]);

// Pentru verificarea gratuită a unui site existent (pagina Site-uri).
export const siteCheckMailto = mailto('Verificare gratuită a site-ului', [
  'Bună ziua,',
  '',
  'Adresa site-ului:',
  'Ce vă nemulțumește acum la el (opțional):',
]);