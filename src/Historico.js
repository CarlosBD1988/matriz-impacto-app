import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';
import { db } from './firebase'; // Asegúrate de importar la instancia de Firebase
import './Historico.css'; // Si deseas añadir estilos personalizados

function Historico() {
  const [evaluaciones, setEvaluaciones] = useState([]); // Estado para almacenar las evaluaciones
  const [loading, setLoading] = useState(true); // Estado para manejar el estado de carga

  useEffect(() => {
    const fetchEvaluaciones = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'evaluaciones')); // Obtén los documentos de la colección 'evaluaciones'
        const datos = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })); // Mapea los documentos a un arreglo de objetos
        setEvaluaciones(datos); // Actualiza el estado con los datos obtenidos
        setLoading(false); // Desactiva el estado de carga
      } catch (error) {
        console.error('Error obteniendo las evaluaciones: ', error);
        setLoading(false);
      }
    };

    fetchEvaluaciones(); // Ejecuta la función para obtener los datos
  }, []); // El array vacío [] asegura que el efecto solo se ejecute una vez al montar el componente

  if (loading) {
    return <p>Cargando datos...</p>; // Mensaje de carga mientras se obtienen los datos
  }

  return (
    <div className="historico-container">
      <h2>Historial de Evaluaciones</h2>
      {evaluaciones.length === 0 ? (
        <p>No hay evaluaciones registradas.</p>
      ) : (
        <table className="historico-table">
          <thead>
            <tr>
              <th>Idea</th>
              <th>Impacto Total</th>
              <th>Esfuerzo Total</th>
              <th>Impacto (%)</th>
              <th>Esfuerzo (%)</th>
              <th>Cuadrante</th>
              <th>Fecha</th>
            </tr>
          </thead>
          <tbody>
            {evaluaciones.map((evaluacion) => (
              <tr key={evaluacion.id}>
                <td>{evaluacion.idea}</td>
                <td>{evaluacion.impactoTotal}</td>
                <td>{evaluacion.esfuerzoTotal}</td>
                <td>{evaluacion.porcentajeImpacto}%</td>
                <td>{evaluacion.porcentajeEsfuerzo}%</td>
                <td>{evaluacion.cuadrante.titulo}</td>
                <td>{new Date(evaluacion.timestamp.seconds * 1000).toLocaleDateString()}</td> {/* Convierte la fecha a formato legible */}
              </tr>
            ))}
          </tbody>
        </table>
      )}
       <Link to="/formulario">
     <button>Realizar nuevo calculo.</button>
   </Link>
    </div>
    
  );
}

export default Historico;
