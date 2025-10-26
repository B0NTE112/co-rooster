import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// Importeer je layout-schil
import App from './App'; 

// Importeer je nieuwe pagina's
import RoosterPage from './pages/RoosterPage';
import LocatiePage from './pages/LocatiePage';

// Importeer je globale CSS
import './index.css'; 

// Definieer de "kaart" van je website
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />, // <App> is de schil (met nav) die altijd laadt
    children: [
      // Dit zijn de pagina's die in de <Outlet /> van App geladen worden
      {
        path: '/', // De "homepage"
        element: <RoosterPage />,
      },
      {
        path: '/locaties', // De nieuwe tool
        element: <LocatiePage />,
      },
    ],
  },
]);

// Vertel React om de router te renderen
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);