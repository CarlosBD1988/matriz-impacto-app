// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Formulario from './components/Formulario/Formulario'; 
import Historico from './components/Historico/Historico';
import Idea from './components/Idea/Idea';
import Inicio from './Inicio';


function App() {
  return (
    <Router>
      <Routes>        
        <Route path="/" element={<Inicio />} />        
        <Route path="/formulario" element={<Formulario />} />     
        <Route path="/historico" element={<Historico />} />
        <Route path="/idea" element={<Idea />} />
      </Routes>
    </Router>
  );
}

export default App;