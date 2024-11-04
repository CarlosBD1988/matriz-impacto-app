import React, { useState , useEffect} from 'react';
import { collection,getDocs,query,where,deleteDoc,doc } from 'firebase/firestore';
import { db } from '../../servicios/firebase';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';


import preguntas from '../../servicios/preguntas'; 
import Cuadrante from '../Cuadrante/Cuadrante'

import './Consolidado.css'

function Consolidado() {
    
    const [ideaId, setIdeaId] = useState('');
    const [ideas, setIdeas] = useState([]);
    const [evaluaciones, setEvaluaciones] = useState([]);
    const [impactoMaximo, setImpactoMaximo] = useState(0);
    const [esfuerzoMaximo, setEsfuerzoMaximo] = useState(0);

    const [porcentajeImpacto, setPorcentajeImpacto] = useState(0);
    const [porcentajeEsfuerzo, setPorcentajeEsfuerzo] = useState(0);
    const [cuadrante, setCuadrante] = useState(null);


    
    useEffect(() => {
        const cargarIdeas = async () => {
            try {
                const ideasCollection = collection(db, 'ideas');
                const ideasSnapshot = await getDocs(ideasCollection);
                const ideasList = ideasSnapshot.docs.map(doc => ({
                    id: doc.id,
                    texto: doc.data().idea
                }));
                console.log('Ideas cargadas:', ideasList); // Agrega esta línea para verificar los datos
                setIdeas(ideasList);
            } catch (error) {
                console.error('Error al cargar ideas:', error); // Agrega manejo de errores
            }
        };
        cargarIdeas();
    }, []);
    
    useEffect(() => {

        const calcularTotalesYPorcentajes = (evaluacionesList) => {
            const totalImpacto = evaluacionesList.reduce((acc, evalua) => acc + evalua.impactoTotal, 0);
            const totalEsfuerzo = evaluacionesList.reduce((acc, evalua) => acc + evalua.esfuerzoTotal, 0);
            const numEvaluaciones = evaluacionesList.length;
            console.log("Sumatorias de evaluaciones: "+totalImpacto+"-"+ totalEsfuerzo + "-" + numEvaluaciones)
    
            if (numEvaluaciones > 0 && impactoMaximo > 0 && esfuerzoMaximo > 0) {
                const porcentajeImpactoCalc = (totalImpacto / (impactoMaximo * numEvaluaciones)) * 100;
                const porcentajeEsfuerzoCalc = (totalEsfuerzo / (esfuerzoMaximo * numEvaluaciones)) * 100;
                console.log("Impacto y esfuero maximo posible por evaluacion: "+impactoMaximo+"-"+ esfuerzoMaximo)
                console.log("Porcentaje y esfuermo maxismo consolidaod:"+porcentajeImpactoCalc+"-"+ porcentajeEsfuerzoCalc)
                setPorcentajeImpacto(porcentajeImpactoCalc);
                setPorcentajeEsfuerzo(porcentajeEsfuerzoCalc);
                
                // Determinar el cuadrante basado en los porcentajes
                setCuadrante(determinarCuadrante(porcentajeImpactoCalc, porcentajeEsfuerzoCalc));
            } else {
                setPorcentajeImpacto(0);
                setPorcentajeEsfuerzo(0);
                setCuadrante(null);
            }
        };

        const cargarEvaluaciones = async () => {
            if (ideaId) {
                try {
                    const evaluacionesCollection = collection(db, 'evaluaciones');
                    const q = query(evaluacionesCollection, where('ideaId', '==', ideaId));
                    const evaluacionesSnapshot = await getDocs(q);
                    const evaluacionesList = evaluacionesSnapshot.docs.map(doc =>({
                        ...doc.data(),
                        id:doc.id
                    }) );
                    setEvaluaciones(evaluacionesList);

                    // Calcular los totales y los porcentajes acumulados
                    calcularTotalesYPorcentajes(evaluacionesList);

                } catch (error) {
                    console.error('Error al cargar evaluaciones:', error);
                }
            } else {
                setEvaluaciones([]);
                setPorcentajeImpacto(0);
                setPorcentajeEsfuerzo(0);
                setCuadrante(null);
            }
        };
        cargarEvaluaciones();
    }, [ideaId,esfuerzoMaximo,impactoMaximo]);

    useEffect(() => {   
        const calcularMaximos = () => {
            const maxImpacto = preguntas.reduce((acc, pregunta) => {
                const maxOpcionImpacto = Math.max(...pregunta.opciones.map(opcion => opcion.impacto));
                return acc + maxOpcionImpacto;
            }, 0);

            const maxEsfuerzo = preguntas.reduce((acc, pregunta) => {
                const maxOpcionEsfuerzo = Math.max(...pregunta.opciones.map(opcion => opcion.esfuerzo));
                return acc + maxOpcionEsfuerzo;
            }, 0);

            setImpactoMaximo(maxImpacto);
            setEsfuerzoMaximo(maxEsfuerzo);
        };

        calcularMaximos();
    }, []);




    const determinarCuadrante = (porcentajeImpacto, porcentajeEsfuerzo) => {
        if (porcentajeEsfuerzo <= 50 && porcentajeImpacto > 50) {            
            return { color: 'amarillo', titulo: 'Cuadrante #1 - Ganancia Rápida', descripcion: 'Impacto Alto y Esfuerzo Bajo.' };
        } else if (porcentajeEsfuerzo > 50 && porcentajeImpacto > 50) {           
            return { color: 'verde', titulo: 'Cuadrante #2 - Oportunidades', descripcion: 'Impacto Alto y Esfuerzo Alto.' };
        } else if (porcentajeEsfuerzo <= 50 && porcentajeImpacto <= 50) {           
            return { color: 'naranja', titulo: 'Cuadrante #3 - Menor Ganancia', descripcion: 'Impacto Bajo y Esfuerzo Bajo.' };
        } else {           
            return { color: 'rojo', titulo: 'Cuadrante #4 - Descartar', descripcion: 'Impacto Bajo y Esfuerzo Alto.' };
        }
    };

    const eliminarEvaluacion = async (evaluacionId) => {
        const confirmacion = await Swal.fire({
            title: '¿Estás seguro?',
            text: 'Esta acción no se puede deshacer',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar'
        });

        if (confirmacion.isConfirmed) {
            try {
                await deleteDoc(doc(db, 'evaluaciones', evaluacionId));
                setEvaluaciones(evaluaciones.filter(evaluacion => evaluacion.id !== evaluacionId));
                Swal.fire('Eliminado', 'La evaluación ha sido eliminada.', 'success');
            } catch (error) {
                console.error('Error al eliminar evaluación:', error);
                Swal.fire('Error', 'No se pudo eliminar la evaluación.', 'error');
            }
        }
    };








    return (
            <div>      
        <h2>Formulario de consulta de Ideas de Negocio</h2>
        <div>
            <label htmlFor="idea">Selecciona la idea a consultar:</label>
            <select
                id="idea"
                value={ideaId}
                onChange={(e) => setIdeaId(e.target.value)}
            >
                <option value="">Selecciona una idea...</option>
                {ideas.length > 0 ? (
                    ideas.map((idea) => (
                        <option key={idea.id} value={idea.id}>
                            {idea.texto}
                        </option>
                    ))
                ) : (
                    <option value="">No hay ideas disponibles</option> // Mensaje para cuando no hay ideas
                )}
            </select>
        </div>

        {evaluaciones.length > 0 ? (
                <table className="historico-table">
                    <thead>
                        <tr>
                            <th>Evaluador</th>
                            <th>Impacto Total</th>
                            <th>Esfuerzo Total</th>
                            <th>% Impacto</th>
                            <th>% Esfuerzo</th>
                            <th>Cuadrante</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {evaluaciones.map((evaluacion, index) => (
                            <tr key={index}>
                                <td>{evaluacion.evaluador}</td>
                                <td>{evaluacion.impactoTotal}</td>
                                <td>{evaluacion.esfuerzoTotal}</td>
                                <td>{evaluacion.porcentajeImpacto}%</td>
                                <td>{evaluacion.porcentajeEsfuerzo}%</td>
                                <td>{evaluacion.cuadrante.titulo}</td>
                                <td>
                                    <button onClick={()=>eliminarEvaluacion(evaluacion.id)}>Eliminar</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <div>
                    <p>No hay evaluaciones disponibles.</p>
                    <img src="empty.png" alt="No hay evaluaciones" /> {/* Reemplaza con tu imagen */}
                </div>
            )}

            
            


            <div>
                <h3>Cuadrante final:</h3>
                <p className="">Impacto: ({porcentajeImpacto.toFixed(2)}%)</p>
                <p className="">Esfuerzo ({porcentajeEsfuerzo.toFixed(2)}%)</p>
                <div>
                        {/* Renderiza el componente Cuadrante solo si cuadrante no es null */}
                        {cuadrante && (
                            <Cuadrante
                        color={cuadrante.color}
                        titulo={cuadrante.titulo}
                        descripcion={cuadrante.descripcion}
                            />
                        )}
                </div>
            </div>


            <Link to="/formulario">
            <button>Realizar nueva evaluacion.</button>
            </Link>

    </div>


    )









}


export default Consolidado;