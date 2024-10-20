import React, { useState } from 'react';
import './Formulario.css'; // Importa el archivo CSS

function Formulario() {
  // Definimos las preguntas en un arreglo
  const preguntas = [
    {
      id: 1,
      texto: "¿Qué tanto contribuye esta propuesta a los objetivos estratégicos de la empresa?",
      opciones: [
        { texto: "Alineado completamente a la estrategia (Impacto +4, Esfuerzo +1)", impacto: 4, esfuerzo: 1 },
        { texto: "Alineado parcialmente a la estrategia (Impacto +2, Esfuerzo +2)", impacto: 2, esfuerzo: 2 },
        { texto: "Alineado mínimamente a la estrategia (Impacto +1, Esfuerzo +3)", impacto: 1, esfuerzo: 3 },
        { texto: "Cero alineación a la estrategia (Impacto +0, Esfuerzo +4)", impacto: 0, esfuerzo: 4 },
      ],
    },
    {
      id: 2,
      texto: "¿Cuánto valor le genera al cliente esta propuesta?",
      opciones: [
        { texto: "Valor significativo para el cliente (Impacto +4, Esfuerzo +1)", impacto: 4, esfuerzo: 1 },
        { texto: "Valor moderado para el cliente (Impacto +2, Esfuerzo +2)", impacto: 2, esfuerzo: 2 },
        { texto: "Valor mínimo para el cliente (Impacto +1, Esfuerzo +3)", impacto: 1, esfuerzo: 3 },
        { texto: "No genera valor para el cliente (Impacto +0, Esfuerzo +4)", impacto: 0, esfuerzo: 4 },
      ],
    },
    // Agregamos más preguntas de la misma manera
    {
      id: 3,
      texto: "¿Qué tan innovadora es la propuesta?",
      opciones: [
        { texto: "Innovación disruptiva (Impacto +4, Esfuerzo +1)", impacto: 4, esfuerzo: 1 },
        { texto: "Innovación incremental (Impacto +2, Esfuerzo +2)", impacto: 2, esfuerzo: 2 },
        { texto: "Poco innovadora (Impacto +1, Esfuerzo +3)", impacto: 1, esfuerzo: 3 },
        { texto: "Nada innovadora (Impacto +0, Esfuerzo +4)", impacto: 0, esfuerzo: 4 },
      ],
    },
    {
      id: 4,
      texto: "¿Qué tan viable es técnicamente la propuesta?",
      opciones: [
        { texto: "Altamente viable (Impacto +4, Esfuerzo +1)", impacto: 4, esfuerzo: 1 },
        { texto: "Moderadamente viable (Impacto +2, Esfuerzo +2)", impacto: 2, esfuerzo: 2 },
        { texto: "Poco viable (Impacto +1, Esfuerzo +3)", impacto: 1, esfuerzo: 3 },
        { texto: "Nada viable (Impacto +0, Esfuerzo +4)", impacto: 0, esfuerzo: 4 },
      ],
    },
    {
      id: 5,
      texto: "¿Cuál es el riesgo asociado a esta propuesta?",
      opciones: [
        { texto: "Riesgo bajo (Impacto +4, Esfuerzo +1)", impacto: 4, esfuerzo: 1 },
        { texto: "Riesgo moderado (Impacto +2, Esfuerzo +2)", impacto: 2, esfuerzo: 2 },
        { texto: "Riesgo alto (Impacto +1, Esfuerzo +3)", impacto: 1, esfuerzo: 3 },
        { texto: "Riesgo muy alto (Impacto +0, Esfuerzo +4)", impacto: 0, esfuerzo: 4 },
      ],
    },
    // Añadimos más preguntas según sea necesario
  ];

  // Estado para almacenar las selecciones de todas las preguntas
  const [selecciones, setSelecciones] = useState({});

  // Estado para almacenar el impacto y esfuerzo total
  const [impactoTotal, setImpactoTotal] = useState(0);
  const [esfuerzoTotal, setEsfuerzoTotal] = useState(0);

  // Función que se ejecuta cuando el usuario selecciona una opción
  const handleSelect = (preguntaId, opcionSeleccionada) => {
    const seleccionAnterior = selecciones[preguntaId];

    // Si ya había una selección anterior, restar sus valores
    if (seleccionAnterior) {
      setImpactoTotal((prev) => prev - seleccionAnterior.impacto);
      setEsfuerzoTotal((prev) => prev - seleccionAnterior.esfuerzo);
    }

    // Actualizar el estado con la nueva selección
    setSelecciones({
      ...selecciones,
      [preguntaId]: opcionSeleccionada,
    });

    // Sumar los valores de la nueva opción seleccionada
    setImpactoTotal((prev) => prev + opcionSeleccionada.impacto);
    setEsfuerzoTotal((prev) => prev + opcionSeleccionada.esfuerzo);
  };

// Función para limpiar las respuestas
const handleReset = () => {
    setSelecciones({});
    setImpactoTotal(0);
    setEsfuerzoTotal(0);
  };


  return (
    <div>      
      <h2>Formulario de Evaluación de Idea de Negocio</h2>
      <form>      
      {/* Mapeamos sobre el arreglo de preguntas para renderizarlas */}
      {preguntas.map((pregunta) => (
        <div key={pregunta.id}>
          <h3>{pregunta.texto}</h3>
          {pregunta.opciones.map((opcion, index) => (
            <div key={index}>
              <label>
                <input
                  type="radio"
                  name={`pregunta${pregunta.id}`}
                  checked={selecciones[pregunta.id]?.impacto === opcion.impacto}
                  onChange={() => handleSelect(pregunta.id, opcion)}
                />
                {opcion.texto}
              </label>
            </div>
          ))}
        </div>
      ))}

        {/* Botón para limpiar las respuestas */}
        <button type="button" onClick={handleReset}>Limpiar Respuestas</button>

    </form>
      {/* Mostrar resultados */}
      <div className="resultados">
        <h3>Resultados Totales:</h3>
        <p>Impacto Total: {impactoTotal}</p>
        <p>Esfuerzo Total: {esfuerzoTotal}</p>
      </div>
    </div>
  );
}

export default Formulario;
