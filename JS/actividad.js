const boton = document.getElementById("comenzar-trivia");
const introduccion = document.getElementById("introduccion");
const preguntas = document.getElementById("preguntas");
function comenzar() {
    introduccion.style.display = "none";
    preguntas.style.display = "block";
}
boton.addEventListener("click", comenzar);