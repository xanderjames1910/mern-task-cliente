import React, { useContext, useState } from 'react';

import proyectoContext from '../../context/proyectos/proyectoContext';

const NuevoProyecto = () => {
	// Obtener el state del formulario
	const proyectosContext = useContext(proyectoContext);
	const {
		formulario,
		errorFormulario,
		mostrarFormulario,
		agregarProyecto,
		mostrarError,
	} = proyectosContext;

	// State para proyecto
	const [proyecto, setProyecto] = useState({
		nombre: '',
	});

	// Extraer nombre del proyecto
	const { nombre } = proyecto;

	// Lee los contenidos del input
	const onChangeProyecto = e => {
		setProyecto({
			...proyecto,
			[e.target.name]: e.target.value,
		});
	};

	// // Cuando el usuario envia el proyecto
	const onSubmit = e => {
		e.preventDefault();

		// Validar el proyecto
		if (nombre === '') {
			mostrarError();
			return;
		}

		// Agregar al state
		agregarProyecto(proyecto);

		// Reiniciar el form
		setProyecto({
			nombre: '',
		});
	};

	return (
		<>
			<button
				type='button'
				className='btn btn-block btn-primario'
				onClick={mostrarFormulario}>
				Nuevo Proyecto
			</button>
			{formulario ? (
				<form className='formulario-nuevo-proyecto' onSubmit={onSubmit}>
					<input
						type='text'
						className='input-text'
						name='nombre'
						placeholder='Nombre Proyecto'
						value={nombre}
						onChange={onChangeProyecto}
					/>
					<button type='submit' className='btn btn-block btn-primario'>
						Agregar Proyecto
					</button>
				</form>
			) : null}
			{errorFormulario ? (
				<p className='mensaje error'>
					El nombre del Proyecto es obligatorio
				</p>
			) : null}
		</>
	);
};

export default NuevoProyecto;
