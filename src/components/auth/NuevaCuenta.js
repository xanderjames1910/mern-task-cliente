import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import AlertaContext from '../../context/alertas/alertaContext';
import AuthContext from '../../context/autenticacion/authContext';

const NuevaCuenta = props => {
	// Extraer los valores del context
	const alertaContext = useContext(AlertaContext);
	const { alerta, mostrarAlerta } = alertaContext;

	const authContext = useContext(AuthContext);
	const { mensaje, autenticado, registrarUsuario } = authContext;

	// En caso de que el usuario se haya autenticado, registrado o sea un registro duplicado
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
		nombre: '',
		email: '',
		password: '',
		confirmPassword: '',
	});

	// Extraer de usuario
	const { nombre, email, password, confirmPassword } = usuario;

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
		if (
			nombre.trim() === '' ||
			email.trim() === '' ||
			password.trim() === '' ||
			confirmPassword.trim() === ''
		) {
			mostrarAlerta('Todos los campos son obligatorios', 'alerta-error');
			return;
		}

		// Validar password dmínimo de 6 caracteres
		if (password.length < 6) {
			mostrarAlerta(
				'La contraseña debe contener al menos 6 caracteres',
				'alerta-error',
			);
			return;
		}

		// Validar que los 2 password sean iguales
		if (password !== confirmPassword) {
			mostrarAlerta('Las contraseñas no coinciden', 'alerta-error');
			return;
		}

		// Pasarlo al action
		registrarUsuario({
			nombre,
			email,
			password,
		});
	};

	return (
		<div className='form-usuario'>
			{alerta ? (
				<div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div>
			) : null}
			<div className='contenedor-form sombra-dark'>
				<h1>Obtener una cuenta</h1>
				<form onSubmit={onSubmit}>
					<div className='campo-form'>
						<label htmlFor='nombre'>Nombre</label>
						<input
							type='text'
							id='nombre'
							name='nombre'
							placeholder='Tu Nombre'
							value={nombre}
							onChange={onChange}
						/>
					</div>

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
						<label htmlFor='confirmPassword'>Confirmar Contraseña</label>
						<input
							type='password'
							id='confirmPassword'
							name='confirmPassword'
							placeholder='Repite tu Contraseña'
							value={confirmPassword}
							onChange={onChange}
						/>
					</div>

					<div className='campo-form'>
						<button type='submit' className='btn btn-primario btn-block'>
							Registrarme
						</button>
					</div>
				</form>
				<Link to='/' className='enlace-cuenta'>
					Iniciar Sesión
				</Link>
			</div>
		</div>
	);
};

export default NuevaCuenta;
