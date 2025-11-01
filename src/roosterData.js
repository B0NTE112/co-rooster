//LOCATIES VOOR LOCATIE MATCHER
const dermatologieLocaties = [
  { value: 'Amsterdam UMC', label: 'Amsterdam UMC' },
  { value: 'OLVG', label: 'OLVG' },
  { value: 'Huid Medisch Centrum Osdorpplein', label: 'Huid Medisch Centrum Osdorpplein' },
  { value: 'Huid Medisch Centrum Paasheuvelweg', label: 'Huid Medisch Centrum Paasheuvelweg' },
  { value: 'Huid Medisch Centrum Reguliersgracht', label: 'Huid Medisch Centrum Reguliersgracht' },
  { value: 'Rode Kruis Ziekenhuis', label: 'Rode Kruis Ziekenhuis' },
  { value: 'Oosterwal', label: 'Oosterwal' },
  { value: 'Flevoziekenhuis', label: 'Flevoziekenhuis' },
  { value: 'GGD', label: 'GGD' },
  { value: 'Mohs Klinieken', label: 'Mohs Klinieken' },
];

const interneLocaties = [
  { value: 'Amsterdam UMC', label: 'Amsterdam UMC' },
  { value: 'Flevoziekenhuis', label: 'Flevoziekenhuis' },
  { value: 'Rode Kruis Ziekenhuis', label: 'Rode Kruis Ziekenhuis' },
  { value: 'Tergooi MC', label: 'Tergooi MC' },
  { value: 'OLVG', label: 'OLVG' },
  { value: 'Dijklander Ziekenhuis', label: 'Dijklander Ziekenhuis' },
];

const heelkundeLocaties = [
  { value: 'Amsterdam UMC', label: 'Amsterdam UMC' },
  { value: 'Dijklander Ziekenhuis Hoorn', label: 'Dijklander Ziekenhuis Hoorn' },
  { value: 'Dijklander Ziekenhuis Purmerend', label: 'Dijklander Ziekenhuis Purmerend' },
  { value: 'Tergooi MC', label: 'Tergooi MC' },
  { value: 'Boven IJ', label: 'Boven IJ' },
  { value: 'Rode Kruis Ziekenhuis', label: 'Rode Kruis Ziekenhuis' },
  { value: 'OLVG', label: 'OLVG' },
  { value: 'Zaans MC', label: 'Zaans MC' },
  { value: 'Ziekenhuis Amstelland', label: 'Ziekenhuis Amstelland' },
  { value: 'NoordWest Ziekenhuis', label: 'NoordWest Ziekenhuis' },
  { value: 'Flevoziekenhuis', label: 'Flevoziekenhuis' },
];

const oogheelkundeLocaties = [
  { value: 'Dijklander Ziekenhuis Purmerend', label: 'Dijklander Ziekenhuis Purmerend' },
  { value: 'OLVG Oost', label: 'OLVG Oost' },
  { value: 'Bergman Clinics Hilversum', label: 'Bergman Clinics Hilversum' },
  { value: 'OMC Zaandam', label: 'OMC Zaandam' },
  { value: 'Oogcentrum Noordholland', label: 'Oogcentrum Noordholland' },
  { value: 'Amsterdam UMC', label: 'Amsterdam UMC' },
];

const neurologieLocaties = [
  { value: 'Amsterdam UMC', label: 'Amsterdam UMC' },
  { value: 'Flevoziekenhuis', label: 'Flevoziekenhuis' },
  { value: 'Boven IJ', label: 'Boven IJ' },
  { value: 'Dijklander Ziekenhuis Hoorn', label: 'Dijklander Ziekenhuis Hoorn' },
  { value: 'Dijklander Ziekenhuis Purmerend', label: 'Dijklander Ziekenhuis Purmerend' },
  { value: 'Noordwest Ziekenhuisgroep Alkmaar', label: 'Noordwest Ziekenhuisgroep Alkmaar' },
  { value: 'OLVG Oost en West', label: 'OLVG Oost en West' },
  { value: 'Spaarne Gasthuis Haarlem', label: 'Spaarne Gasthuis Haarlem' },
  { value: 'Tergooi Ziekenhuis', label: 'Tergooi Ziekenhuis' },
  { value: 'Zaans Medisch Centrum', label: 'Zaans Medisch Centrum' },
];

const psychiatrieLocaties = [
  { value: 'Amsterdam UMC', label: 'Amsterdam UMC' },
  { value: 'Arkin/Mentrum', label: 'Arkin/Mentrum' },
  { value: 'Parnassia', label: 'Parnassia' },
  { value: 'Noordwest Ziekenhuisgroep', label: 'Noordwest Ziekenhuisgroep' },
  { value: 'OLVG West', label: 'OLVG West' },
  { value: 'Rode Kruis Ziekenhuis Beverwijk', label: 'Rode Kruis Ziekenhuis Beverwijk' },
  { value: 'Dijklander Ziekenhuis Purmerend/Hoorn', label: 'Dijklander Ziekenhuis Purmerend/Hoorn' },
  { value: 'Zaans Medisch Centrum', label: 'Zaans Medisch Centrum' },
  { value: 'Spaarne Gasthuis', label: 'Spaarne Gasthuis' },
  { value: 'GGZ Centraal Lelystad', label: 'GGZ Centraal Lelystad' },
];

const gynaecologieLocaties = [
  { value: 'Amsterdam UMC', label: 'Amsterdam UMC' },
  { value: 'Zaans Medisch Centrum', label: 'Zaans Medisch Centrum' },
  { value: 'Tergooi MC', label: 'Tergooi MC' },
  { value: 'NoordWest Ziekenhuis: Locatie Alkmaar', label: 'NoordWest Ziekenhuis: Locatie Alkmaar' },
  { value: 'NoordWest Ziekenhuis: Locatie den Helder', label: 'NoordWest Ziekenhuis: Locatie den Helder' },
  { value: 'OLVG', label: 'OLVG' },
  { value: 'Flevoziekenhuis', label: 'Flevoziekenhuis' },
  { value: 'Ziekenhuis Amstelland', label: 'Ziekenhuis Amstelland' },
  { value: 'Dijklander Ziekenhuis Hoorn en Purmerend', label: 'Dijklander Ziekenhuis Hoorn en Purmerend' },
];

const kindergeneeskundeLocaties = [
  { value: 'Emma Kinderziekenhuis AUMC', label: 'Emma Kinderziekenhuis AUMC' },
  { value: 'Universitair Ziekenhuis Antwerpen', label: 'Universitair Ziekenhuis Antwerpen' },
  { value: 'Ziekenhuis Amstelland', label: 'Ziekenhuis Amstelland' },
  { value: 'Boven IJ', label: 'Boven IJ' },
  { value: 'Zaans MC', label: 'Zaans MC' },
  { value: 'Tergooi MC', label: 'Tergooi MC' },
  { value: 'Rode Kruis Ziekenhuis Beverwijk', label: 'Rode Kruis Ziekenhuis Beverwijk' },
  { value: 'NoordWest Ziekenhuis Alkmaar', label: 'NoordWest Ziekenhuis Alkmaar' },
  { value: 'Dijklander Ziekenhuis Purmerend/Hoorn', label: 'Dijklander Ziekenhuis Purmerend/Hoorn' },
  { value: 'Bravis Ziekenhuis', label: 'Bravis Ziekenhuis' },
  { value: 'Flevoziekenhuis', label: 'Flevoziekenhuis' },
  { value: 'OLVG Oost', label: 'OLVG Oost' },
  { value: 'OLVG West', label: 'OLVG West' },
];

const poliInterneLocaties = [
  { value: 'Amsterdam UMC', label: 'Amsterdam UMC' },
  { value: 'Ziekenhuis Amstelland', label: 'Ziekenhuis Amstelland' },
  { value: 'Boven IJ', label: 'Boven IJ' },
  { value: 'Flevoziekenhuis', label: 'Flevoziekenhuis' },
  { value: 'OLVG locatie Oost', label: 'OLVG locatie Oost' },
  { value: 'Tergooi Ziekenhuis', label: 'Tergooi Ziekenhuis' },
  { value: 'Dijklander Ziekenhuis locatie Hoorn', label: 'Dijklander Ziekenhuis locatie Hoorn' },
];

const poliHeelkundeLocaties = [
  { value: 'Ziekenhuis Amstelland', label: 'Ziekenhuis Amstelland' },
  { value: 'Flevoziekenhuis', label: 'Flevoziekenhuis' },
  { value: 'NoordWest Ziekenhuis', label: 'NoordWest Ziekenhuis' },
  { value: 'OLVG Oost', label: 'OLVG Oost' },
  { value: 'Tergooi', label: 'Tergooi' },
  { value: 'Dijklander Ziekenhuis Purmerend', label: 'Dijklander Ziekenhuis Purmerend' },
  { value: 'Dijklander Ziekenhuis Hoorn', label: 'Dijklander Ziekenhuis Hoorn' },
  { value: 'Zaans MC', label: 'Zaans MC' },
  { value: 'Boven IJ', label: 'Boven IJ' },
];

const knoLocaties = [
  { value: 'Amsterdam UMC', label: 'Amsterdam UMC' },
  { value: 'Ziekenhuis Amstelland', label: 'Ziekenhuis Amstelland' },
  { value: 'Antoni van Leeuwenhoek', label: 'Antoni van Leeuwenhoek' },
  { value: 'Flevoziekenhuis', label: 'Flevoziekenhuis' },
  { value: 'OLVG Oost', label: 'OLVG Oost' },
  { value: 'OLVG West', label: 'OLVG West' },
  { value: 'Tergooi', label: 'Tergooi' },
];

// Hier definieer je de structuur van je roosters.
// Pas dit aan met de EXACTE volgorde en duur van jouw universiteit!

export const regulierRooster = [
//Masterfase 1
    { naam: 'Intro + Voorbereidend onderwijs', duurWeken: 4, type: 'voorbereidend', fase: 1 },
    { naam: 'Dermatologie', duurWeken: 2, type: 'coschap', fase: 1, mogelijkeLocaties: dermatologieLocaties },
    { naam: 'Interne Geneeskunde', duurWeken: 9, type: 'coschap', fase: 1, mogelijkeLocaties: interneLocaties },
    { naam: 'Vakantie', duurWeken: 1, type: 'vakantie', fase: 1 },
    { naam: 'Voorbereidend onderwijs', duurWeken: 2, type: 'voorbereidend', fase: 1 },
    { naam: 'Heelkunde', duurWeken: 6, type: 'coschap', fase: 1, mogelijkeLocaties: heelkundeLocaties },
    { naam: 'Vakantie', duurWeken: 5, type: 'vakantie', fase: 1 },

//Masterfase 2
    { naam: 'Voorbereidend onderwijs', duurWeken: 1, type: 'voorbereidend', fase: 2 },
    { naam: 'Oogheelkunde', duurWeken: 3, type: 'coschap', fase: 2, mogelijkeLocaties: oogheelkundeLocaties },
    { naam: 'Neurologie', duurWeken: 6, type: 'coschap', fase: 2, mogelijkeLocaties: neurologieLocaties },
    { naam: 'Voorbereidend onderwijs', duurWeken: 1, type: 'voorbereidend', fase: 2 },
    { naam: 'Psychiatrie', duurWeken: 6, type: 'coschap', fase: 2, mogelijkeLocaties: psychiatrieLocaties },
    { naam: 'Vakantie', duurWeken: 3, type: 'vakantie', fase: 2 },
    { naam: 'Voorbereidend onderwijs', duurWeken: 2, type: 'voorbereidend', fase: 2 },
    { naam: 'Gynaecologie', duurWeken: 6, type: 'coschap', fase: 2, mogelijkeLocaties: gynaecologieLocaties },
    { naam: 'Kindergeneeskunde', duurWeken: 6, type: 'coschap', fase: 2, mogelijkeLocaties: kindergeneeskundeLocaties },
    { naam: 'Vakantie', duurWeken: 5, type: 'vakantie', fase: 2 },

//Masterfase 3
    { naam: 'Voorbereidend onderwijs', duurWeken: 1, type: 'voorbereidend', fase: 3 },
    { naam: 'Verbredend coschap', duurWeken: 6, type: 'coschap', fase: 3 },
    { naam: 'Poli interne geneeskunde', duurWeken: 3, type: 'coschap', fase: 3, mogelijkeLocaties: poliInterneLocaties },
    { naam: 'Poli heelkunde', duurWeken: 3, type: 'coschap', fase: 3, mogelijkeLocaties: poliHeelkundeLocaties },
    { naam: 'Vakantie', duurWeken: 1, type: 'vakantie', fase: 3 },
    { naam: 'Voorbereidend onderwijs', duurWeken: 1, type: 'voorbereidend', fase: 3 },
    { naam: 'KNO', duurWeken: 3, type: 'coschap', fase: 3, mogelijkeLocaties: knoLocaties },
    { naam: 'Huisartsgeneeskunde', duurWeken: 9, type: 'coschap', fase: 3 },
    { naam: 'Vakantie', duurWeken: 4, type: 'vakantie', fase: 3 },
    { naam: 'Voorbereidend onderwijs', duurWeken: 1, type: 'voorbereidend', fase: 3 },
    { naam: 'Sociale geneeskunde', duurWeken: 3, type: 'coschap', fase: 3 },
    { naam: 'Vakantie', duurWeken: 1, type: 'vakantie', fase: 3 },
    { naam: 'Senior coschap', duurWeken: 16, type: 'semiarts', fase: 3 },

//Masterfase 4
    { naam: 'Keuze coschap', duurWeken: 8, type: 'semiarts', fase: 4, blockId: 'keuze' },
    { naam: 'Vakantie', duurWeken: 1, type: 'vakantie', fase: 4, blockId: 'keuze' },
    { naam: 'Wetenschappelijke stage', duurWeken: 16, type: 'semiarts', fase:4, blockId: 'stage' },
    { naam: 'Vakantie', duurWeken: 8, type: 'vakantie', fase: 4, blockId: 'stage' },
];

export const locatieOpties = [
  { value: 'Amsterdam UMC, locatie AMC', label: 'Amsterdam UMC, locatie AMC' },
  { value: 'Amsterdam UMC, locatie VUMC', label: 'Amsterdam UMC, locatie VUMC' },
  { value: 'Amsterdam UMC', label: 'Amsterdam UMC' },
  { value: 'OLVG', label: 'OLVG' },
  { value: 'Huid Medisch Centrum Osdorpplein', label: 'Huid Medisch Centrum Osdorpplein' },
  { value: 'Huid Medisch Centrum Paasheuvelweg', label: 'Huid Medisch Centrum Paasheuvelweg' },
  { value: 'Huid Medisch Centrum Reguliersgracht', label: 'Huid Medisch Centrum Reguliersgracht' },
  { value: 'Rode Kruis Ziekenhuis', label: 'Rode Kruis Ziekenhuis' },
  { value: 'Oosterwal', label: 'Oosterwal' },
  { value: 'Flevoziekenhuis', label: 'Flevoziekenhuis' },
  { value: 'GGD', label: 'GGD' },
  { value: 'Mohs Klinieken', label: 'Mohs Klinieken' },
  { value: 'Tergooi MC', label: 'Tergooi MC' },
  { value: 'Dijklander Ziekenhuis', label: 'Dijklander Ziekenhuis' },
  { value: 'Dijklander Ziekenhuis Hoorn', label: 'Dijklander Ziekenhuis Hoorn' },
  { value: 'Dijklander Ziekenhuis Purmerend', label: 'Dijklander Ziekenhuis Purmerend' },
  { value: 'Boven IJ', label: 'Boven IJ' },
  { value: 'Zaans MC', label: 'Zaans MC' },
  { value: 'Ziekenhuis Amstelland', label: 'Ziekenhuis Amstelland' },
  { value: 'NoordWest Ziekenhuis', label: 'NoordWest Ziekenhuis' },
]

