// Datele site-ului, într-un singur loc.

export const site = {
  name: 'Tulnic',
  tagline: 'IT făcut temeinic',
  email: 'contact@tulnic.ro',
  phone: '+40 741 704 551', // TODO: numărul tău
  hours: 'Luni-vineri 15-22, sâmbătă 9-17',
  legal: {
    name: 'Mot Denis-Cristian PFA', // TODO: denumirea exactă din certificatul de înregistrare
    regNo: 'F2/2/2023', // TODO: numărul de ordine în Registrul Comerțului
    cui: '47400356', // TODO: codul unic de înregistrare
    seat: 'Comuna Dieci, Nr 16, Judet Arad', // TODO: exact ca în certificat
  },
} as const;

export const navLinks = [
  { href: '/', label: 'Acasă' },
  { href: '/servicii/', label: 'Servicii' },
  { href: '/de-ce-tulnic/', label: 'De ce Tulnic' },
  { href: '/contact/', label: 'Contact' },
] as const;