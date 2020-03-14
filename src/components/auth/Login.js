import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import AlertaContext from '../../context/alertas/alertaContext';
import AuthContext from '../../context/autenticacion/authContext';

const Login = props => {
	// Extraer los valores del context
	const alertaContext = useContext(AlertaContext);
	const { alerta, mostrarAlerta } = alertaContext;

	const authContext = useContext(AuthContext);
	const { mensaje, autenticado, iniciarSesion } = authContext;

	// En caso de que el usuario o la contraseña no exista
	useEffect(() => {
		if (autenticado) {
			props.history.push('/proyectos');
		}

		if (mensaje) {
			mostrarAlerta(mensaje.msg, mensaje.categoria);
		}

		// eslint-disable-next-line
	}, [mensaje, autenticado, props.history]);

	// State para iniciar sesión
	const [usuario, setUsuario] = useState({
		email: '',
		password: '',
	});

	const onChange = e => {
		setUsuario({
			...usuario,
			[e.target.name]: e.target.value,
		});
	};

	// Cuando el usuario quiere iniciar sesión
	const onSubmit = e => {
		e.preventDefault();

		// Validar que no haya campos vacios
		if (email.trim() === '' || password.trim() === '') {
			mostrarAlerta('Todos los campos son obligatorios', 'alerta-error');
		}

		// Pasarlo al action
		iniciarSesion({ email, password });
	};

	const { email, password } = usuario;

	return (
		<div className='form-usuario'>
			{alerta ? (
				<div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div>
			) : null}
			<div className='contenedor-form sombra-dark'>
				<h1>Iniciar Sesión</h1>
				<form onSubmit={onSubmit}>
					<div className='campo-form'>
						<label htmlFor='email'>Email</label>
						<input
							type='text'
							id='email'
							name='email'
							placeholder='Tu Email'
							value={email}
							onChange={onChange}
						/>
					</div>

					<div className='campo-form'>
						<label htmlFor='password'>Contraseña</label>
						<input
							type='password'
							id='password'
							name='password'
							placeholder='Tu Contraseña'
							value={password}
							onChange={onChange}
						/>
					</div>

					<div className='campo-form'>
						<button type='submit' className='btn btn-primario btn-block'>
							Iniciar Sesión
						</button>
					</div>
				</form>
				<Link to='/nueva-cuenta' className='enlace-cuenta'>
					Obtener Cuenta
				</Link>
			</div>
		</div>
	);
};

export default Login;
