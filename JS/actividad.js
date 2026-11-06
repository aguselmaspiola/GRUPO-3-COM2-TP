const boton = document.getElementById("comenzar-trivia");
const introduccion = document.getElementById("introduccion");
const preguntas = document.getElementById("preguntas");
const error_opcion = document.getElementById("error_opcion")
const encuesta = document.getElementById("encuesta_satisfaccion");
const texto_encuesta = document.getElementById("texto_envio_encuesta")
const nvl_sat_encuesta_sat = document.getElementById("satisfaccion")
const email = document.getElementById("email")
const error_email = document.getElementById("error_mail")
const nombre = document.getElementById("nombre")
const error_nombre = document.getElementById("error_nombre")

function comenzar() {
    introduccion.style.display = "none";
    preguntas.style.display = "block";
}

function fingir_envio(event) {
    event.preventDefault();
    error_opcion.style.display = "none"
    error_email.style.display = "none"
    error_nombre.style.display = "none"

    if(es_nombre_valido(nombre.value) && es_opcion_valida(nvl_sat_encuesta_sat.value) && es_email_valido(email.value)){
        encuesta.style.display = "none"
        texto_encuesta.style.display = "block"
        texto_encuesta.textContent = `Gracias ${nombre.value} por contestar nuestra encuesta :)`
    }
    if (!es_nombre_valido(nombre.value)){
        error_nombre.style.display = "block"}
    if (!es_opcion_valida(nvl_sat_encuesta_sat.value)){
       error_opcion.style.display = "block"}
    if (!es_email_valido(email.value)){
        error_email.style.display = "block"
    }
}

function es_nombre_valido(nombre){
    return nombre !== ""
}

function es_opcion_valida(tipo_opcion){
    return tipo_opcion !== ""
}

function es_email_valido(email){
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/*Los if son para que en caso de que el html no sea el qeu usa "comenzar trivia" 
no falle ahi. Lo mismo con la encuesta de satisfaccion*/

if (boton){
    boton.addEventListener("click", comenzar);
}
if (encuesta){
    encuesta.addEventListener("submit", fingir_envio);
}