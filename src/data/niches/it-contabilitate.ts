// Pagina tulnic.ro/it-contabilitate/: IT pentru birourile de contabilitate. Destinația reclamelor pentru contabili.
// Textele vin din proiectul de marketing (brieful din 16 noiembrie 2026) și se pun cuvânt cu cuvânt.
// Prețurile și deplasarea vin din data/offer.ts, iar programul și linkul de e-mail din data/site.ts.
import type { NicheContent } from '../niche';
import { ilfovTravel, lei, leiInText, priceFrom, sizes, vpnAccess } from '../offer';
import { monthlyOffer, offer, unitOffer } from '../schema';
import { accountingMailto, hoursText, nowrap } from '../site';

const diagnostic = priceFrom('diagnostic');
const setup = priceFrom('setup');
const essential = priceFrom('essential');
const standard = priceFrom('standard');
const smallOffice = sizes[0].toLowerCase(); // „până la 10”

// Exemplul de pe pagină: diagnostic, punere în ordine și acces de acasă, cu prețul diagnosticului scăzut din punerea în ordine.
const exampleTotal = diagnostic + setup + vpnAccess.price - diagnostic;

export default {
  title: 'IT pentru birouri de contabilitate din București — Tulnic IT',
  description:
    'Backup verificat, acces de acasă printr-o conexiune protejată (VPN) și conturi în ordine. Pentru birouri de contabilitate din București și Ilfov.',

  intro: {
    h1: 'IT pentru birouri de contabilitate, făcut temeinic',
    lead: 'Pun în ordine accesul de acasă, copiile de siguranță și parolele biroului, la preț fix. Lucrările planificate le fac după program sau sâmbăta, departe de zilele de termen.',
    mailto: accountingMailto,
    note: 'Vorbiți direct cu inginerul care lucrează la sistemele dumneavoastră. Același om, de la început.',
  },

  problems: {
    title: 'Vi se pare cunoscut?',
    items: [
      'Intrați de acasă pe calculatorul de la birou cu un program gratuit și o parolă știută de toți.',
      'Copia de siguranță se face singură, dar nu a încercat nimeni să restaureze ceva din ea.',
      'Semnătura electronică merge pe un singur calculator.',
      'Parolele de la SPV, bănci și e-mail stau într-un fișier.',
      'Windows pornește actualizările când vrea, uneori chiar în ziua de depunere.',
    ],
    outro: 'Niciuna nu vă oprește lucrul azi. Fiecare e un risc pe care îl puteți reduce din timp, cu un cost știut dinainte.',
  },

  services: {
    title: 'Ce fac pentru un birou de contabilitate',
    items: [
      {
        title: 'Lucru de acasă, printr-o conexiune protejată (VPN)',
        text: 'De acasă vă conectați la calculatorul de la birou și lucrați pe el ca de obicei. Programul de contabilitate și datele rămân în birou. Fiecare om are accesul lui, pe care îl pot opri oricând.',
      },
      {
        title: 'Copie de siguranță (backup) verificată prin restaurare',
        text: 'Baza de date a programului de contabilitate se copiază automat, în birou și în afara lui. La început restaurez o copie, ca să știm că se poate folosi. Cu abonament, verific copia în fiecare lună.',
      },
      {
        title: 'Semnătura electronică, pe două calculatoare',
        text: 'Instalez și testez semnătura electronică (token-ul) și pe un al doilea calculator. Notez când expiră certificatul, ca să îl reînnoiți din timp.',
      },
      {
        title: 'Parole și conturi în ordine',
        text: 'Parolele biroului stau într-un singur loc protejat (manager de parole), nu în fișiere. La e-mail, fiecare om intră cu parola și cu un cod de pe telefon.',
      },
      {
        title: 'Actualizări departe de termene',
        text: 'Actualizările și reconfigurările le fac după program sau sâmbăta. Între 20 și 25 ale lunii nu planific nicio lucrare.',
      },
    ],
  },

  prices: {
    title: 'Cât costă',
    intro: `Prețuri pentru un birou cu ${smallOffice} calculatoare. Sunt prețuri finale: Tulnic IT este PFA neplătitor de TVA.`,
    head: ['Serviciu', 'Preț'],
    rows: [
      { label: 'Diagnostic la sediu, cu raport scris', price: lei(diagnostic) },
      { label: 'Punere în ordine', price: lei(setup) },
      { label: `Acces de acasă (VPN), până la ${vpnAccess.people} persoane`, price: lei(vpnAccess.price) },
      { label: 'Abonament Esențial', price: `${lei(essential)} pe lună` },
      { label: 'Abonament Standard', price: `${lei(standard)} pe lună` },
    ],
    notes: [
      'Dacă alegeți punerea în ordine în 30 de zile de la diagnostic, prețul diagnosticului se scade.',
      'Nu există perioadă minimă de contract. Abonamentul se oprește cu 30 de zile de preaviz.',
      'Echipamentele și licențele nu sunt incluse. Le cumpărați pe numele biroului, la prețul furnizorului.',
      `Deplasarea în București e inclusă. În Ilfov se adaugă ${leiInText(ilfovTravel)} la fiecare vizită la sediu.`,
    ],
    example: `Exemplu: un birou cu 6 calculatoare, în care 3 oameni lucrează și de acasă. Diagnosticul, punerea în ordine și accesul de acasă costă împreună ${leiInText(exampleTotal)}, o singură dată. Prețul diagnosticului e deja scăzut. Abonamentul Esențial costă apoi ${leiInText(essential)} pe lună.`,
    link: { href: '/servicii/#preturi', text: 'Prețurile pentru birouri mai mari și ce include fiecare pachet' },
  },

  steps: {
    title: 'Cum lucrez',
    items: [
      'Îmi scrieți sau mă sunați. Răspund în aceeași zi la cererile primite până la ora 15:00, de luni până sâmbătă.',
      `Vin la sediu pentru diagnostic, ${nowrap('2–4 ore')}, într-o zi stabilită împreună. Se poate și după program sau sâmbăta.`,
      'Primiți un raport scris: ce e urgent, ce poate aștepta și cât costă fiecare etapă.',
      'Dacă doriți, pun totul în ordine, la prețul fix din raport.',
      'Cu abonament, urmăresc mai departe copiile de siguranță și actualizările.',
    ],
    links: [
      { href: '/exemplu-raport/', text: 'Vedeți un exemplu de raport' },
      { href: '/diagnostic-it/', text: 'Ce verific la un diagnostic' },
    ],
  },

  data: {
    title: 'Datele clienților dumneavoastră',
    items: [
      'Semnăm un acord de confidențialitate. Unde am acces la date personale, semnăm și un contract de prelucrare a datelor (GDPR, art. 28).',
      'Notez fiecare intervenție. Documentația și parolele rămân ale biroului și vi le predau oricând.',
      'Diagnosticul verifică partea tehnică: copii de siguranță, acces, parole. Nu ține loc de audit GDPR.',
    ],
  },

  about: {
    title: 'Cine vine la sediu',
    text: 'Sunt Denis, inginer. Tulnic IT înseamnă un singur om: vorbiți direct cu mine, de la prima discuție până la fiecare intervenție.',
    link: { href: '/de-ce-tulnic/', text: 'Mai multe despre mine și despre nume' },
  },

  faq: {
    title: 'Întrebări frecvente',
    items: [
      {
        question: 'Putem lucra de acasă în programul de contabilitate?',
        answer: 'Da. Vă conectați printr-o conexiune protejată (VPN) la calculatorul de la birou și lucrați pe el. Programul și datele nu pleacă din birou.',
      },
      {
        question: 'Lucrați cu SAGA, WinMentor sau alt program?',
        answer: 'Mă ocup de calculatoarele, rețeaua și copiile de siguranță pe care rulează programul, oricare ar fi el. Setările din programul de contabilitate rămân la furnizorul lui.',
      },
      {
        question: 'Ce se întâmplă dacă se strică ceva în zilele de declarații?',
        answer: 'Mă sunați sau îmi scrieți. Încep cu ce se poate rezolva de la distanță. Dacă e nevoie să vin la sediu, stabilim pe loc când.',
      },
      {
        question: 'Trebuie să semnăm un contract pe un an?',
        answer: 'Nu. Nu există perioadă minimă, iar abonamentul se oprește cu 30 de zile de preaviz.',
      },
      {
        question: 'Avem deja pe cineva care ne ajută cu calculatoarele. Are rost un diagnostic?',
        answer: 'Raportul vă arată în scris cum stați cu copiile de siguranță, accesul și parolele. Îl puteți folosi și împreună cu omul cu care lucrați acum.',
      },
      {
        question: 'Veniți și în Ilfov?',
        answer: `Da. În București deplasarea e inclusă. În Ilfov se adaugă ${leiInText(ilfovTravel)} la fiecare vizită la sediu.`,
      },
    ],
  },

  cta: {
    title: 'Solicitați un diagnostic',
    text: `Scrieți-mi sau sunați-mă. Program: ${hoursText}.`,
  },

  service: {
    name: 'IT pentru birouri de contabilitate',
    serviceType: 'Servicii IT pentru birouri de contabilitate',
    offers: [
      offer('Diagnostic la sediu, cu raport scris', diagnostic),
      offer('Punere în ordine', setup),
      offer(`Acces de acasă (VPN), până la ${vpnAccess.people} persoane`, vpnAccess.price),
      unitOffer('Acces de acasă (VPN), fiecare persoană în plus', vpnAccess.extraPerson, 'persoană'),
      monthlyOffer('Abonament Esențial', essential),
      monthlyOffer('Abonament Standard', standard),
    ],
  },
} satisfies NicheContent;
