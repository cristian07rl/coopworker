'use client'
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AuthService from '../../../server/AuthService';
import PropTypes from 'prop-types';
export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const router = useRouter();
  useEffect(() => {
    try {
      const token = localStorage.getItem('token')
      AuthService.logintoken(token)
    }
    catch (err) {
      console.log(err)
    }
  }, [])
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const $loader = document.querySelector('.login-container-loader')
      const $button = document.querySelector('#logbutton')
      $loader.style.display = 'block'
      $button.setAttribute('disabled', '')
      console.time('logeando')
      const userlog = await AuthService.login(username, password);
      console.timeEnd('logeando')
      // Lógica para manejar el usuario autenticado, por ejemplo, redirigir a una nueva página
      if (userlog.status == 200) {
        router.push('/home');
        console.log("userlogtiken", userlog.token)
      }
      else {
        setError("credenciales invalidas")
        $loader.style.display = 'none'
        console.log('Usuario autenticado:', userlog.status);
        $button.removeAttribute('disabled', '')
      }

    } catch (err) {
      const $loader = document.querySelector('.login-container-loader')
      const $button = document.querySelector('#logbutton')
      $loader.style.display = 'none'
      $button.removeAttribute('disabled', '')
      setError(err.message);
    }
  };

  return (
    <div className="login-container">

      <form className="login-form" onSubmit={handleLogin}>
        <h2>Login</h2>
        <input
          type="text"
          placeholder="Usuario"
          value={username}
          autoComplete='username'
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          autoComplete="current-password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button id='logbutton' type="submit">
          <span className='login-container-loader'></span>
          <i className="fa-solid fa-right-to-bracket"></i>Iniciar sesión</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}

      </form>
    </div>
  );
};
