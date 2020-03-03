import React, { useContext } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import proyectoContext from '../../context/proyectos/proyectoContext';
import tareaContext from '../../context/tareas/tareaContext';

import Tarea from './Tarea';

const ListadoTareas = () => {
	// Extraer proyectos de state inicial
	const proyectosContext = useContext(proyectoContext);
	const { proyecto, eliminarProyecto } = proyectosContext;

	// Obtener las tareas del proyecto
	const tareasContext = useContext(tareaContext);
	const { tareasProyecto } = tareasContext;

	// Si no hay proyecto seleccionado
	if (!proyecto) return <h2>Selecciona un proyecto</h2>;

	// Array destructuring para extraer el proyecto actual
	const [proyectoActual] = proyecto;

	// Eliminar un proyecto
	const onClickEliminar = () => {
		eliminarProyecto(proyectoActual.id);
	};

	return (
		<>
			<h2>Proyecto: {proyectoActual.nombre}</h2>
			<ul className='listado-tareas'>
				{tareasProyecto.length === 0 ? (
					<li className='tarea'>
						<p>No hay tareas</p>
					</li>
				) : (
					<TransitionGroup>
						{tareasProyecto.map(tarea => (
							<CSSTransition
								key={tarea.id}
								timeout={200}
								classNames='tarea'>
								<Tarea tarea={tarea} />
							</CSSTransition>
						))}
					</TransitionGroup>
				)}
			</ul>
			<button
				type='button'
				className='btn btn-eliminar'
				onClick={onClickEliminar}>
				Eliminar Proyecto &times;
			</button>
		</>
	);
};

export default ListadoTareas;
