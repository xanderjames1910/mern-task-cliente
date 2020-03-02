import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
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

		// Pasarlo al action
	};

	const { email, password } = usuario;

	return (
		<div className='form-usuario'>
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
