// Hier definieer je de structuur van je roosters.
// Pas dit aan met de EXACTE volgorde en duur van jouw universiteit!

export const regulierRooster = [
//Masterfase 1
    { naam: 'Intro + Voorbereidend onderwijs', duurWeken: 4, type: 'voorbereidend', fase: 1 },
    { naam: 'Dermatologie', duurWeken: 2, type: 'coschap', fase: 1 },
    { naam: 'Interne Geneeskunde', duurWeken: 9, type: 'coschap', fase: 1 },
    { naam: 'Vakantie', duurWeken: 1, type: 'vakantie', fase: 1 },
    { naam: 'Voorbereidend onderwijs', duurWeken: 2, type: 'voorbereidend', fase: 1 },
    { naam: 'Heelkunde', duurWeken: 6, type: 'coschap', fase: 1 },
    { naam: 'Vakantie', duurWeken: 5, type: 'vakantie', fase: 1 },

//Masterfase 2
    { naam: 'Voorbereidend onderwijs', duurWeken: 1, type: 'voorbereidend', fase: 2 },
    { naam: 'Oogheelkunde', duurWeken: 3, type: 'coschap', fase: 2 },
    { naam: 'Neurologie', duurWeken: 6, type: 'coschap', fase: 2 },
    { naam: 'Voorbereidend onderwijs', duurWeken: 1, type: 'voorbereidend', fase: 2 },
    { naam: 'Psychiatrie', duurWeken: 6, type: 'coschap', fase: 2 },
    { naam: 'Vakantie', duurWeken: 3, type: 'vakantie', fase: 2 },
    { naam: 'Voorbereidend onderwijs', duurWeken: 2, type: 'voorbereidend', fase: 2 },
    { naam: 'Gynaecologie', duurWeken: 6, type: 'coschap', fase: 2 },
    { naam: 'Kindergeneeskunde', duurWeken: 6, type: 'coschap', fase: 2 },
    { naam: 'Vakantie', duurWeken: 5, type: 'vakantie', fase: 2 },

//Masterfase 3
    { naam: 'Voorbereidend onderwijs', duurWeken: 1, type: 'voorbereidend', fase: 3 },
    { naam: 'Verbredend coschap', duurWeken: 6, type: 'coschap', fase: 3 },
    { naam: 'Poli interne geneeskunde', duurWeken: 3, type: 'coschap', fase: 3 },
    { naam: 'Poli heelkunde', duurWeken: 3, type: 'coschap', fase: 3 },
    { naam: 'Vakantie', duurWeken: 1, type: 'vakantie', fase: 3 },
    { naam: 'Voorbereidend onderwijs', duurWeken: 1, type: 'voorbereidend', fase: 3 },
    { naam: 'KNO', duurWeken: 3, type: 'coschap', fase: 3 },
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

//Data voor locatie kiezer app
export const locatieOpties = [
  { value: 'Amsterdam UMC, locatie AMC', label: 'Amsterdam UMC, locatie AMC' },
  { value: 'Amsterdam UMC, locatie VUMC', label: 'Amsterdam UMC, locatie VUMC' },
  { value: 'OLVG, locatie Oost', label: 'OLVG, locatie Oost' },
  { value: 'OLVG, locatie West', label: 'OLVG, locatie West' },
  { value: 'Spaarne Gasthuis, Haarlem', label: 'Spaarne Gasthuis, Haarlem' },
  { value: 'Spaarne Gasthuis, Hoofddorp', label: 'Spaarne Gasthuis, Hoofddorp' },
  { value: 'Antoni van Leeuwenhoek', label: 'Antoni van Leeuwenhoek' },
];