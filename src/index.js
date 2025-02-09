import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'; // ✅ Importamos Tailwind CSS
import App from './App';

// Renderiza la aplicación en el div con id="root" dentro de index.html
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
