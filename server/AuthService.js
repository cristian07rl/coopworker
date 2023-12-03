// Aquí irían las llamadas a tu API para autenticar al usuario

// import User from "../models/usermodel";
const AuthService = {
  login: async (email, password) => {
    const response = await fetch(`http://localhost:8080/login?email=${email}&password=${password}`, {
      method: 'GET'
    });
    // Puedes ver la respuesta completa si es necesario
    const data = await response.json();
    const token = data.token;
    localStorage.setItem('token', token);
    console.log(data)
    return { status: response.status, token: data.token }; // Devuelve el status de la respuesta
  }
  ,
  logintoken: async (token) => {
    const response = await fetch(`http://localhost:8080/login/token`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`, // Enviar el token en el encabezado de autorización
    }
    });
    // Puedes ver la respuesta completa si es necesario
    const data = await response.json();

    console.log(data)
    console.log(response.status)
    return { status: response.status, token: data.token }; // Devuelve el status de la respuesta
  }
  ,
  logout: () => {
    // Lógica para cerrar sesión
    // Eliminar tokens, limpiar cookies, etc.
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(true);
      }, 500);
    });
  },
};

export default AuthService;
