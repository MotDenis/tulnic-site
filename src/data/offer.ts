// Oferta pentru birouri, într-un singur loc.
// Prețurile de aici apar pe Acasă și pe Servicii; le schimbi doar aici.

export const sizes = ['Până la 10', '11-20', '21-30'] as const; // calculatoare

export const officePrices = [
  { id: 'diagnostic', name: 'Diagnostic', period: 'o singură dată', prices: [500, 700, 900] },
  { id: 'setup', name: 'Punere în ordine', period: 'o singură dată', prices: [2000, 3500, 5000] },
  { id: 'essential', name: 'Abonament Esențial', period: 'lunar', prices: [350, 550, 750] },
  { id: 'standard', name: 'Abonament Standard', period: 'lunar', prices: [700, 1100, 1500] },
] as const;

export const hourlyRate = 150; // ore peste cele incluse și schimbări în aplicații

export const appPrices = {
  internalApp: [6000, 12000],
  integration: [2000, 5000],
  hosting: [150, 400], // pe lună
} as const;

// TODO: confirmă statutul de TVA. Dacă devii plătitor, schimbă textul.
export const vatNote = 'PFA neplătitor de TVA, deci prețurile sunt finale.';

// Oferta de lansare. Pune false după primele trei birouri.
export const launchOffer = true;

type PackageId = (typeof officePrices)[number]['id'];

const formatNumber = (value: number) => value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');

// Spațiul dintre număr și „lei” nu se rupe pe rânduri diferite.
export const lei = (value: number) => `${formatNumber(value)}\u00a0lei`;

export const leiRange = ([min, max]: readonly [number, number]) =>
  `${formatNumber(min)}–${formatNumber(max)}\u00a0lei`;

export const priceFrom = (id: PackageId) =>
  officePrices.find((item) => item.id === id)?.prices[0] ?? 0;