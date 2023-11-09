
import { useState } from 'react';
import PropTypes from 'prop-types';


const NewForm = ({ formFields, endpoind }) => {
    const url = endpoind
    const [imagen, setImagen] = useState('');
    const renderFormField = (element, field, subIndex, elementIndex) => {
        if (element.type === 'file') {
            return (
                <div className='formInputs' key={`${field.name}-${subIndex}-${elementIndex}`}>
                    <label>{element.label}:</label>
                    <input
                        type={element.type}
                        accept={element.atributos.accept}
                        onChange={handleImageChange}
                    />
                </div>
            );
        }
        else {
            if (element.type === 'select') {
                return renderSelectField(element, field, subIndex, elementIndex);
            } else {
                return renderInputField(element, field, subIndex, elementIndex);
            }
        }

    };

    const renderSelectField = (element, field, subIndex, elementIndex) => {
        // ... Your logic for rendering select fields
        if (element.atributos) {
            return (
                <div className='formInputs' key={`${field.name}-${subIndex}-${elementIndex}`}>
                    <label>{element.label}:</label>
                    <select
                        {...Object.keys(element.atributos).reduce((acc, atri) => {
                            acc[atri] = element.atributos[atri];
                            return acc;
                        }, {})}

                        onChange={(e) => handleInputChange(field.name, e.target.value, subIndex, elementIndex)}>
                        <option
                            key={`${field.name}-${subIndex}-${elementIndex}`}
                            value={""}>{"Seleccione"}

                        </option>
                        {element.option.map((arg, argindex) => {
                            return (
                                <option
                                    key={`${field.name}-${subIndex}-${elementIndex}-${argindex}`}
                                    value={arg}>{arg}

                                </option>
                            )
                        })}
                    </select>
                </div>
            )

        }
        else {
            return (
                <div className='formInputs' key={`${field.name}-${subIndex}-${elementIndex}`}>
                    <label>{element.label}:</label>
                    <select onChange={(e) => handleInputChange(field.name, e.target.value, subIndex, elementIndex)}>
                        {element.option.map((arg, argindex) => {
                            return (
                                <option
                                    key={`${field.name}-${subIndex}-${elementIndex}-${argindex}`}
                                    value={arg}>{arg}
                                </option>
                            )
                        })}
                    </select>
                </div>
            )

        }
    };
    const renderInputField = (element, field, subIndex, elementIndex) => {
        // ... Your logic for rendering input fields
        if (element.atributos) {
            return (
                <div className='formInputs' key={`${field.name}-${subIndex}-${elementIndex}`}>
                    <label>{element.label}:</label>
                    <input
                        type={element.type}
                        onChange={(e) => handleInputChange(field.name, e.target.value, subIndex, elementIndex)}
                        {...Object.keys(element.atributos).reduce((acc, atri) => {
                            acc[atri] = element.atributos[atri];
                            return acc;
                        }, {})}
                    />
                </div>
            )

        }

        else {
            return (
                <div className='formInputs' key={`${field.name}-${subIndex}-${elementIndex}`}>
                    <label>{element.label}:</label>
                    <input
                        type={element.type}
                        onChange={(e) => handleInputChange(field.name, e.target.value, subIndex, elementIndex)}
                    />
                </div>
            )

        }
    };
    const peticion = (datos, url) => {

        fetch(url, {
            method: 'POST',
            body: datos // Convierte el objeto JSON a un string JSON
        })
            .then(response => {
                // Manejo de la respuesta de la solicitud
                console.log('Solicitud completada con estado:', response.status);
                // Puedes realizar más acciones con la respuesta si es necesario
            })
            .catch(error => {
                // Manejo de errores en caso de que la solicitud falle
                console.error('Error en la solicitud:', error);
            });
    };

    const propscopy = formFields
    const initialFieldsState = Object.fromEntries(
        formFields.map(field => {
            if (field.data) {
                if (Array.isArray(field.data[0])) {
                    const subFields = [Object.fromEntries(field.data[0].map(subField => {

                        return [subField.name, '']
                    }))]
                    return [field.name, subFields];
                }
                else {
                    const subFields = [Object.fromEntries(field.data.map(subField => {

                        return [subField.name, '']
                    }))]
                    return [field.name, subFields[0]];
                }

            }
        })
    )

    const [formValues, setFormValues] = useState(initialFieldsState);
    const handleInputChange = (fieldName, value, index, subIndex,) => {

        setFormValues(prevState => {
            if (Array.isArray(prevState[fieldName])) {
                const updatedArray = [...prevState[fieldName]];
                updatedArray[index][Object.keys(updatedArray[index])[subIndex]] = value
                return { ...prevState, [fieldName]: updatedArray };
            } else {
                return { ...formValues, [fieldName]: { ...formValues[fieldName], [Object.keys(formValues[fieldName])[index]]: value } };

            }
        });
    };

    const handleImageChange = (e) => {
        const selectedFile = e.target.files[0];
        console.log(selectedFile)
        setImagen(selectedFile);
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        // Aquí podrías manejar la lógica para enviar los datos del formulario
        const datos = formValues
        datos.userID = crypto.randomUUID()
        datos.fecha_de_registro = new Date().toJSON().slice(0,10)
        console.log(datos.fecha_de_registro)
        datos.estado = true
        const formData = new FormData()
      
        // Agregar cada campo al objeto FormData
        formData.append("img", imagen)
        Object.entries(datos).forEach(([key, value]) => {

            if (value instanceof Array && value[0] instanceof Object) {
                value.forEach((item, index) => {
                    Object.entries(item).forEach(([subKey, subValue]) => {
                        if (subValue instanceof File) {
                            formData.append(`${key}[${index}][${subKey}]`, subValue);
                        } else {
                            formData.append(`${key}[${index}][${subKey}]`, subValue);
                        }
                    });
                });
            } else {
                if (value instanceof Object) {
                    Object.entries(value).forEach(([subKey, subValue]) => {
                        formData.append(`${key}[${subKey}]`, subValue);
                    })

                }
                else {
                    formData.append(key, value);
                }

            }
        });
        console.log("datos modificados:", datos)
        peticion(formData, url)
       
    };

    function agregarcampos(campos, index) {
        console.log(campos)
        console.log("index", index)
        const updatedFormValues = { ...formValues };
        const fieldName = formFields[index].name;
        const lengt = propscopy[index].data.length
        propscopy[index].data[lengt] = campos
        updatedFormValues[fieldName] = [
            ...formValues[fieldName],
            Object.fromEntries(campos.map(subField => [subField.name, '']))
        ];
        console.log(updatedFormValues)
        setFormValues(updatedFormValues);
    }
    console.log(imagen)

    return (
        <form className='formStyle' onSubmit={handleSubmit}>
            {propscopy.map((field, index) => (
                Array.isArray(field.data[0]) ? (
                    <div key={field.name}>
                        <h2 className='title'>{field.display}</h2>
                        <div className='seccioncontainer'>
                            {field.data.map((subField, subIndex) => (
                                <div key={`${field.name}-${subIndex}`} className='fildscontainer'>
                                    {subField.map((element, elementIndex) => {
                                        return renderFormField(element, field, subIndex, elementIndex)
                                    })}
                                </div>
                            ))}
                        </div>
                        <button type='button' onClick={() => agregarcampos(field.data[0], index)}>agregar campos</button>
                    </div>
                ) : (
                    <div key={`${field.name}-${index}`}>
                        <h2>{field.display}</h2>
                        {field.data.map((element, elementIndex) => {
                            return (
                                renderFormField(element, field, elementIndex)
                            )
                        })}
                    </div>
                )
            ))}
            <button type="submit">Submit</button>
        </form>
    );

};

NewForm.propTypes = {
    formFields: PropTypes.array,
    endpoind: PropTypes.string
}

export default NewForm;
