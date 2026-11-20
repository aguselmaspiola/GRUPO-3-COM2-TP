const boton = document.getElementById("comenzar-trivia");
const encuesta = document.getElementById("encuesta_satisfaccion");
const introduccion = document.getElementById("introduccion");
const cuestionario = document.getElementById("cuestionario");
const ganador = document.getElementById("ganador");
const perdedor = document.getElementById("perdedor");
const revisar_respuestas = document.querySelectorAll(".revisar");
const volver_a_resultado = document.getElementById("premio");
const preguntas_cuestionario = document.getElementById("preguntas_cuestionario");
const preguntas = document.querySelectorAll(".pregunta")
const texto_error = document.querySelectorAll(".texto_error")
let respuestas_correctas = 0;


function fingir_envio(event) {
    const texto_encuesta = document.getElementById("texto_envio_encuesta");
    const nvl_sat_encuesta_sat = document.getElementById("satisfaccion");
    const error_opcion = document.getElementById("error_opcion");
    const email = document.getElementById("email");
    const error_email = document.getElementById("error_mail");
    const nombre = document.getElementById("nombre");
    const error_nombre = document.getElementById("error_nombre");

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
const barra_progreso = document.getElementById("barra_progreso");
const contenedor_progreso = document.getElementById("contenedor_progreso");

function actualizar_progreso() {
    let contestadas = 0;
    preguntas.forEach(pregunta => {
        if (es_opcion_valida(pregunta.value)) {
            contestadas++;
        }
    });
    const porcentaje = Math.round((contestadas / preguntas.length) * 100);
    barra_progreso.style.width = porcentaje + "%";
    barra_progreso.textContent = porcentaje + "%";
    contenedor_progreso.setAttribute("aria-valuenow", porcentaje);
}
function comenzar() {
    introduccion.style.display = "none"
    perdedor.style.display = "none"
    ganador.style.display = "none"
    cuestionario.style.display = "block"
}
function chequear_sorteo(event){
    const confirmar_formulario = document.getElementById("confirmar_formulario");
    event.preventDefault();
    respuestas_correctas = 0
    if(verificar_respuestas_validas()){
        sumar_puntos()
        bloquear_opciones()
        confirmar_formulario.disabled = true
        confirmar_formulario.textContent = "Enviado, gracias por participar :)"
        post_envio_cuestionario()
        mostrar_preguntas_correctas()
    }
}
function mostrar_preguntas_correctas(){
    const display_preguntas_correctas = document.getElementById("display_preguntas_correctas");
    display_preguntas_correctas.textContent = `Tuviste ${respuestas_correctas}/10`
}
function post_envio_cuestionario(){
    if (respuestas_correctas >= 9){
        cuestionario.style.display = "none"
        ganador.style.display = "block"
    }
    else{
        cuestionario.style.display = "none"
        perdedor.style.display = "block"
    }
    volver_a_resultado.style.display = "block"
}
function bloquear_opciones(){
    preguntas.forEach (pregunta => {
        pregunta.disabled = true
    });
}
function sumar_puntos(){
    preguntas.forEach(pregunta => {
        if(pregunta.value === "bien"){
            respuestas_correctas++;
        }
    });
}
function verificar_respuestas_validas(){
    let respuestas_validas = 0
    preguntas.forEach ((pregunta, nro) =>{
        if (es_opcion_valida(pregunta.value)){
            texto_error[nro].style.display = "none"
            respuestas_validas++;
        }
        else{
            texto_error[nro].style.display = "block"
        }
    });
    return respuestas_validas === 10
}

// Para acceder rapidamente a la seccion perdedor y ganador

const acceso_ganador = document.getElementById("acceso-ganador");
const acceso_perdedor = document.getElementById("acceso-perdedor");

function mostrar_resultado_prueba(resultado) {
    introduccion.style.display = "none";
    cuestionario.style.display = "none";

    ganador.style.display = "none";
    perdedor.style.display = "none";

    if (resultado === "ganador") {
        ganador.style.display = "block";
    }
    else if (resultado === "perdedor") {
        perdedor.style.display = "block";
    }
}

if (acceso_ganador && acceso_perdedor) {
    acceso_ganador.addEventListener("click", () => {
        mostrar_resultado_prueba("ganador");
    });

    acceso_perdedor.addEventListener("click", () => {
        mostrar_resultado_prueba("perdedor");
    });
}

/*Los if son para que en caso de que el html no sea el que usa "comenzar trivia" 
no falle ahi. Lo mismo con la encuesta de satisfaccion*/

if (encuesta){
    encuesta.addEventListener("submit", fingir_envio);
}

if (boton){
    boton.addEventListener("click", comenzar);
    preguntas_cuestionario.addEventListener("submit", chequear_sorteo)
    volver_a_resultado.addEventListener("click", post_envio_cuestionario)
    revisar_respuestas.forEach (boton => {boton.addEventListener("click", comenzar)})
     preguntas.forEach(pregunta => {
        pregunta.addEventListener("change", actualizar_progreso)
    });
}

const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxTexto = document.getElementById('lightbox-texto');
const btnCerrar = document.getElementById('lightbox-cerrar');

// Abrir: cada imagen de los lugares
document.querySelectorAll('main section img').forEach(img => {
  img.addEventListener('click', () => {
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    lightboxTexto.textContent = img.alt;   // muestra el alt como pie de foto
    lightbox.hidden = false;
  });
});
const header = document.getElementById('header');

if (header) {
  let ultimoScroll = window.scrollY;

  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    if (y > ultimoScroll && y > 10) {
      header.style.transform = 'translateY(-100%)';   // bajando: se esconde
    } else {
      header.style.transform = 'translateY(0)';       // subiendo: aparece
    }
    ultimoScroll = y;
  });
}
const modalEl = document.getElementById('modalImagen');
  const modal = new bootstrap.Modal(modalEl);
  const grande = document.getElementById('imagenGrande');

  document.querySelectorAll('img:not(#imagenGrande):not(.no-popup)').forEach(img => {
    img.style.cursor = 'zoom-in';
    img.addEventListener('click', () => {
      grande.src = img.src;
      grande.alt = img.alt;
      modal.show();
    });
  });




function cerrar() {
  lightbox.hidden = true;
}

// Cerrar con el botón
btnCerrar.addEventListener('click', cerrar);

// Cerrar haciendo clic en el fondo oscuro (no en la imagen)
lightbox.addEventListener('click', (evento) => {
  if (evento.target === lightbox) cerrar();
});

// Cerrar con la tecla Escape
document.addEventListener('keydown', (evento) => {
  if (evento.key === 'Escape') cerrar();
});
