import React, { useContext } from 'react';

import proyectoContext from '../../context/proyectos/proyectoContext';

const FormTarea = () => {
	// Extraer proyectos de state inicial
	const proyectosContext = useContext(proyectoContext);
	const { proyecto } = proyectosContext;

	// Si no hay proyecto seleccionado
	if (!proyecto) return null;

	// Array destructuring para extraer el proyecto actual
	const [proyectoActual] = proyecto;

	return (
		<div className='formulario'>
			<form>
				<div className='contenedor-input'>
					<input
						type='text'
						className='input-text'
						placeholder='Nombre Tarea...'
						name='nombre'
					/>
				</div>

				<div className='contenedor-input'>
					<button
						type='submit'
						className='btn btn-primario btn-submit btn-block'>
						Agregar Tarea
					</button>
				</div>
			</form>
		</div>
	);
};

export default FormTarea;
