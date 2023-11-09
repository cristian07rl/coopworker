export default function paginacion(datos, limit){
    if (Array.isArray(datos)){
        const arr = []
        while (datos.length > limit) {
            arr.push(datos.slice(0,limit))
        }
        console.log(arr)
        console.log("hola")
        return arr
        

    }
}