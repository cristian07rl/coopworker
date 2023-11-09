
import { Suspense } from "react";
import Tabla from "@/app/components/tablas";
export default function Afiliados() {
    return (
        <>
            <div className='container-column'>
                <h1>pagina de afiliados</h1>
                <Suspense fallback={<div className="loading" />}>
                    <Tabla />
                </Suspense>

            </div >
        </>
    )
}
