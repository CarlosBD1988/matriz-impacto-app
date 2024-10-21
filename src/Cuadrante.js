// Cuadrante.js
import React from 'react';
import './Cuadrante.css'; // Asegúrate de crear este archivo para los estilos

const Cuadrante = ({ color, titulo, descripcion }) => {
  return (
    <div className={`cuadrante ${color}`}>
      <h3>{titulo}</h3>
      <p>{descripcion}</p>
    </div>
  );
};

export default Cuadrante;
