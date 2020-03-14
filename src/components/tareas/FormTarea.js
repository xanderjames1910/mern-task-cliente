import React, { useContext, useEffect, useState } from 'react';

import proyectoContext from '../../context/proyectos/proyectoContext';
import tareaContext from '../../context/tareas/tareaContext';

const FormTarea = () => {
	// Extraer si un proyecto está activo
	const proyectosContext = useContext(proyectoContext);
	const { proyecto } = proyectosContext;

	// Obtener la funcion del context de tarea
	const tareasContext = useContext(tareaContext);
	const {
		errorTarea,
		tareaSeleccionada,
		agregarTarea,
		validarTarea,
		obtenerTareas,
		actualizarTarea,
		limpiarTarea,
	} = tareasContext;

	// State del formulario tareas
	const [tarea, setTarea] = useState({
		nombre: '',
	});

	// Extrar el nombre de la tarea
	const { nombre } = tarea;

	// Effect que detecta si hay una tarea seleccionada
	useEffect(() => {
		if (tareaSeleccionada !== null) {
			setTarea(tareaSeleccionada);
		} else {
			setTarea({
				nombre: '',
			});
		}
	}, [tareaSeleccionada]);

	// Si no hay proyecto seleccionado
	if (!proyecto) return null;

	// Array destructuring para extraer el proyecto actual
	const [proyectoActual] = proyecto;

	// Leer los valores del formulario
	const handleChange = e => {
		setTarea({
			...tarea,
			[e.target.name]: e.target.value,
		});
	};

	const onSubmit = e => {
		e.preventDefault();

		// Validar
		if (nombre.trim() === '') {
			validarTarea();
			return;
		}

		// Si es edición o si es nueva tarea
		if (tareaSeleccionada === null) {
			// Agregar la nueva tarea al state de tareas
			tarea.proyecto = proyectoActual._id;
			agregarTarea(tarea);
		} else {
			// Actualizar tarea existente
			actualizarTarea(tarea);

			// Elimina tareaSeleccionada del state
			limpiarTarea();
		}

		// Obtener y filtrar las tareas del proyecto actual
		obtenerTareas(proyectoActual._id);

		// Reiniciar el form
		setTarea({
			nombre: '',
		});
	};

	return (
		<div className='formulario'>
			<form onSubmit={onSubmit}>
				<div className='contenedor-input'>
					<input
						type='text'
						className='input-text'
						placeholder='Nombre Tarea...'
						name='nombre'
						value={nombre}
						onChange={handleChange}
					/>
				</div>

				<div className='contenedor-input'>
					<button
						type='submit'
						className='btn btn-primario btn-submit btn-block'>
						{tareaSeleccionada ? 'Editar Tarea' : 'Agregar Tarea'}
					</button>
				</div>
			</form>
			{errorTarea ? (
				<p className='mensaje error'>
					El nombre de la tarea es obligatorio
				</p>
			) : null}
		</div>
	);
};

export default FormTarea;
