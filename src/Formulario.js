import React, { useState } from 'react';
import Swal from 'sweetalert2';

import './Formulario.css'; // Importa el archivo CSS
import Cuadrante from './Cuadrante'; // Asegúrate de importar el nuevo componente


import { collection, addDoc } from 'firebase/firestore';
import { db } from './firebase';


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

  // Estado para la idea de desarrollo innovadora
  // Función que se ejecuta cuando el usuario selecciona una opción
  const [idea, setIdea] = useState('');


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

  const calcularMaximos = () => {
        let maxImpacto = 0;
        let maxEsfuerzo = 0;
        preguntas.forEach(pregunta => {
          const maxOpcion = Math.max(...pregunta.opciones.map(opcion => opcion.impacto));
          const maxEsfuerzoOpcion = Math.max(...pregunta.opciones.map(opcion => opcion.esfuerzo));
          maxImpacto += maxOpcion;
          maxEsfuerzo += maxEsfuerzoOpcion;
        });
        return { maxImpacto, maxEsfuerzo };
      };

      const { maxImpacto, maxEsfuerzo } = calcularMaximos();
      const porcentajeImpacto = ((impactoTotal / maxImpacto) * 100).toFixed(2);
      const porcentajeEsfuerzo = ((esfuerzoTotal / maxEsfuerzo) * 100).toFixed(2);

      const determinarCuadrante = () => {
        if (porcentajeEsfuerzo > 50 && porcentajeImpacto > 50) {
          return { color: 'amarrillo', titulo: 'Ganancia Rápida', descripcion: `Esfuerzo: ${porcentajeEsfuerzo}%, Impacto: ${porcentajeImpacto}%` };
        } else if (porcentajeEsfuerzo <= 50 && porcentajeImpacto > 50) {
          return { color: 'verde', titulo: 'Oportunidades', descripcion: `Esfuerzo: ${porcentajeEsfuerzo}%, Impacto: ${porcentajeImpacto}%` };
        } else if (porcentajeEsfuerzo <= 50 && porcentajeImpacto <= 50) {
          return { color: 'naranja', titulo: 'Menor Ganancia', descripcion: `Esfuerzo: ${porcentajeEsfuerzo}%, Impacto: ${porcentajeImpacto}%` };
        } else {
          return { color: 'rojo', titulo: 'Descartar', descripcion: `Esfuerzo: ${porcentajeEsfuerzo}%, Impacto: ${porcentajeImpacto}%` };
        }
      };

      // Función para limpiar las respuestas
      const handleReset = () => {
        Swal.fire({
          title: '¿Estás seguro?',
          text: "¡Esto limpiará todas las respuestas!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Sí, limpiar',
          cancelButtonText: 'Cancelar'
        }).then((result) => {
          if (result.isConfirmed) {
            setSelecciones({});
            setImpactoTotal(0);
            setEsfuerzoTotal(0);
            setIdea(''); // Limpiar la idea también
            Swal.fire(
              '¡Limpio!',
              'Las respuestas han sido limpiadas.',
              'success'
            );
          }
        });
      };   

  const cuadrante = determinarCuadrante();


  const handleSave = async () => {
    try {
      const docRef = await addDoc(collection(db, 'evaluaciones'), {
        idea,
        selecciones: Object.fromEntries(
          Object.entries(selecciones).map(([preguntaId, opcion]) => [
            preguntaId,
            { texto: opcion.texto, impacto: opcion.impacto, esfuerzo: opcion.esfuerzo }
          ])
        ),
        impactoTotal,
        esfuerzoTotal,
        porcentajeImpacto,
        porcentajeEsfuerzo,
        cuadrante: {
          color: cuadrante.color,
          titulo: cuadrante.titulo,
          descripcion: cuadrante.descripcion,
        },
        timestamp: new Date(),
      });
      console.log("Documento escrito con ID: ", docRef.id);
      
      Swal.fire({
        title: '¡Guardado!',
        text: 'La evaluación ha sido guardada correctamente.',
        icon: 'success',
        confirmButtonText: 'OK'
      });

      // Opcional: puedes limpiar el formulario después de guardar
      handleReset();
    } catch (e) {
      console.error("Error añadiendo documento: ", e);      
      Swal.fire({
        title: 'Error',
        text: 'Hubo un problema al guardar la evaluación.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }
  };
  



  return (
    <div>      
      <h2>Formulario de Evaluación de Idea de Negocio</h2>
      <form>  

        {/* Campo de texto para la idea de desarrollo innovadora */}
       <div>
          <label htmlFor="idea">Idea de desarrollo innovadora:</label>
          <textarea
            id="idea"
            className="textarea-idea"
            value={idea}
            onChange={(e) => setIdea(e.target.value)}
            placeholder="Escribe tu idea aquí..."
          />
        </div>


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
        <button type="button" onClick={handleSave}>Guardar en Base de Datos</button>


    </form>
      {/* Mostrar resultados */}
      <div className="resultados">
        <h3>Resultados Totales:</h3>
        <p>Impacto Total: {impactoTotal} ({porcentajeImpacto}%)</p>
        <p>Esfuerzo Total: {esfuerzoTotal} ({porcentajeEsfuerzo}%)</p>
      </div>

      {/* Mostrar el cuadrante */}
      <Cuadrante color={cuadrante.color} titulo={cuadrante.titulo} descripcion={cuadrante.descripcion} />
    </div>
  );
}

export default Formulario;
