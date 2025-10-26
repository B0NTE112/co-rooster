import React, { useState, useEffect } from 'react';
import { Outlet, Link } from 'react-router-dom';
import './App.css';
import { auth } from './firebase';
import { 
  GoogleAuthProvider, 
  signInWithPopup, 
  signOut, 
  onAuthStateChanged 
} from "firebase/auth";

function App() {
  // 4. Maak een 'state' aan om de ingelogde gebruiker bij te houden
  const [currentUser, setCurrentUser] = useState(null);

  // 5. Gebruik 'useEffect' om te luisteren naar inlog-veranderingen
  //    Firebase vertelt ons automatisch wie de gebruiker is.
  useEffect(() => {
    // 'onAuthStateChanged' is een listener die afgaat zodra iemand
    // inlogt of uitlogt.
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      // 'user' is het user-object als je ingelogd bent,
      // of 'null' als je uitgelogd bent.
      setCurrentUser(user);
    });

    // Dit is een 'cleanup' functie die de listener stopt
    // als de component verdwijnt.
    return () => unsubscribe();
  }, []); // De lege array [] betekent: "doe dit 1x bij het laden"


  // 6. Maak de inlog- en uitlogfuncties
  const handleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      // Het inloggen is gelukt. De 'onAuthStateChanged' (hierboven)
      // regelt nu automatisch het updaten van de 'currentUser' state.
    } catch (error) {
      console.error("Fout bij inloggen:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      // Het uitloggen is gelukt. 'onAuthStateChanged' (hierboven)
      // updatet de 'currentUser' state nu naar 'null'.
    } catch (error) {
      console.error("Fout bij uitloggen:", error);
    }
  };


  return (
    <div className="site-wrapper">
      <nav className="main-nav">
        <ul>
          <li>
            <Link to="/">Rooster Generator</Link>
          </li>
          <li>
            <Link to="/locaties">Locatie Matcher</Link>
          </li>
        </ul>

        {/* 7. HIER KOMT DE LOGIN UI (in de navigatiebalk) */}
        <div className="login-section">
          {currentUser ? (
            // Als er een gebruiker IS:
            <>
              <span className="welcome-text">
                Welkom, {currentUser.displayName}
              </span>
              <button onClick={handleLogout} className="auth-button logout">
                Uitloggen
              </button>
            </>
          ) : (
            // Als er GEEN gebruiker is:
            <button onClick={handleLogin} className="auth-button login">
              Login met Google
            </button>
          )}
        </div>
      </nav>

      <main className="content">
        <Outlet />
      </main>
    </div>
  );
}

export default App;