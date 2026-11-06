const boton = document.getElementById("comenzar-trivia");
const introduccion = document.getElementById("introduccion");
const preguntas = document.getElementById("preguntas");
const encuesta = document.getElementById("encuesta_satisfaccion");
const boton_encuesta_sat = document.getElementById("boton_encuesta_satisfaccion")

function comenzar() {
    introduccion.style.display = "none";
    preguntas.style.display = "block";
}

function fingir_envio(event) {
    event.preventDefault();
    encuesta.reset();
    boton_encuesta_sat.textContent = "Enviado :)";
    boton_encuesta_sat.disabled = true;
    boton_encuesta_sat.style.background = "var(--color_fondo)" 
    boton_encuesta_sat.style.color = "var(--color_texto)"
}

/*Los if son para que en caso de que el html no sea el qeu usa "comenzar trivia" 
no falle ahi. Lo mismo con la encuesta de satisfaccion*/

if (boton){
    boton.addEventListener("click", comenzar);
}
if (encuesta){
    encuesta.addEventListener("submit", fingir_envio);
}