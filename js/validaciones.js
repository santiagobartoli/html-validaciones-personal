/** -En vez de hacer uno por uno como lo de abajo, se reemplaza por algo general para no repetir codigo.-

const inputNacimiento = document.querySelector('#birth');

inputNacimiento.addEventListener('blur', (event1) => {
    console.log(event1.target);
    validarNacimiento(event1.target);
});
*/
export function valida(input) {  /**export allows to use this function on others js files */
    const tipoDeInput = input.dataset.tipo;
    if (validadores[tipoDeInput]) { /**verifica si en validadores existe el tipo de input */
        validadores[tipoDeInput](input); /**busca ese tipo de input en validadores y le pasa el argumento para la funcion */
    }

    /**to change the style when a field content is incorrect */

    console.log(input.parentElement);

    if (input.validity.valid) { /**see logseq "inspecting code on browser" */
        input.parentElement.classList.remove("input-container--invalid"); /**taken from css files. */
        input.parentElement.querySelector('.input-message-error').innerHTML = ''; /**va a buscar la clase en algun lugar
                                                                                del parent element. */
    } else {
        input.parentElement.classList.add("input-container--invalid");
        input.parentElement.querySelector('.input-message-error').innerHTML = mostrarMensajeError(tipoDeInput, input);
    }
};

const validadores = { /**objeto */
    nacimiento: (input) => validarNacimiento(input), /**cuando se le pasa el parametro llama a validarNacimiento() */
    
};

const tipoDeErrores = [ /**errores que voy a usar tomados del web-console, element, $0.validity. See in logseq. */
    "valueMissing",
    "typeMismatch",
    "patternMismatch",
    "customError"
];

function mostrarMensajeError(tipoDeInput, input) {
    let mensaje = "";
    tipoDeErrores.forEach(error => {
        if (input.validity[error]) {
            console.log(error);
            console.log(input.validity[error]);
            console.log(mensajeError[tipoDeInput][error]); /**voy maheacndo el error que quiero encontrar */

            mensaje = mensajeError[tipoDeInput][error]; /**mando el error que encontre al mensaje. */
        };
    });

    return mensaje;
};

const mensajeError = { /**objeto */
    nombre: { /**otro objeto */
        valueMissing: "El campo de nombre no puede estar vacio." /**se toma de la web-console, elemento, $0.validity. Ver en logseq*/
    },
    email: {
        valueMissing: "El campo de email no puede estar vacio.",
        typeMismatch: "No es un correo valido"
    },
    password: {
        patternMismatch: "Al menos 6 caracteres, máximo 12, debe contener una letra minúscula, una letra mayúscula, un número y no puede contener caracteres especiales.",
    },
    nacimiento: {
        valueMissing: "El campo nacimiento no puede estar vacio.",
        customError: 'Debe tener al menos 18 ainos'
    },
    numero: {
        valueMissing: "El campo phonenumber no puede estar vacio.",
        patternMismatch: 'Formato XXXXXXXXXX (10 numeros)'
    },
    direccion: {
        valueMissing: "El campo direccion no puede estar vacio.",
        patternMismatch: 'La direccion debe contener entre 10 y 40 caracteres.'
    },
    ciudad: {
        valueMissing: "El campo ciudad no puede estar vacio.",
        patternMismatch: 'La direccion debe contener entre 10 y 40 caracteres.'
    },
    estado: {
        valueMissing: "El campo estado no puede estar vacio.",
        patternMismatch: 'La direccion debe contener entre 10 y 40 caracteres.'
    }
}


function validarNacimiento(input) {
    const fechaCliente = new Date(input.value);
    let mensaje = '';
    if (!mayorDeEdad(fechaCliente)) {
        mensaje = 'Debe tener al menos 18 ainos';
    }
    console.log(mensaje);
    input.setCustomValidity(mensaje); /**sets a custom validation for a form field. (sale al intentar enciar el form.*/
}

function mayorDeEdad(fecha) {
    const fechaActual = new Date();
    const diferenciaFechas = new Date(
        fecha.getUTCFullYear() + 18, fecha.getUTCMonth(), fecha.getUTCDay()
    );
    return diferenciaFechas <= fechaActual;
}
