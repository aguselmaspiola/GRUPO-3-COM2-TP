const boton = document.getElementById("comenzar-trivia");
const introduccion = document.getElementById("introduccion");
const confirmar_formulario = document.getElementById("confirmar_formulario");
const questionario = document.getElementById("questionario");
const ganador = document.getElementById("ganador");
const perdedor = document.getElementById("perdedor");
const revizar_respuestas = document.querySelectorAll(".revizar");
const volver_a_resultado = document.getElementById("premio");
const preguntas = document.getElementById("preguntas");
let respuestas_correctas = 0;

const encuesta = document.getElementById("encuesta_satisfaccion");
const texto_encuesta = document.getElementById("texto_envio_encuesta");
const nvl_sat_encuesta_sat = document.getElementById("satisfaccion");
const error_opcion = document.getElementById("error_opcion");
const email = document.getElementById("email");
const error_email = document.getElementById("error_mail");
const nombre = document.getElementById("nombre");
const error_nombre = document.getElementById("error_nombre");

function comenzar() {
    introduccion.style.display = "none"
    perdedor.style.display = "none"
    ganador.style.display = "none"
    questionario.style.display = "block"
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

function chequear_sorteo(event){
    event.preventDefault();
    respuestas_correctas = 0
    if(verificar_respuestas_validas()){
        sumar_puntos()
        bloquear_opciones()
        confirmar_formulario.disabled = true
        confirmar_formulario.textContent = "Enviado, gracias por participar :)"
        post_envio_questionario()
    }
}
function post_envio_questionario(){
    if (respuestas_correctas>=7){
        questionario.style.display = "none"
        ganador.style.display = "block"
    }
    else{
        questionario.style.display = "none"
        perdedor.style.display = "block"
    }
    volver_a_resultado.style.display = "block"
}
function bloquear_opciones(){
for (let i = 1; i<=10; i++){
        const pregunta = document.getElementById("pregunta_"+i)
        pregunta.disabled = true
    }
}
function sumar_puntos(){
    for (let i = 1; i<=10; i++){
        const pregunta = document.getElementById("pregunta_"+i)
        if (pregunta.value==="bien"){
            respuestas_correctas++
        }
    }
}
function verificar_respuestas_validas(){
    let respuestas_validas = 0
    for (let i = 1; i<=10; i++){
        const pregunta = document.getElementById("pregunta_"+i);
        const error_opcion = document.getElementById("error_opcion_"+i);
        error_opcion.style.display = "none"
        if (!es_opcion_valida(pregunta.value)){
        error_opcion.style.display = "block"
        }
        else {
            respuestas_validas++;
        }
    }
    return respuestas_validas === 10
}

/*Los if son para que en caso de que el html no sea el qeu usa "comenzar trivia" 
no falle ahi. Lo mismo con la encuesta de satisfaccion*/

if (boton){
    boton.addEventListener("click", comenzar);
}

if (encuesta){
    encuesta.addEventListener("submit", fingir_envio);
}

if(preguntas){
    preguntas.addEventListener("submit", chequear_sorteo)
}

if(volver_a_resultado){
    volver_a_resultado.addEventListener("click", post_envio_questionario)
}

if(revizar_respuestas){
    revizar_respuestas.forEach (boton => {boton.addEventListener("click", comenzar)})
}
