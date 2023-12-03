
export const busqueda = async (arg) => {
    // const token = localStorage.getItem('token') ?? 

    const token = 'token'
    return (
        await fetch((`http://localhost:8080/persona/${arg}`), {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`, // Enviar el token en el encabezado de autorización
            }
        })
            .then(response => response.json())
            .then((response) => {
                return response
            })
    )



}
export function busqueda_tabla() {
    // const token = localStorage.getItem('token') ?? 
    const token = 'token'
    return (
        fetch((`http://localhost:8080/allpersona`), {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`, // Enviar el token en el encabezado de autorización
            }
        })
            .then(response => response.json())
            .then((response) => {
                return response
            })
    )
}
