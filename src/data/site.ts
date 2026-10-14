// Datele site-ului, într-un singur loc.

export const site = {
  name: 'Tulnic',
  tagline: 'IT făcut temeinic',
  homeTitle: 'Tulnic — IT pentru birouri mici din București',
  email: 'contact@tulnic.ro',
  phone: '+40 741 704 551',
  hours: 'Luni\u2060–\u2060vineri 18\u2060–\u206022, sâmbătă 9\u2060–\u206017',
  reply: 'Cererile primite până la ora 16:00 primesc răspuns în aceeași zi, după ora 18:00.',
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


const diagnosticBody = [
  'Bună ziua,',
  '',
  'Numele biroului:',
  'Câți oameni și câte calculatoare:',
  'Ce folosiți pentru e-mail și documente (Google, Microsoft, altceva):',
  'Ce vă supără acum:',
  'Când vă convine o primă vizită (o seară sau o sâmbătă):',
].join('\r\n');

export const diagnosticMailto = `mailto:${site.email}?subject=${encodeURIComponent('Cerere diagnostic')}&body=${encodeURIComponent(diagnosticBody)}`;