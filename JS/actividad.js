const boton = document.getElementById("comenzar-trivia");
const encuesta = document.getElementById("encuesta_satisfaccion");
const introduccion = document.getElementById("introduccion");
const cuestionario = document.getElementById("cuestionario");
const ganador = document.getElementById("ganador");
const perdedor = document.getElementById("perdedor");
const revisar_respuestas = document.querySelectorAll(".revisar");
const volver_a_resultado = document.getElementById("premio");
const preguntas_cuestionario = document.getElementById("preguntas_cuestionario");
const preguntas = document.querySelectorAll(".pregunta");
const estado_respuesta = document.querySelectorAll(".estado_respuesta");
let respuestas_correctas = 0;

const CLAVE_TRIVIA = "trivia_simpsons";

function leer_estado(){
    try {
        return JSON.parse(sessionStorage.getItem(CLAVE_TRIVIA)) || {};
    } catch {
        return {};
    }
}

function guardar_estado(cambios){
    const estado = { ...leer_estado(), ...cambios };
    sessionStorage.setItem(CLAVE_TRIVIA, JSON.stringify(estado));
}


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
    guardar_estado({ iniciado: true })
}

function chequear_sorteo(event){
    const confirmar_formulario = document.getElementById("confirmar_formulario");
    event.preventDefault();
    respuestas_correctas = 0
    if(verificar_respuestas_validas()){
        sumar_puntos()
        bloquear_opciones()
        guardar_estado({ enviado: true })
        confirmar_formulario.disabled = true
        confirmar_formulario.textContent = "Enviado, gracias por participar :)"
        post_envio_cuestionario()
        mostrar_preguntas_correctas()
    }
}

function mostrar_preguntas_correctas(){
    const display_preguntas_correctas = document.getElementById("display_preguntas_correctas");
    display_preguntas_correctas.textContent = `Respondiste ${respuestas_correctas} de 10 preguntas correctamente`

    preguntas.forEach((pregunta, nro) => {
    if(pregunta.value === "bien"){
        estado_respuesta[nro].textContent= "Correcta";
        estado_respuesta[nro].classList.add("respuesta_correcta");
    }
    else{
        estado_respuesta[nro].textContent= "Incorrecta";
        estado_respuesta[nro].classList.add("respuesta_incorrecta");
    }
    });
}

function post_envio_cuestionario(){
    const gano = respuestas_correctas >= 9;

    mostrar_mensaje_dios(gano)

    introduccion.style.display = "none"

    if (gano){
        cuestionario.style.display = "none"
        ganador.style.display = "block"
        lanzarConfetis()
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
            estado_respuesta[nro].textContent = ""
            respuestas_validas++;
        }
        else{
            estado_respuesta[nro].textContent = "¡Responde la pregunta!"
        }
    });
    return respuestas_validas === 10
}

// Para acceder rapidamente a la seccion perdedor y ganador

function mostrar_mensaje_dios(gano){
    const espera = document.getElementById("espera");
    const victoria = document.getElementById("victoria");
    const derrota = document.getElementById("derrota");

    if (!espera || !victoria || !derrota) return;

    espera.style.display = "none";
    victoria.style.display = gano ? "block" : "none";
    derrota.style.display = gano ? "none" : "block";
}

function lanzarConfetis() {
  const duracion = 3000; // 3 segundos
  const fin = Date.now() + duracion;
  const colores = ['#FED90F', '#3bdb48', '#FF6B6B', '#FFFFFF'];

  (function frame() {
    // un cañón desde cada lado
    confetti({
      particleCount: 4,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
      colors: colores
    });
    confetti({
      particleCount: 4,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
      colors: colores
    });

    if (Date.now() < fin) requestAnimationFrame(frame);
  })();
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
    pregunta.addEventListener("change", () => {
        actualizar_progreso();
        guardar_estado({ respuestas: Array.from(preguntas).map(p => p.value) });
    });
    });
    restaurar_estado();
}

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
  if (!img.classList.contains("img_header")) {
    img.style.cursor = 'zoom-in';
    img.addEventListener('click', () => {
      grande.src = img.src;
      grande.alt = img.alt;
      modal.show();
    });
  }
});

// Cerrar con la tecla Escape
document.addEventListener('keydown', (evento) => {
  if (evento.key === 'Escape') cerrar();
});

function restaurar_estado(){
    const estado = leer_estado();
    if (!estado.iniciado) return;

    if (estado.respuestas) {
        preguntas.forEach((pregunta, i) => {
            pregunta.value = estado.respuestas[i] ?? "";
        });
    }
    actualizar_progreso();

    if (estado.enviado) {
        const confirmar_formulario = document.getElementById("confirmar_formulario");
        respuestas_correctas = 0;
        sumar_puntos();
        bloquear_opciones();
        confirmar_formulario.disabled = true;
        confirmar_formulario.textContent = "Enviado, gracias por participar :)";
        mostrar_preguntas_correctas();
        post_envio_cuestionario();
    } else {
        comenzar();
    }
}