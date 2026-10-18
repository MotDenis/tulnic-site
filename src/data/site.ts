// Datele site-ului, într-un singur loc.

export const site = {
  name: 'Tulnic',
  tagline: 'IT făcut temeinic',
  homeTitle: 'Tulnic — IT pentru birouri mici din București',
  email: 'contact@tulnic.ro',
  phone: '+40 741 704 551',
  hours: 'Luni\u2060–\u2060vineri 15\u2060–\u206022, sâmbătă 9\u2060–\u206017',
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
  'Când vă convine o primă vizită (o după-amiază sau o sâmbătă):',
]);

// Pentru aplicații și automatizări (Servicii, #aplicatii).
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