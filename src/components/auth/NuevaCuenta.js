import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const NuevaCuenta = () => {
	// State para iniciar sesión
	const [usuario, setUsuario] = useState({
		nombre: '',
		email: '',
		password: '',
		confirmPassword: '',
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

		// Validar passwor dmínimo de 6 caracteres

		// Validar que los 2 password sean iguales

		// Pasarlo al action
	};

	const { nombre, email, password, confirmPassword } = usuario;

	return (
		<div className='form-usuario'>
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
