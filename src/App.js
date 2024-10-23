// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Formulario from './Formulario'; // Importa el componente del formulario
import Historico from './Historico'; // Componente del histórico que crearás más tarde
import Inicio from './Inicio';

function App() {
  return (
    <Router>
      <Routes>
        {/* Ruta por defecto que cargará el componente Inicio */}
        <Route path="/" element={<Inicio />} />
        {/* Ruta para el componente Formulario */}
        <Route path="/formulario" element={<Formulario />} />
        {/* Ruta para el componente Ver Histórico (aún por crear) */}
        <Route path="/historico" element={<Historico />} />
      </Routes>
    </Router>
  );
}

export default App;