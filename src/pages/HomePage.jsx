import React from 'react';
import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <div>
      <h1>Welkom op de Co-assistent Hub</h1>
      <p>Dit is de startpagina. Vanaf hier kun je naar de verschillende tools.</p>
      <Link to="/rooster">
        <button>Ga naar de Rooster Generator</button>
      </Link>
    </div>
  );
}

export default HomePage;