import React, { useReducer } from 'react';
import PropTypes from 'prop-types';

import tareaContext from './tareaContext';
import tareaReducer from './tareaReducer';

import {
	TAREAS_PROYECTO,
	AGREGAR_TAREA,
	VALIDAR_TAREA,
	ELIMINAR_TAREA,
	TAREA_ACTUAL,
	ACTUALIZAR_TAREA,
	LIMPIAR_TAREA,
} from '../../types';

import clienteAxios from '../../config/axios';

const TareaState = props => {
	const initialState = {
		tareasProyecto: [],
		errorTarea: false,
		tareaSeleccionada: null,
	};

	// Crear dispatch y state
	const [state, dispatch] = useReducer(tareaReducer, initialState);

	// Crear las funciones

	// Obtenre las tareas del proyecto
	const obtenerTareas = async proyecto => {
		try {
			const resultado = await clienteAxios.get('/api/tareas', {
				params: { proyecto },
			});
			// console.log(resultado);

			dispatch({
				type: TAREAS_PROYECTO,
				payload: resultado.data.tareas,
			});
		} catch (error) {
			console.log(error);
		}
	};

	// Agregar una tarea al proyecto seleccionado
	const agregarTarea = async tarea => {
		console.log(tarea);
		try {
			const resultado = await clienteAxios.post('/api/tareas', tarea);
			console.log(resultado);
			dispatch({
				type: AGREGAR_TAREA,
				payload: tarea,
			});
		} catch (error) {
			console.log(error);
		}
	};

	// Valida y muestra un error en caso de que sea necesario
	const validarTarea = () => {
		dispatch({
			type: VALIDAR_TAREA,
		});
	};

	// Eliminar tarea por id
	const eliminarTarea = async (id, proyecto) => {
		try {
			await clienteAxios.delete(`/api/tareas/${id}`, {
				params: { proyecto },
			});

			dispatch({
				type: ELIMINAR_TAREA,
				payload: id,
			});
		} catch (error) {
			console.log(error);
		}
	};

	// Elimina la tarea seleccionada
	const limpiarTarea = () => {
		dispatch({
			type: LIMPIAR_TAREA,
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
	const actualizarTarea = async tarea => {
		try {
			const resultado = await clienteAxios.put(
				`/api/tareas/${tarea._id}`,
				tarea,
			);
			// console.log(resultado);

			dispatch({
				type: ACTUALIZAR_TAREA,
				payload: resultado.data.tarea,
			});
		} catch (error) {
			console.log(error);
		}
	};

	const { children } = props;

	return (
		<tareaContext.Provider
			value={{
				tareasProyecto: state.tareasProyecto,
				errorTarea: state.errorTarea,
				tareaSeleccionada: state.tareaSeleccionada,
				obtenerTareas,
				agregarTarea,
				validarTarea,
				eliminarTarea,
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
