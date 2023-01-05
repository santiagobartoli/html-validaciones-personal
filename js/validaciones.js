const inputNacimiento = document.querySelector('#birth');

inputNacimiento.addEventListener('blur', (event1) => { /**blur is an event, see at w3s, JS HTML Events*/
    console.log(event1.target);
    validarNacimiento(event1.target);
});

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
