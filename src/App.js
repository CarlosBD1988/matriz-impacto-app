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
        <Route path="/" element={<Inicio />} />        
        <Route path="/formulario" element={<Formulario />} />     
        <Route path="/historico" element={<Historico />} />
      </Routes>
    </Router>
  );
}

export default App;