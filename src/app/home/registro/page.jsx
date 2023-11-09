'use client'
import NewForm from "../../components/Newform"
export default function Registro() {
    const fields = [
        {
            name: 'datospersonales', display: 'Datos personales', data: [
                { name: 'nombre', label: 'nombre', type: 'text', atributos: { placeholder: 'Nombre', minLength: '5', maxLength: '10' } },
                { name: 'apellido', label: 'apellido', type: 'text' },
                { name: 'edad', label: 'Edad', type: 'number' },
                { name: 'profesion', label: 'Profesion', type: 'text' },
                {
                    name: 'img', label: 'Foto de perfil', type: 'file', atributos: { accept: "image/png, image/jpeg" }
                }
            ]
        },
        {
            name: 'habilidades', display: 'Habilidades', data: [
                [
                    { name: 'habilidad', label: 'habilidades', type: 'text', atributos: { placeholder: 'Referentes a su profesion', } },
                    {
                        name: 'nivel', label: 'nivel', type: 'select',
                        option: ['avanzado', 'intermedio', 'basico', 'noob'],
                        atributos: { required: 'required' }
                    }
                ]
            ]
        },
        {
            name: 'idiomas', display: 'Idiomas', data: [
                [
                    { name: 'idioma', label: 'idioma', type: 'text' },
                    { name: 'nivel', label: 'nivel', type: 'text' }
                ]
            ]
        }
        ,
        {
            name: 'telefono', display: 'telefono', data: [
                [
                    { name: 'tipo', label: 'tipo', type: 'select', option: ['personal', 'trabajo'] },
                    { name: 'numero', label: 'numero', type: 'tel' }
                ]
            ]
        }
        ,
        {
            name: 'email', display: 'correo electronico', data: [
                [
                    { name: 'tipo', label: 'tipo', type: 'text' },
                    { name: 'direccion', label: 'email', type: 'text' }
                ]
            ]
        }
        ,
        {
            name: 'educacion', display: 'educacion', data: [
                [
                    { name: 'institucion', label: 'institucion', type: 'text' },
                    { name: 'titulo_obtenido', label: 'titulo obtenido', type: 'text' },
                    { name: 'año_de_graduacion', label: 'año de graduacion', type: 'date' }
                ]
            ]
        }
        ,
        {
            name: 'experiencia_laboral', display: 'experiencia laboral', data: [
                [
                    { name: 'empresa', label: 'empresa', type: 'text' },
                    { name: 'cargo', label: 'cargo', type: 'text' },
                    { name: 'descripcion', label: 'descripcion', type: 'text' },
                    { name: 'fecha_de_inicio', label: 'fecha de inicio', type: 'date' },
                    { name: 'fecha_de_finalizacion', label: 'fecha de inalizacion', type: 'date' }
                ]
            ]
        }


    ]
    return (
        <NewForm formFields={fields} endpoind={'http://localhost:8080/registrotest/'} />
    )
}
