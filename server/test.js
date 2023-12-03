// Importa el módulo de Mongoose y define tu esquema de datos

// Ejemplo de cómo sería tu esquema de datos con Mongoose
import Persona from "../models/personamodel.js";
import mongoose from "mongoose";
const uri = "mongodb+srv://cristian07rl:cristian7512@cluster0.wc7tux5.mongodb.net/App?retryWrites=true&w=majority";
mongoose.connect(uri)
    .then(async() => {
        console.log('database connected');
        await buscarPorCampo(Persona, 'idiomas.idioma', 'Inglés')
            .then((resultados) => {
                console.log('Resultados de la búsqueda por tipo de teléfono "celular":', resultados[0]);
            })
            .catch((error) => {
                console.error('Error:', error);
            });

        // // Llamada para buscar por ciudad
        //await buscarPorCampo(Persona, 'direccion.ciudad', 'Bogotá')
        //     .then((resultados) => {
        //         console.log('Resultados de la búsqueda por ciudad "Bogotá":', resultados);
        //     })
        //     .catch((error) => {
        //         console.error('Error:', error);
        //     });

        // Llamada para buscar por edad
        // await buscarPorCampo(Persona, 'edad', 30)
        //     .then((resultados) => {
        //         console.log('Resultados de la búsqueda por edad 30:', resultados[0]);
        //     })
        //     .catch((error) => {
        //         console.error('Error:', error);
        //     });

    })
    .then(() => {
        mongoose.connection.close()
    })
    .catch(err => {
        console.log(err);
        throw err; // Relanza el error para que sea capturado más adelante si la conexión falla
    });
// La función que realiza la búsqueda
async function buscarPorCampo(model, field, arg) {
    try {
        // Realiza la búsqueda
        console.log(model, field, arg)
        const results = await model.find({ [field]: arg });
        return results;
    } catch (error) {
        console.log(model, field, arg)
        console.error('Error en la búsqueda:', error);
        return null;
    }
}

// Ejemplo de uso:
// Suponiendo que ya tienes una conexión a tu base de datos

// Llamada para buscar por tipo de teléfono


