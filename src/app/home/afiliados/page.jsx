'use client'
import { useState, Suspense, useEffect } from "react";
import Tabla from "@/app/components/tablas";
import { busqueda_tabla } from "@/app/utils/busquedas";
export default function Afiliados() {
    const [limit, setLimit] = useState(5);
    const [currentPage, setCurrentPage] = useState(1);
    const [datos, setDatos] = useState(undefined)
    useEffect(() => {
        busqueda_tabla()
            .then(response => {
                setDatos(response)
            })
    }, [setDatos])
    return (
        <>
            <div className='container-column'>
                <h1>pagina de afiliados</h1>
                {datos ? <Tabla datos={datos} currentPage={currentPage} setCurrentPage={setCurrentPage} limit={limit} />
                    :
                    <div className="loading"></div>
                }
            </div >
        </>
    )

}
