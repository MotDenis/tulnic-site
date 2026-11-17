// Datele structurate (schema.org): le citesc motoarele de căutare și asistenții AI, nu vizitatorii.
// Numele și datele de contact vin din site.ts, iar prețurile din offer.ts, ca să nu se scrie de două ori.
// După publicare, paginile se pot verifica pe https://validator.schema.org/.
import { site } from './site';

const homeUrl = new URL('/', import.meta.env.SITE).href;

// Firma e descrisă complet pe prima pagină (BaseLayout.astro); celelalte pagini trimit la ea prin acest @id.
export const organizationId = `${homeUrl}#organizatie`;

// Unde vin la sediu. Sediul social din Arad e doar adresa oficială, deci nu apare aici.
export const areaServed = [
  { '@type': 'City', name: 'București' },
  { '@type': 'AdministrativeArea', name: 'Ilfov' },
];

// Cine oferă serviciul: numele și adresa site-ului.
const provider = { '@type': 'Organization', '@id': organizationId, name: site.name, url: homeUrl };

type Price = number | readonly [number, number];

// Un serviciu, cu prețurile lui. Pe Servicii, pe Diagnostic IT și pe paginile de nișă.
export const service = (data: {
  name: string;
  serviceType: string;
  description: string;
  url: string;
  offers: object[];
}) => ({
  '@context': 'https://schema.org',
  '@type': 'Service',
  ...data,
  provider,
  areaServed,
});

// Un preț fix, plătit o singură dată.
export const offer = (name: string, price: number) => ({ '@type': 'Offer', name, price, priceCurrency: 'RON' });

// Un interval, când prețul depinde de numărul de calculatoare (de exemplu diagnosticul: 500, 700 sau 900 de lei).
export const offerRange = (name: string, prices: readonly number[]) => ({
  '@type': 'AggregateOffer',
  name,
  priceCurrency: 'RON',
  lowPrice: Math.min(...prices),
  highPrice: Math.max(...prices),
  offerCount: prices.length,
});

// Un preț pe unitate: pe lună la abonamente, pe oră, pe persoană. Un număr sau un interval [minim, maxim].
export const unitOffer = (name: string, price: Price, unitText: string) => ({
  '@type': 'Offer',
  name,
  priceSpecification: {
    '@type': 'UnitPriceSpecification',
    ...(typeof price === 'number' ? { price } : { minPrice: price[0], maxPrice: price[1] }),
    priceCurrency: 'RON',
    unitText,
  },
});

export const monthlyOffer = (name: string, price: Price) => unitOffer(name, price, 'lună');
