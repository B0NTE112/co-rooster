// src/pages/LocatiePage.jsx
import React, { useState, useEffect } from 'react';
import { auth, db } from '../firebase'; // Importeer auth en db
import { onAuthStateChanged } from "firebase/auth";
import { regulierRooster } from '../roosterData'; // We gebruiken hetzelfde rooster
import '../App.css'; // We gebruiken dezelfde styling
import { doc, setDoc, getDoc, collection, query, where, getDocs } from "firebase/firestore";

function LocatiePage() {
  const [currentUser, setCurrentUser] = useState(null);
  const [cogroepStartdatum, setCogroepStartdatum] = useState("");
  
  // State om de locaties in bij te houden, bijv:
  // { 'Interne Geneeskunde': 'OLVG', 'Chirurgie': 'AMC' }
  const [locaties, setLocaties] = useState({});
  const [status, setStatus] = useState(""); // Voor laad/feedback berichten
  const [cogroepData, setCogroepData] = useState([]); // Ruwe data van de hele groep
  const [verwerkteData, setVerwerkteData] = useState(null); // Verwerkt voor de UI
  // NIEUWE STATE: Bepaalt of het invoerformulier verborgen is.
  // We beginnen met 'false' (dus open).
  const [isInputCollapsed, setIsInputCollapsed] = useState(false);
  
  // 1. Luister naar de inlogstatus
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      if (user) {
        // Als gebruiker inlogt, laad hun EERDER opgeslagen data
        laadData(user.uid);
      } else {
        // Als gebruiker uitlogt, reset de state
        setLocaties({});
        setCogroepStartdatum("");
      }
    });
    return () => unsubscribe();
  }, []); // Lege array []: voer dit 1x uit bij het laden

   // NIEUWE useEffect: Reageer op veranderingen in de cogroepStartdatum
  useEffect(() => {
    // Als we een startdatum én een gebruiker hebben...
    if (cogroepStartdatum && currentUser) {
      // ...laad dan de data voor die hele groep
      laadCogroepData(cogroepStartdatum);
    } else {
      // Anders (bv. bij uitloggen), reset het dashboard
      setVerwerkteData(null);
      setCogroepData([]);
    }
  }, [cogroepStartdatum, currentUser]); // <-- Dit is de "dependency array"

  // 2. Functie om bestaande data te LADEN uit Firestore
  const laadData = async (uid) => {
    if (!uid) return;
    setStatus("Bezig met laden...");
    
    // Het 'doc' refereert naar een specifiek document:
    // in collectie 'locaties', met de 'uid' van de gebruiker als ID.
    const docRef = doc(db, "locaties", uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      // Als er data is, zet dit in de state
      const data = docSnap.data();
      setCogroepStartdatum(data.cogroepStartdatum || "");
      // Klap het formulier in, want de gebruiker heeft al data.
      setIsInputCollapsed(true);
      // Converteer de array uit de database terug naar een object
      // voor makkelijke binding met het formulier
      const locatiesObject = data.blokken.reduce((acc, blok) => {
        acc[blok.blokNaam] = blok.locatie;
        return acc;
      }, {});
      setLocaties(locatiesObject);
      setStatus("Je opgeslagen gegevens zijn geladen.");
    } else {
      // Geen data gevonden
      setStatus("Je hebt nog geen locaties opgeslagen.");
      // Zorg dat het formulier open staat, zodat de gebruiker data kan invoeren.
      setIsInputCollapsed(false);
    }
  };

  // 3. Functie om data op te slaan in de state als de gebruiker typt
  const handleLocatieChange = (blokNaam, locatie) => {
    setLocaties(prevLocaties => ({
      ...prevLocaties,
      [blokNaam]: locatie // bv. { 'Interne Geneeskunde': 'AMC' }
    }));
  };

  // 4. Functie om data op te slaan in FIRESTORE
  const handleOpslaan = async () => {
    if (!currentUser) {
      alert("Je moet ingelogd zijn om op te slaan.");
      return;
    }
    if (!cogroepStartdatum) {
      alert("Kies eerst de startdatum van je cogroep.");
      return;
    }

    setStatus("Bezig met opslaan...");
    
    // Converteer het 'locaties' state-object naar een array
    // [ { blokNaam: 'Interne', locatie: 'OLVG' }, ... ]
    const blokkenArray = Object.keys(locaties).map(blokNaam => ({
      blokNaam: blokNaam,
      locatie: locaties[blokNaam] || "" // Sla lege string op als niks is ingevuld
    }));

    // Dit is de data die we in de database willen opslaan
    const dataToSave = {
      naam: currentUser.displayName,
      email: currentUser.email,
      cogroepStartdatum: cogroepStartdatum,
      blokken: blokkenArray
    };

    try {
      // Maak een referentie naar het document (locaties/[GEBRUIKER_ID])
      const docRef = doc(db, "locaties", currentUser.uid);
      
      // Gebruik setDoc om het document te maken of *volledig* te overschrijven
      await setDoc(docRef, dataToSave); 
      
      setStatus("Je locaties zijn opgeslagen!");

      // Herlaad de cogroep-data om jouw wijziging direct te tonen
      laadCogroepData(cogroepStartdatum);

    } catch (error) {
      console.error("Fout bij opslaan: ", error);
      setStatus("Er ging iets mis bij het opslaan.");
    }
  };

  // 5. Functie om data van de HELE cogroep te LADEN
  const laadCogroepData = async (startdatum) => {
    if (!startdatum) return; // Stop als er geen datum is

    setStatus("Cogroep-data laden...");
    
    // Maak een 'query' die zoekt in de 'locaties' collectie
    // naar alle documenten WAAR (where) de 'cogroepStartdatum'
    // gelijk is aan de geselecteerde startdatum.
    const locatiesRef = collection(db, "locaties");
    const q = query(locatiesRef, where("cogroepStartdatum", "==", startdatum));

    try {
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map(doc => doc.data());
      setCogroepData(data); // Sla de ruwe data op
      processData(data); // Stuur de data door om te verwerken
      setStatus("Cogroep-data geladen.");
    } catch (error) {
      console.error("Fout bij laden cogroep-data:", error);
      setStatus("Kon cogroep-data niet laden.");
    }
  };

  // 6. Functie om de ruwe data te VERWERKEN voor weergave
  const processData = (data) => {
    // We willen de data ombouwen van:
    // [ {naam: 'Anne', blokken: [...]}, {naam: 'Bob', blokken: [...] } ]
    //
    // Naar een object, gegroepeerd per co-schap:
    // { 'Interne Geneeskunde': { 'OLVG': ['Anne'], 'AMC': ['Bob'] },
    //   'Chirurgie': { 'Spaarne': ['Anne', 'Bob'] } }

    const verwerkt = {};
    
    // Pak de lijst van relevante blokken (die we ook voor het formulier gebruiken)
    const relevanteBlokken = regulierRooster.filter(
      blok => blok.type === 'coschap' || blok.type === 'stage' || blok.type === 'semiarts'
    );

    // 1. Initialiseer het object met alle co-schappen
    for (const blok of relevanteBlokken) {
      verwerkt[blok.naam] = {};
    }

    // 2. Loop door elke student in de data
    for (const student of data) {
      // 3. Loop door de opgeslagen blokken van die student
      for (const studentBlok of student.blokken) {
        const blokNaam = studentBlok.blokNaam;
        const locatie = studentBlok.locatie;

        // Als het een relevant blok is EN de locatie is ingevuld
        if (verwerkt[blokNaam] && locatie) {
          // Als deze locatie nog niet in ons object zit, maak een lege array
          if (!verwerkt[blokNaam][locatie]) {
            verwerkt[blokNaam][locatie] = [];
          }
          // Voeg de naam van de student toe aan de locatie
          verwerkt[blokNaam][locatie].push(student.naam);
        }
      }
    }
    setVerwerkteData(verwerkt); // Sla de verwerkte data op in de state
  };

  // 5. De UI (render)
  
  // Als de gebruiker niet is ingelogd, toon een melding
  if (!currentUser) {
    return (
      <div className="placeholder-text" style={{padding: '20px'}}>
        Deze tool geeft per cogroepje een overzicht wie waar samen coschappen heeft. Log in met jouw persoonlijke Google account om je locaties in te voeren en te vergelijken wanneer de anderen uit je cogroepje dit ook hebben gedaan.
      </div>
    );
  }

  // Filter het rooster zodat we alleen coschappen tonen
  // (en geen 'vakantie' of 'voorbereidend onderwijs')
  const relevanteBlokken = regulierRooster.filter(
    blok => blok.type === 'coschap' || blok.type === 'stage' || blok.type === 'semiarts'
  );

  // Als de gebruiker wél is ingelogd, toon het formulier
  return (
    <div>
      <h1>Jouw Locaties</h1>
      <p>Als je in deze tool de locaties van jouw coschap invult, zie je ook de locaties van de anderen uit jouw cogroep. Zo kun je makkelijk zien met wie jij op welke plek samen coschappen loopt.</p>
      <button 
        onClick={() => setIsInputCollapsed(!isInputCollapsed)} 
        className="toggle-input-button"
      >
        {isInputCollapsed ? 'Mijn Locaties Wijzigen' : 'Verberg Invoer'}
      </button>
      {/* Dit hele blok wordt nu alleen getoond als isInputCollapsed 'false' is */}
      {!isInputCollapsed && (
        <> {/* We gebruiken een React Fragment (<>) om alles te groeperen */}
      <p>Voer hier in waar jij je coschappen loopt. Deze gegevens worden gedeeld met je cogroep.</p>
      
      {/* 1. De datumkiezer voor de cogroep */}
      <div className="controls" style={{justifyContent: 'flex-start'}}>
        <div className="control-item">
          <label htmlFor="cogroepStartdatum">Startdatum Cogroep:</label>
          <input
            type="date"
            id="cogroepStartdatum"
            value={cogroepStartdatum}
            onChange={e => setCogroepStartdatum(e.target.value)}
          />
        </div>
      </div>

      {/* 2. Het formulier met alle coschappen */}
      <div className="locatie-form">
        {relevanteBlokken.map((blok, index) => (
          <div key={index} className="locatie-invoer-item">
            <label htmlFor={`locatie-${index}`}>
              {blok.naam} ({blok.duurWeken}w)
            </label>
            <input
              type="text"
              id={`locatie-${index}`}
              placeholder="Vul ziekenhuis/locatie in..."
              value={locaties[blok.naam] || ""}
              onChange={e => handleLocatieChange(blok.naam, e.target.value)}
            />
          </div>
        ))}
        
        {/* 3. De Opslaan-knop */}
        <button onClick={handleOpslaan} className="auth-button login" style={{marginTop: '20px'}}>
          Opslaan
        </button>
        {status && <p className="status-bericht">{status}</p>}
      </div>
    </>
      )}
{/* 5. HET MATCHER DASHBOARD */}
      <div className="matcher-dashboard">
        <h2>Cogroep Overzicht voor {cogroepStartdatum}</h2>
        
        {/* Toon dit als de verwerkte data is geladen */}
        {verwerkteData ? (
          <div className="dashboard-grid">
            {Object.keys(verwerkteData).map(blokNaam => (
              <div key={blokNaam} className="blok-overzicht">
                <h3>{blokNaam}</h3>
                
                {/* Check of er überhaupt locaties zijn ingevuld voor dit blok */}
                {Object.keys(verwerkteData[blokNaam]).length === 0 ? (
                  <p className="geen-data">Nog geen locaties ingevuld voor dit blok.</p>
                ) : (
                  Object.keys(verwerkteData[blokNaam]).map(locatieNaam => (
                    <div key={locatieNaam} className="locatie-groep">
                      <h4>{locatieNaam}</h4>
                      <ul>
                        {verwerkteData[blokNaam][locatieNaam].map(naam => (
                          <li key={naam}>
                            {naam}
                            {/* Markeer de ingelogde gebruiker */}
                            {naam === currentUser.displayName && (
                              <span className="jij-marker"> (Jij)</span>
                            )}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))
                )}
              </div>
            ))}
          </div>
        ) : (
          // Toon dit als er geen startdatum is geselecteerd
          cogroepStartdatum ? (
            <p className="placeholder-text">Data laden...</p>
          ) : (
            <p className="placeholder-text">Kies een startdatum om het overzicht te zien.</p>
          )
        )}
      </div>

    </div> // Dit is de sluitende </div> van de hele component
  );
}

export default LocatiePage;