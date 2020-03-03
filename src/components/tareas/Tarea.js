import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import proyectoContext from '../../context/proyectos/proyectoContext';
import tareaContext from '../../context/tareas/tareaContext';

const Tarea = ({ tarea }) => {
	// Extraer si un proyecto está activo
	const proyectosContext = useContext(proyectoContext);
	const { proyecto } = proyectosContext;

	// Obtener la funcion del context de tarea
	const tareasContext = useContext(tareaContext);
	const {
		eliminarTarea,
		obtenerTareas,
		cambiaEstadoTarea,
		guardarTareaActual,
	} = tareasContext;

	// Extraer el proyecto
	const [proyectoActual] = proyecto;

	// Función que se ejecuta cuando el usuario presiona el btn de eliminar tarea
	const tareaElimninar = id => {
		eliminarTarea(id);
		obtenerTareas(proyectoActual.id);
	};

	// Función que modifica el estado de las tareas
	const cambiaEstado = tareaObj => {
		if (tarea.estado) {
			tarea.estado = false;
		} else {
			tarea.estado = true;
		}
		cambiaEstadoTarea(tareaObj);
	};

	// Agrega una tarea actual cuando el usuario desea editarla
	const seleccionarTarea = tareaObj => {
		guardarTareaActual(tareaObj);
	};

	return (
		<li className='tarea sombra'>
			<p>{tarea.nombre}</p>
			<div className='estado'>
				{tarea.estado ? (
					<button
						type='button'
						className='completo'
						onClick={() => cambiaEstado(tarea)}>
						Completo
					</button>
				) : (
					<button
						type='button'
						className='incompleto'
						onClick={() => cambiaEstado(tarea)}>
						Incompleto
					</button>
				)}
			</div>
			<div className='acciones'>
				<button
					type='button'
					className='btn btn-primario'
					onClick={() => seleccionarTarea(tarea)}>
					Editar
				</button>
				<button
					type='button'
					className='btn btn-secundario'
					onClick={() => tareaElimninar(tarea.id)}>
					Eliminar
				</button>
			</div>
		</li>
	);
};

Tarea.propTypes = {
	tarea: PropTypes.object.isRequired,
};

export default Tarea;
