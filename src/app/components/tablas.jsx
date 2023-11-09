
import { busqueda_tabla } from "../utils/busquedas";
import paginacion from "../utils/paginacion";
export default async function Tabla() {
    const datos = await busqueda_tabla();
    const datoslimitados=paginacion(datos,4)
    console.log(datoslimitados)
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
                    {datos.map((element) => {
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
                <button >
                    Anterior
                </button>
                <button>
                    Siguiente
                </button>
            </div>
        </>


    )
}