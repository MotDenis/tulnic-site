// Paginile de nișă (de exemplu /it-contabilitate/): aceeași așezare, alt conținut.
//
// O pagină nouă de nișă = un singur fișier nou în src/data/niches/, cu numele adresei paginii:
// src/data/niches/it-cabinete-medicale.ts devine tulnic.ro/it-cabinete-medicale/ (și intră singură în sitemap).
// Așezarea e în src/layouts/NichePage.astro, iar ruta în src/pages/[nisa].astro; pe ele nu le mai atingi.
//
// Textele vin din proiectul de marketing și se pun cuvânt cu cuvânt. Fiecare nișă are problemele,
// serviciile, exemplul și întrebările ei, ca paginile să nu fie aproape identice.
// Prețurile, deplasarea și programul se citesc din offer.ts și site.ts, nu se scriu de mână.

export interface Link {
  href: string;
  text: string;
}

export interface NicheContent {
  /** Titlul din Google și din fila browserului, cu „— Tulnic IT” la final; cel mult 60 de caractere. */
  title: string;
  /** Descrierea din Google, cel mult 160 de caractere. Apare și în datele structurate ale serviciului. */
  description: string;

  /** Banda de sus: titlul, textul de sub el, butoanele și oferta de lansare. */
  intro: {
    h1: string;
    lead: string;
    /** Linkul de e-mail din data/site.ts, cu subiectul și întrebările nișei: butoanele „Solicitați un diagnostic” și „Scrieți un e-mail”. */
    mailto: string;
    /** O propoziție sub butoane și sub oferta de lansare. */
    note?: string;
  };

  /** „Vi se pare cunoscut?”: problemele, apoi o concluzie. */
  problems: { title: string; items: string[]; outro?: string };

  /** „Ce fac pentru…”: câte un card pentru fiecare lucru. */
  services: { title: string; items: { title: string; text: string }[] };

  /** „Cât costă”: textul de deasupra tabelului, tabelul, condițiile, un exemplu și legătura spre toate prețurile. */
  prices: {
    title: string;
    intro: string;
    head: [string, string];
    /** Prețurile se scriu cu lei() din data/offer.ts: „500 lei”. */
    rows: { label: string; price: string }[];
    notes: string[];
    example?: string;
    link: Link;
  };

  /** „Cum lucrez”: pașii, numerotați, apoi legăturile. */
  steps: { title: string; items: string[]; links: Link[] };

  /** „Datele clienților…”: confidențialitate și GDPR. */
  data?: { title: string; items: string[] };

  /** „Cine vine la sediu”: textul de lângă portret și legătura spre /de-ce-tulnic/. */
  about?: { title: string; text: string; link: Link };

  /** „Întrebări frecvente”, deschise la clic. */
  faq: { title: string; items: { question: string; answer: string }[] };

  /** Panoul de la final, cu butoanele „Scrieți un e-mail” și „Sunați-mă”. */
  cta: { title: string; text: string };

  /** Serviciul din datele structurate (schema.org): numele, tipul și ofertele, făcute cu funcțiile din data/schema.ts. */
  service: { name: string; serviceType: string; offers: object[] };
}
