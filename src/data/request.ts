// Formularul de cerere, într-un singur loc.
// Îl folosesc și formularul (components/RequestForm.astro), și Worker-ul care îl primește (worker/index.ts),
// așa că browserul și serverul verifică exact aceleași liste și lungimi. Le schimbi doar aici.

/** Lungimile maxime: browserul le cere prin maxlength, iar Worker-ul le verifică din nou. */
export const maxLength = {
  nume: 100,
  birou: 120,
  email: 120,
  telefon: 30,
  mesaj: 2000,
} as const;

// Urmează tranșele de preț din offer.ts; „1–2” separă birourile prea mici pentru o cerere calificată (de la 3 calculatoare).
export const computerOptions = ['1–2', '3–10', '11–20', '21–30', 'Peste 30'] as const;

export const sourceOptions = ['Google', 'Facebook', 'Recomandare', 'Altfel'] as const;

/** Cel mult atâtea linkuri în mesaj; peste ele, cererea e tratată ca spam. */
export const maxLinks = 2;

// Subiectul e-mailului, după pagina de pe care pleacă cererea. E același ca în linkurile de e-mail din site.ts,
// ca filtrul din căsuța de e-mail să prindă și cererile din formular. Pentru o pagină de nișă nouă, adaugi aici adresa și subiectul.
const subjects: Record<string, string> = {
  '/it-contabilitate/': 'Cerere diagnostic – contabilitate',
};

export const requestSubject = (page: string) => subjects[page] ?? 'Cerere diagnostic';

// Unde ajunge omul după trimitere. Ambele pagini au noindex și lipsesc din sitemap (astro.config.mjs).
export const sentPage = '/cerere-trimisa/';
export const errorPage = '/cerere-eroare/';
