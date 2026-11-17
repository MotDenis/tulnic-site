// Datele site-ului, într-un singur loc.

// Programul, într-un singur loc: din el se scriu programul afișat pe site și cel din datele structurate (schema.org).
// Orele sunt întregi: 9 înseamnă 9:00.
const schedule = [
  { days: 'luni–vineri', dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: 9, closes: 21 },
  { days: 'sâmbătă', dayOfWeek: ['Saturday'], opens: 9, closes: 17 },
] as const;

// Liniuța dintre zile sau dintre ore nu rămâne singură la capăt de rând: \u2060 leagă caracterele vecine.
const joinDash = (text: string) => text.replace(/–/g, '\u2060–\u2060');

// „Luni–vineri 9–21, sâmbătă 9–17”: în subsol, pe Contact și pe Servicii.
const hoursShort = schedule.map((s) => joinDash(`${s.days} ${s.opens}–${s.closes}`)).join(', ');

export const site = {
  name: 'Tulnic IT',
  tagline: 'IT pentru birouri mici, făcut temeinic',
  homeTitle: 'Tulnic IT — servicii IT pentru birouri mici din București',
  email: 'contact@tulnic.ro',
  phone: '+40 741 704 551',
  hours: hoursShort.charAt(0).toUpperCase() + hoursShort.slice(1),
  reply: 'De luni până sâmbătă, cererile primite până la ora 15:00 primesc răspuns în aceeași zi.',
  legal: {
    name: 'Mot Denis-Cristian PFA', 
    regNo: 'F2/2/2023',
    cui: '47400356', 
    seat: 'Comuna Dieci, nr. 16, județul Arad',
  },
  // Profilurile Tulnic IT de pe alte site-uri: apar în footer și în datele structurate (sameAs).
  social: {
    facebook: 'https://www.facebook.com/tulnic.ro',
    google: 'https://www.google.com/maps?cid=11009406650961651517',
  },
} as const;

// „luni–vineri 9:00–21:00, sâmbătă 9:00–17:00”: programul scris în frază, ca în ghidul de voce.
export const hoursText = schedule.map((s) => joinDash(`${s.days} ${s.opens}:00–${s.closes}:00`)).join(', ');

// Același program, în format structurat, pentru datele structurate (schema.org).
export const openingHours = schedule.map((s) => ({
  '@type': 'OpeningHoursSpecification',
  dayOfWeek: s.dayOfWeek,
  opens: `${String(s.opens).padStart(2, '0')}:00`,
  closes: `${String(s.closes).padStart(2, '0')}:00`,
}));

// Numărul de telefon pentru linkurile tel:, fără spații.
export const tel = site.phone.replace(/[^+\d]/g, '');

// Textul nu se rupe pe rânduri diferite, de exemplu „2–4 ore”: spațiile devin neseparabile, iar liniuța se leagă de vecini.
export const nowrap = (text: string) => joinDash(text).replace(/ /g, '\u00a0');

// Pentru titluri și descrieri (Google, Facebook): spații obișnuite, fără caracterele care leagă cuvintele.
export const plainText = (text: string) => text.replace(/\u00a0/g, ' ').replace(/\u2060/g, '');

export const navLinks = [
  { href: '/', label: 'Acasă' },
  { href: '/servicii/', label: 'Servicii' },
  { href: '/aplicatii/', label: 'Aplicații' },
  { href: '/site-uri/', label: 'Site-uri' },
  { href: '/de-ce-tulnic/', label: 'De ce Tulnic' },
  { href: '/contact/', label: 'Contact' },
] as const;

// Linkurile din subsol, sub numele site-ului. Meniul de sus rămâne cel din navLinks.
export const footerLinks = [
  { href: '/diagnostic-it/', label: 'Diagnostic IT' },
  { href: '/it-contabilitate/', label: 'IT pentru contabilitate' },
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

// Pentru birourile de contabilitate (pagina IT pentru contabilitate).
export const accountingMailto = mailto('Cerere diagnostic – contabilitate', [
  'Bună ziua,',
  '',
  'Numele biroului:',
  'Câți oameni și câte calculatoare:',
  'Ce program de contabilitate folosiți:',
  'Câți oameni lucrează și de acasă:',
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