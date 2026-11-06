const boton = document.getElementById("comenzar-trivia");
const introduccion = document.getElementById("introduccion");
const preguntas = document.getElementById("preguntas");
const encuesta = document.getElementById("encuesta_satisfaccion");
const boton_encuesta_sat = document.getElementById("boton_encuesta_satisfaccion")
const texto_encuesta = document.getElementById("texto_envio_encuesta")

function comenzar() {
    introduccion.style.display = "none";
    preguntas.style.display = "block";
}

function fingir_envio(event) {
    event.preventDefault();
    encuesta.style.display = "none"
    texto_encuesta.style.display = "block"
}

/*Los if son para que en caso de que el html no sea el qeu usa "comenzar trivia" 
no falle ahi. Lo mismo con la encuesta de satisfaccion*/

if (boton){
    boton.addEventListener("click", comenzar);
}
if (encuesta){
    encuesta.addEventListener("submit", fingir_envio);
}