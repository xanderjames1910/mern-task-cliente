import React, { useReducer } from 'react';
import { v4 as uuidv4 } from 'uuid';
import PropTypes from 'prop-types';

import tareaContext from './tareaContext';
import tareaReducer from './tareaReducer';

import {
	TAREAS_PROYECTO,
	AGREGAR_TAREA,
	VALIDAR_TAREA,
	ELIMINAR_TAREA,
	ESTADO_TAREA,
	TAREA_ACTUAL,
	ACTUALIZAR_TAREA,
	LIMPIAR_TAREA,
} from '../../types';

const TareaState = props => {
	const initialState = {
		tareas: [
			{ id: 1, nombre: 'Elegir Plataforma', estado: true, proyectoId: 1 },
			{ id: 2, nombre: 'Elegir Colores', estado: false, proyectoId: 2 },
			{
				id: 3,
				nombre: 'Elegir Plataformas de pago',
				estado: false,
				proyectoId: 3,
			},
			{ id: 4, nombre: 'Elegir Hosting', estado: true, proyectoId: 4 },
			{ id: 5, nombre: 'Elegir Plataforma', estado: true, proyectoId: 1 },
			{ id: 6, nombre: 'Elegir Colores', estado: false, proyectoId: 2 },
			{
				id: 7,
				nombre: 'Elegir Plataformas de pago',
				estado: false,
				proyectoId: 3,
			},
			{ id: 8, nombre: 'Elegir Hosting', estado: true, proyectoId: 4 },
			{ id: 9, nombre: 'Elegir Plataforma', estado: true, proyectoId: 1 },
			{ id: 10, nombre: 'Elegir Colores', estado: false, proyectoId: 2 },
			{
				id: 11,
				nombre: 'Elegir Plataformas de pago',
				estado: false,
				proyectoId: 2,
			},
			{ id: 12, nombre: 'Elegir Hosting', estado: true, proyectoId: 3 },
			{ id: 13, nombre: 'Elegir Hosting', estado: true, proyectoId: 4 },
		],
		tareasProyecto: null,
		errorTarea: false,
		tareaSeleccionada: null,
	};

	// Crear dispatch y state
	const [state, dispatch] = useReducer(tareaReducer, initialState);

	// Crear las funciones

	// Obtenre las tareas del proyecto
	const obtenerTareas = proyectoId => {
		dispatch({
			type: TAREAS_PROYECTO,
			payload: proyectoId,
		});
	};

	// Agregar una tarea al proyecto seleccionado
	const agregarTarea = tarea => {
		tarea.id = uuidv4();

		dispatch({
			type: AGREGAR_TAREA,
			payload: tarea,
		});
	};

	// Valida y muestra un error en caso de que sea necesario
	const validarTarea = () => {
		dispatch({
			type: VALIDAR_TAREA,
		});
	};

	// Eliminar tarea por id
	const eliminarTarea = id => {
		dispatch({
			type: ELIMINAR_TAREA,
			payload: id,
		});
	};

	// Cambia el estado de cada tarea
	const cambiaEstadoTarea = tarea => {
		dispatch({
			type: ESTADO_TAREA,
			payload: tarea,
		});
	};

	// Extrae una tarea para edición
	const guardarTareaActual = tarea => [
		dispatch({
			type: TAREA_ACTUAL,
			payload: tarea,
		}),
	];

	// Edita o modifica una tarea
	const actualizarTarea = tarea => {
		dispatch({
			type: ACTUALIZAR_TAREA,
			payload: tarea,
		});
	};

	// Elimina la tarea seleccionada
	const limpiarTarea = () => {
		dispatch({
			type: LIMPIAR_TAREA,
		});
	};

	const { children } = props;

	return (
		<tareaContext.Provider
			value={{
				tareas: state.tareas,
				tareasProyecto: state.tareasProyecto,
				errorTarea: state.errorTarea,
				tareaSeleccionada: state.tareaSeleccionada,
				obtenerTareas,
				agregarTarea,
				validarTarea,
				eliminarTarea,
				cambiaEstadoTarea,
				guardarTareaActual,
				actualizarTarea,
				limpiarTarea,
			}}>
			{children}
		</tareaContext.Provider>
	);
};

TareaState.propTypes = {
	children: PropTypes.object.isRequired,
};

export default TareaState;
