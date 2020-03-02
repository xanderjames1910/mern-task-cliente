import React, { useContext, useEffect } from 'react';

import proyectoContext from '../../context/proyectos/proyectoContext';

import Proyecto from './Proyecto';

const ListadoProyecto = () => {
	// Extraer proyectos de state inicial
	const proyectosContext = useContext(proyectoContext);
	const { proyectos, obtenerProyectos } = proyectosContext;

	// Obtener proyectos cuando carga el componente
	useEffect(() => {
		obtenerProyectos();
	}, []);

	// Revisar si proyectos tienen contenido
	if (proyectos.length === 0)
		return <p>No hay proyectos, comienza creando uno</p>;

	return (
		<ul className='listado-proyectos'>
			{proyectos.map(proyecto => (
				<Proyecto key={proyecto.id} proyecto={proyecto} />
			))}
		</ul>
	);
};

export default ListadoProyecto;
