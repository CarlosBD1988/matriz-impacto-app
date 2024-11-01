import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import { db } from '../../servicios/firebase'; // Asegúrate de importar la instancia de Firebase
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'; // Importa serverTimestamp





function Idea(){
    const [idea, setIdea] = useState('');

    const handleSave = async () => {
    if (!idea.trim()) 
        {
            Swal.fire({
            title: 'Campo vacío',
            text: 'Por favor, escribe una idea antes de guardar.',
            icon: 'warning',
            confirmButtonText: 'OK'
            });
            return; 
        }
        try {
       
            await addDoc(collection(db, 'ideas'), {
                idea,
                timestamp: serverTimestamp()
            });

            Swal.fire({
                title: 'Guardado',
                text: 'Tu idea ha sido guardada exitosamente en la base de datos.',
                icon: 'success',
                confirmButtonText: 'OK'
            });

            // Limpia el campo después de guardar
            setIdea('');
        } catch (error) {
            Swal.fire({
                title: 'Error',
                text: 'Hubo un error al guardar la idea. Inténtalo de nuevo.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
            console.error('Error al guardar la idea:', error);
        }
    }
    
    return(
        <div>
                <h1>Formulario creacion ideas de negocio</h1>
                <label htmlFor="idea">Idea de desarrollo innovadora:</label>
                    <textarea
                        id="idea"
                        className="textarea-idea"
                        value={idea}
                        onChange={(e) => setIdea(e.target.value)}
                        placeholder="Escribe tu idea aquí..."
                    />
                <button type="button" onClick={handleSave}>Guardar en Base de Datos</button>
                <Link to="/formulario">
                     <button>Realizar nuevo calculo.</button>
                </Link>
        </div>
      
    )



}

export default Idea;