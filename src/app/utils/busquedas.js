
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
export async function busqueda_tabla(page, limit) {
    // const token = localStorage.getItem('token') ?? 
    const token = 'token'


    return (
        await fetch((`http://localhost:8080/allpersona?page=${page}&limit=${limit}`), {
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
