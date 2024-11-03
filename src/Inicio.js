import React from 'react';
import { Link } from 'react-router-dom';

function Inicio() {
  return (
    <div>
      <h1>Bienvenido</h1>
      <div>
      <Link to="/idea">
          <button>Crear Idea a evaluar</button>
        </Link>
        
        <Link to="/formulario">
          <button>Calcular Matriz</button>
        </Link>
          
        <Link to="/consolidado">
          <button>Ver Consolidado de evaluaciones</button>
        </Link>        
      </div>
    </div>
  );
}

export default Inicio;
