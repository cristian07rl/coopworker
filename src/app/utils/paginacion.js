export default function paginacion(datos, limit){
    if (Array.isArray(datos)){
        const arr = [] 
        let n= datos.length/limit
        for (let i=0; i<n; i++){
            const newd = datos.slice(i*limit,(limit+i*limit))
            arr.push(newd)
        }
        return arr
    }
}