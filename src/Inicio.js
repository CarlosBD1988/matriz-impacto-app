import React from 'react';
import { Link } from 'react-router-dom';

function Inicio() {
  return (
    <div>
      <h1>Bienvenido</h1>
      <div>
        <Link to="/formulario">
          <button>Calcular Matriz</button>
        </Link>
        <Link to="/historico">
          <button>Ver Histórico</button>
        </Link>
      </div>
    </div>
  );
}

export default Inicio;
