import React, { useState , useEffect} from 'react';
import Swal from 'sweetalert2';

import './Formulario.css'; 
import Cuadrante from '../Cuadrante/Cuadrante'; 
import preguntas from '../../servicios/preguntas'; 


import { collection, addDoc ,getDocs } from 'firebase/firestore';
import { db } from '../../servicios/firebase';
import { Link } from 'react-router-dom';

function Formulario() {

  const [selecciones, setSelecciones] = useState({});
  const [impactoTotal, setImpactoTotal] = useState(0);
  const [esfuerzoTotal, setEsfuerzoTotal] = useState(0); 
  //const [idea, setIdea] = useState('');
  const [evaluador, setEvaluador] = useState('');

  const [ideaId, setIdeaId] = useState('');
  const [ideas, setIdeas] = useState([]);

  useEffect(() => {
    const cargarIdeas = async () => {
      const ideasCollection = collection(db, 'ideas'); // Cambia 'ideas' al nombre de tu colección
      const ideasSnapshot = await getDocs(ideasCollection);
      const ideasList = ideasSnapshot.docs.map(doc => ({
        id: doc.id,
        texto: doc.data().idea // Suponiendo que cada documento tiene un campo 'texto'
      }));
      setIdeas(ideasList);
    };
    cargarIdeas();
  }, []);








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
        if (porcentajeEsfuerzo <= 50 && porcentajeImpacto > 50) {
          return { color: 'amarillo', titulo: 'Cuadrante #1 - Ganancia Rápida', descripcion: `Impacto Alto y Esfuerzo Bajo.` };
        } else if (porcentajeEsfuerzo > 50 && porcentajeImpacto > 50) {
          return { color: 'verde', titulo: 'Cuadrante #2 - Oportunidades', descripcion: `Impacto Alto y Esfuerzo Alto` };
        } else if (porcentajeEsfuerzo <= 50 && porcentajeImpacto <= 50) {
          return { color: 'naranja', titulo: 'Cuadrante #3 - Menor Ganancia', descripcion: ` Impacto Bajo y Esfuerzo Bajo` };
        } else {
          return { color: 'rojo', titulo: 'Cuadrante #4 - Descartar', descripcion: `Impacto Bajo y Esfuerzo Alto` };
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
            setEvaluador('');
            //setIdea(''); // Limpiar la idea también
            setIdeaId("");
            Swal.fire(
              '¡Limpio!',
              'Las respuestas han sido limpiadas.',
              'success'
            );
          }
        });
      };   

      const handleResetV2 = () => {
        setSelecciones({});
        setImpactoTotal(0);
        setEsfuerzoTotal(0);
        //setIdea(''); 
        setEvaluador('');
        setIdeaId("");
      };   




  const cuadrante = determinarCuadrante();


  const handleSave = async () => {
    try {
      // Validar que el campo de idea no esté vacío
  if (!ideaId.trim()) 
    {
    Swal.fire({
      title: 'Campo vacío',
      text: 'Por favor, selecciona una idea antes de guardar.',
      icon: 'warning',
      confirmButtonText: 'OK'
    });
    return;
  }
  else if(!evaluador.trim())
    {
      Swal.fire({
        title: 'Campo vacío',
        text: 'Por favor, escribe tu nombre antes de guardar.',
        icon: 'warning',
        confirmButtonText: 'OK'
      });
      return;
    
    }
      const docRef = await addDoc(collection(db, 'evaluaciones'), {
        evaluador,
        ideaId,
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
      handleResetV2();
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
         {/* Campo de selección para la idea de desarrollo innovadora */}
      <div>
          <label htmlFor="idea">Selecciona una idea de desarrollo innovadora:</label>
          <select
            id="idea"
            value={ideaId}
            onChange={(e) => setIdeaId(e.target.value)}
          >
            <option value="">Selecciona una idea...</option>
            {ideas.map((idea) => (
              <option key={idea.id} value={idea.id}>
                {idea.texto}
              </option>
            ))}
          </select>
          <Link to="/idea">
          <button>Crear Idea a evaluar</button>
        </Link>
      </div>

      <div>
          <label htmlFor="evaluador">Nombre del evaluador:</label>
          <input id="evaluador" className="input-profesional" value={evaluador} onChange={(e) => setEvaluador(e.target.value)} placeholder="Evaluador"
          />
      </div>
      
      {/* Campo de texto para la idea de desarrollo innovadora 
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
      */} 

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

          <Link to="/consolidado">
          <button>Ver Consolidados</button>
          </Link>
      </div>

      {/* Mostrar el cuadrante */}
      <Cuadrante color={cuadrante.color} titulo={cuadrante.titulo} descripcion={cuadrante.descripcion} />
    </div>
  );
}

export default Formulario;
