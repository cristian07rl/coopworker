
import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema({
    nombre: String,
    apellido: String,
    email: String,
    password: String,
    img: String,
    fecha: Date,
    userID: String
});

const User = mongoose.model('User', userSchema);

export default User