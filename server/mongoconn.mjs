import mongoose from "mongoose";
// import Persona from "../models/personamodel.js";
import User from "../models/usermodel.js";
const uri = "mongodb+srv://cristian07rl:cristian7512@cluster0.wc7tux5.mongodb.net/App?retryWrites=true&w=majority";

export const connection = () => {
    return mongoose.connect(uri)
        .then(() => {
            console.log('database connected');
        })
        .catch(err => {
            console.log(err);
            throw err; // Relanza el error para que sea capturado más adelante si la conexión falla
        });
};

export const find = async (database, field, arg ) => {
    try {
        await connection(); // Espera a que la conexión se establezca
        const result = await database.find({ [field]: arg });
        mongoose.connection.close();
        return result;
    } catch (error) {
        console.log(error)
        throw error; // Relanza el error para que sea capturado más adelante si la búsqueda falla
    }
};


export const newUser = ({ nombre, apellido, email, password, img }) => {
    const usernew = new User({
        nombre: nombre,
        apellido: apellido,
        email: email,
        password: password,
        imagen: img,
        fecha: new Date(),
        userID: crypto.randomUUID()

    })
    mongoose.connect(uri)
        .then(() => {
            console.log('database connected')
            usernew.save()
                .then(result => {
                    console.log(result)
                    mongoose.connection.close()
                })
                .catch(err => {
                    console.log(err)
                })
        }).catch(err => {
            console.log(err)
        })


}
// Para insertar un objeto con esta estructura en la base de datos:



// data.save()
//     .then(result => {
//         console.log(result)
//         mongoose.connection.close()
//     })
//     .catch(err => {
//         console.log(err)
//     })