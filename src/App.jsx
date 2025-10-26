import * as ics from 'ics';
import React, { useState, useMemo } from 'react';
import { regulierRooster } from './roosterData.js';
import {addWeeks, format, subDays, addDays, startOfWeek, endOfWeek, areIntervalsOverlapping, differenceInDays, getDay,} 

from 'date-fns';
import { nl } from 'date-fns/locale';
import './App.css';

// Helper functie om datums netjes te tonen
function formatDate(datum) {
  // Formatteer naar "26 okt 2025"
  return format(datum, 'd MMM yyyy', { locale: nl });
}

function App() {
  // 3. STATE: Dit onthoudt wat de gebruiker kiest
  const [startDate, setStartDate] = useState(null);

  // 4. BEREKENING: Dit berekent het rooster
  // 'useMemo' zorgt dat dit alleen herberekend wordt als de state verandert
const berekendRooster = useMemo(() => {
    // 1. CONTROLEER OF ER EEN STARTDATUM IS
    if (!startDate) return [];

    // Leest de startdatum correct in, ongeacht de tijdzone.
    const parts = startDate.split('-'); 
    let huidigeDatum = new Date(parts[0], parts[1] - 1, parts[2]); 

    const gekozenStructuur = regulierRooster;
    const berekendeBlokken = []; // Hier bouwen we het rooster op

    const getChristmas = (date) => new Date(date.getFullYear(), 11, 25); // 25 dec

    const isItChristmas = (start_date, end_date, christmas) => {
      return christmas >= start_date && christmas <= end_date;
    };
    
    const ChristmasInWeekend = (christmas) => {
      const dayOfWeek = getDay(christmas); // 0=Zondag, 6=Zaterdag
      return dayOfWeek === 0 || dayOfWeek === 6;
    };

    const ChristmasInFirstWeek = (start_date, christmas) => {
      const end_first_week = addDays(start_date, 6);
      return christmas >= start_date && christmas <= end_first_week;
    };

    const ChristmasInLastWeek = (end_date, christmas) => {
      const start_last_week = subDays(end_date, 6);
      return christmas >= start_last_week && christmas <= end_date;
    };
    
    const calculateWeeksToChristmas = (start_date, christmas) => {
      // +1 om de startdag mee te tellen
      const days = differenceInDays(christmas, start_date) + 1;
      return Math.floor(days / 7);
    };

    // Helper om een kerstblok-object te maken
    const createKerstBlok = (fase, startDatumBlok1) => {
      return {
        naam: 'Kerstvakantie',
        type: 'vakantie',
        fase: fase, 
        start: startDatumBlok1,
        eind: addDays(startDatumBlok1, 6),
      };
    };

      for (const blok of gekozenStructuur) {
      
      let blokData = { ...blok }; // Een kopie om mee te werken
      let blokStart = new Date(huidigeDatum);
      let blokEind = addDays(addWeeks(blokStart, blokData.duurWeken), -1);
      
      let kerstToegevoegdDezeLoop = 0; // Vervangt 'christmas_week' uit het voorbeeld
      const christmas = getChristmas(blokStart);

      // if (isItChristmas(...))
      if (isItChristmas(blokStart, blokEind, christmas) && blokData.type !== 'vakantie') {
        
        // 1. is not in weekend
        if (!ChristmasInWeekend(christmas)) {
          
          // 1.1 christmas is in first week
          if (ChristmasInFirstWeek(blokStart, christmas)) {
            // Voeg kerst VOOR het blok toe
            berekendeBlokken.push(createKerstBlok(blokData.fase, blokStart));
            
            // Pas het coschap-blok aan (schuift 1 week op)
            blokStart = addWeeks(blokStart, 1);
            blokEind = addWeeks(blokEind, 1);
          }
          // 1.2 christmas not in first week
          else {
            let weeks_block_1 = calculateWeeksToChristmas(blokStart, christmas);
            let eindBlok1 = addDays(addWeeks(blokStart, weeks_block_1), -1);

            // Voeg Blok 1 toe
            berekendeBlokken.push({ ...blokData, naam: `${blokData.naam} (Deel 1)`, start: blokStart, eind: eindBlok1 });
            // Voeg Kerst toe (start 1 dag na eindBlok1)
            berekendeBlokken.push(createKerstBlok(blokData.fase, addDays(eindBlok1, 1)));
            
            // Pas het 'huidige' blok aan om 'Blok 2' te worden
            blokStart = addDays(eindBlok1, 8); // 1 dag + 7 dagen vakantie
            blokEind = addWeeks(blokEind, 1); // Totale einddatum schuift 1 week
            blokData.naam = `${blokData.naam} (Deel 2)`;
          }
          kerstToegevoegdDezeLoop = 1;
        }
        // 2. is in weekend
        else {
          
          // 2.1 christmas is in last week
          if (ChristmasInLastWeek(blokEind, christmas)) {
            // Voeg kerst NA het blok toe
            // We voegen het normale blok toe, en *daarna* het kerstblok
            berekendeBlokken.push({ ...blokData, start: blokStart, eind: blokEind });
            berekendeBlokken.push(createKerstBlok(blokData.fase, addDays(blokEind, 1)));
            kerstToegevoegdDezeLoop = 1;
          }
          // 2.2 christmas is not in last week
          else {
            // Logica is (bijna) identiek aan 1.2, maar 'weeks_block_1' is +1
            let weeks_block_1 = calculateWeeksToChristmas(blokStart, christmas) + 1;
            let eindBlok1 = addDays(addWeeks(blokStart, weeks_block_1), -1);

            // Voeg Blok 1 toe
            berekendeBlokken.push({ ...blokData, naam: `${blokData.naam} (Deel 1)`, start: blokStart, eind: eindBlok1 });
            // Voeg Kerst toe
            berekendeBlokken.push(createKerstBlok(blokData.fase, addDays(eindBlok1, 1)));

            // Pas het 'huidige' blok aan om 'Blok 2' te worden
            blokStart = addDays(eindBlok1, 8);
            blokEind = addWeeks(blokEind, 1);
            blokData.naam = `${blokData.naam} (Deel 2)`;
            kerstToegevoegdDezeLoop = 1;
          }
        }
      }

      // Voeg het (eventueel aangepaste) blok toe,
      // *behalve* in scenario 2.1 waar het al was toegevoegd.
      if (!(kerstToegevoegdDezeLoop === 1 && ChristmasInWeekend(christmas) && ChristmasInLastWeek(blokEind, christmas))) {
        berekendeBlokken.push({
          ...blokData,
          start: blokStart,
          eind: blokEind,
        });
      }

      // 5. UPDATE DE CURSOR (huidigeDatum)
      // Vertaald uit: date.setDate(date.getDate() + 7 * (masterProgram[i].weeks + christmas_week))
      // Dit betekent dat de *oorspronkelijke* duur + de kerstweek wordt opgeteld.
      
      // We zetten de cursor op de dag NA het *laatste* berekende blok-einde
      const laatsteBerekendeEinddatum = berekendeBlokken[berekendeBlokken.length - 1].eind;
      huidigeDatum = addDays(laatsteBerekendeEinddatum, 1);

    } // Einde for...of loop

    // 6. FINALISEER DE DATA (voor weergave)
    return berekendeBlokken.map(item => {
      const duurInDagen = differenceInDays(item.eind, item.start) + 1;
      const weken = Math.floor(duurInDagen / 7);
      const dagen = duurInDagen % 7;
      
      let duurString;
      if (dagen === 0) {
        duurString = `${weken} ${weken === 1 ? 'week' : 'weken'}`;
      } else {
        duurString = `${weken}w, ${dagen}d`;
      }

      return {
        ...item, // naam, type, fase
        startString: formatDate(item.start),
        eindString: formatDate(item.eind),
        duur: duurString,
      };
    });

  }, [startDate]);

const handleExport = () => {
    if (!berekendRooster || berekendRooster.length === 0) {
      alert("Genereer eerst een rooster voordat je kunt exporteren.");
      return;
    }
    
    // Converteer de rooster-items...
    const events = berekendRooster.map(item => {
      // +1 dag toevoegen voor .ics bestanden
      const icsEindDatum = addDays(item.eind, 1);
      return {
        title: item.naam,
        start: [item.start.getFullYear(), item.start.getMonth() + 1, item.start.getDate()],
        end: [icsEindDatum.getFullYear(), icsEindDatum.getMonth() + 1, icsEindDatum.getDate()],
        description: `Masterfase ${item.fase}, Duur: ${item.duur}`,
      };
    });
    
    // Maak het .ics bestand...
    const { error, value } = ics.createEvents(events);
    
    if (error) {
      console.error(error);
      alert("Er ging iets mis bij het maken van het kalenderbestand.");
      return;
    }
    
    // Trigger de download...
    const blob = new Blob([value], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'co-rooster.ics');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // 5. RENDER (JSX): Dit is de HTML die je op het scherm ziet
  return (
    <div className="container">
      <header>
        <h1>Co-Rooster Generator</h1>
        <p>Vul je startdatum master in en zie je planning.</p>
      </header>

      <div className="controls">
        <div className="control-item">
          <label htmlFor="startDate">Startdatum Master:</label>
          <input
            type="date"
            id="startDate"
            // Als de datum verandert, update de state
            onChange={e => setStartDate(e.target.value)}
          />

        </div>
      <div className="control-item">
          <button 
            id="exportButton" 
            onClick={handleExport}
            disabled={!berekendRooster.length} 
          >
            Exporteer naar Kalender
          </button>
        </div>
      </div>

      <div className="rooster-lijst">
        {/* Als er nog geen datum is, toon een melding */}
        {!startDate && (
          <p className="placeholder-text">Kies een startdatum om je rooster te genereren.</p>
        )}

        {/* Loop door het berekende rooster en toon elk blok */}
{berekendRooster.map((item, index) => {
  // Bepaal of we een titel moeten tonen:
  // 1. Is het de allereerste (index === 0)? Ja, toon titel.
  // 2. Is de fase anders dan de fase van het *vorige* item? Ja, toon titel.
  const showFaseTitel = index === 0 || item.fase !== berekendRooster[index - 1].fase;

  // We gebruiken een React Fragment (<>) om de titel en het item te groeperen
  return (
    <React.Fragment key={index}>
      {/* Als showFaseTitel waar is, toon deze H2-titel */}
      {showFaseTitel && (
        <h2 className="fase-titel">Masterfase {item.fase}</h2>
      )}

      {/* Dit is je bestaande rooster-item-div */}
      <div className={`rooster-item ${item.type}`}>
        <div className="rooster-info">
          <h3>{item.naam}</h3>
          <p>{item.startString} - {item.eindString}</p>
        </div>
 	<div className="rooster-duur">
 		 {item.duur}
	</div>
      </div>
    </React.Fragment>
  );
})}
      </div>
    </div>
  );
}

export default App;