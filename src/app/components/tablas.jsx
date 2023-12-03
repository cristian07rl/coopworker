import paginacion from "../utils/paginacion";
export default function Tabla({ datos, currentPage, setCurrentPage, limit }) {
    const datospaginados = paginacion(datos, limit)
    return (
        <>
            <table className="afiliados-table">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Apellido</th>
                        <th>Edad</th>
                        <th>Correo</th>
                        <th>Fecha de Registro</th>
                        <th>Beneficios</th>
                        <th>Estado</th>
                    </tr>
                </thead>
                <tbody>
                    {datospaginados[currentPage].map((element) => {
                        return (
                            <tr key={element.datospersonales._id}>
                                <td>{element.datospersonales.nombre}</td>
                                <td>{element.datospersonales.apellido}</td>
                                <td>{element.datospersonales.edad}</td>
                                <td>{element.email[0].direccion}</td>
                                <td>{String(element.fecha_de_registro).slice(0, 10)}</td>
                                <td>Lorem ipsum</td>
                                <td>{`${element.estado}`}</td>
                            </tr>
                        )

                    })}

                </tbody>
            </table>
            <div className="container-row">
                <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>
                    Anterior
                </button>
                <button onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage >= datospaginados.length-1}>
                    Siguiente
                </button>
            </div>
        </>


    )
}