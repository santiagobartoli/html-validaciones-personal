import { valida } from "./validaciones.js"; /**importa la funcion del otro archivo para poder usarla */

const inputs = document.querySelectorAll('input'); /**importa todos los imputs y los guarda como un arreglo. */

inputs.forEach((input) => { /**asigna un listener to every 'input' tag */
    input.addEventListener("blur", (input) => {
        valida(input.target); /**va a validar cada input of the form cuando ocurre el "blur" */
    })
});