import mongoose from "mongoose";
const { Schema } = mongoose;
const direccionSchema = new Schema({
    calle: String,
    ciudad: String,
    departamento: String,
    codigo_postal: String
});

const telefonoSchema = new Schema({
    tipo: String,
    numero: String
});

const correoElectronicoSchema = new Schema({
    tipo: String,
    direccion: String
});

const educacionSchema = new Schema({
    institucion: String,
    titulo_obtenido: String,
    año_de_graduacion: Date
});

const experienciaLaboralSchema = new Schema({
    empresa: String,
    cargo: String,
    fecha_de_inicio: String,
    fecha_de_finalizacion: String,
    descripcion: String
});

const habilidadesSchema = new Schema({
    nombre: String,
    nivel: String
});

const idiomasSchema = new Schema({
    idioma: String,
    nivel: String
});
const datospersonales = new Schema({
    nombre: String,
    apellido: String,
    edad: Number,
    img: String,
    profesion: String,
})
const personaSchema = new Schema({
    userID: String,
    fecha_de_registro: Date,
    estado: Boolean,
    datospersonales: datospersonales,
    direccion: direccionSchema,
    telefono: [telefonoSchema],
    email: [correoElectronicoSchema],
    educacion: [educacionSchema],
    experiencia_laboral: [experienciaLaboralSchema],
    habilidades: [habilidadesSchema],
    idiomas: [idiomasSchema]
});

const Persona = mongoose.model('Persona', personaSchema);

export default Persona