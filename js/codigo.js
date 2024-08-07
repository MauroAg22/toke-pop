const docFicha = document.getElementById('ficha');
const docPuntos = document.getElementById('puntos');
const docTiempo = document.getElementById('tiempo');


const docMejorTiempo = document.getElementById('mejorTiempo');
const docMejorTiempoNormal = document.getElementById('mejorTiempoNormal');
const docMejorTiempoDificil = document.getElementById('mejorTiempoDificil');


const btnJugar = document.getElementById("btnJugar");
const btnResetear = document.getElementById("btnResetear");
const docFacil = document.getElementById('btnFacil');
const docNormal = document.getElementById('btnNormal');
const docDificil = document.getElementById('btnDificil');


function actualizarPuntaje(misPuntos, puntosNecesarios) {
    docPuntos.innerHTML = 'Puntos: ' + misPuntos + '/' + puntosNecesarios
}

function actualizarTiempo(miTiempo, tiempoLimite) {
    docTiempo.innerHTML = ' - Tiempo: ' + miTiempo + '/' + tiempoLimite;
}


let puntos = 0;
let tiempo = 0;
let necesario, tiempoLimite;
let dificultadActual = 0;
let evento = 'click';



function modificarLocalStorage(docTiempo, mejorTiempo) {
    if (localStorage.getItem(mejorTiempo) != null) {
        if (tiempo < localStorage.getItem(mejorTiempo)) {
            localStorage.setItem(mejorTiempo, tiempo);
            docTiempo.innerHTML = localStorage.getItem(mejorTiempo) + 's';
        }
    } else {
        localStorage.setItem(mejorTiempo, tiempo);
        docTiempo.innerHTML = localStorage.getItem(mejorTiempo) + 's';
    }
}




function sumarPuntos() {
    puntos++;
    if (puntos == necesario) {
        actualizarPuntaje(puntos, necesario);
        alert('\n\n¡GANASTE!\n\nTiempo final: ' + tiempo + 's');
        detenerTiempo();
        switch (dificultadActual) {
            case 0:
                modificarLocalStorage(docMejorTiempo, 'mejorTiempo');
            break;
            case 1:
                modificarLocalStorage(docMejorTiempoNormal, 'mejorTiempoNormal');
            break;
            case 2:
                modificarLocalStorage(docMejorTiempoDificil, 'mejorTiempoDificil');
            break;
        }
        tiempo = 0;
        puntos = 0;
        actualizarPuntaje(puntos, necesario);
        actualizarTiempo(tiempo, tiempoLimite);
        btnJugar.disabled = false;
        btnResetear.disabled = true;
        activarBoton(dificultadActual);
        docFicha.removeEventListener(evento, sumarPuntos);
        esconderFicha();
    } else {
        actualizarPuntaje(puntos, necesario);
        moverFicha();
    }
}
function moverFicha() {
    numberRandomTop = Math.floor(Math.random() * 451);
    numberRandomLeft = Math.floor(Math.random() * 451);

    docFicha.style.marginTop = numberRandomTop + 'px';
    docFicha.style.marginLeft = numberRandomLeft + 'px';
}
function sumarTiempo() {
    tiempo++;
    actualizarTiempo(tiempo, tiempoLimite);
    if (tiempo == tiempoLimite) {
        alert('\n¡PERDISTE!\n\nPuntaje ontenido: ' + puntos);
        tiempo = 0;
        puntos = 0;
        actualizarPuntaje(puntos, necesario);
        actualizarTiempo(tiempo, tiempoLimite);
        detenerTiempo();
        esconderFicha();
        btnJugar.disabled = false;
        btnResetear.disabled = true;
        activarBoton(dificultadActual);
        docFicha.removeEventListener(evento, sumarPuntos);
    }
}
function iniciarTiempo() {
    intervalo = setInterval(sumarTiempo, 1000);
}
function detenerTiempo() {
    clearInterval(intervalo);
}
function iniciarJuego() {
    btnJugar.disabled = true;
    btnResetear.disabled = false;
    docFacil.disabled = true;
    docNormal.disabled = true;
    docDificil.disabled = true;
    mostrarFicha();
    docFicha.addEventListener(evento, sumarPuntos);
    moverFicha();
    iniciarTiempo();
}
function resetearJuego() {
    btnJugar.disabled = false;
    btnResetear.disabled = true;
    activarBoton(dificultadActual);
    esconderFicha();
    detenerTiempo();
    puntos = 0;
    tiempo = 0;
    actualizarPuntaje(puntos, necesario);
    actualizarTiempo(tiempo, tiempoLimite);
}
function mostrarFicha() {
    docFicha.style.display = 'block';
    // docFicha.style.margin = '200px 218px';
}
function esconderFicha() {
    docFicha.style.display = 'none';
    // docFicha.style.margin = '200px 218px';
}
function facil() {
    docMejorTiempoNormal.innerHTML = '';
    docMejorTiempoDificil.innerHTML = '';
    
    if (localStorage.getItem('mejorTiempo') != null) {
        docMejorTiempo.innerHTML = localStorage.getItem('mejorTiempo') + 's';
    } else {
        docMejorTiempo.innerHTML = 'No establecido.';
    }

    docFacil.disabled = true;
    docNormal.disabled = false;
    docDificil.disabled = false;
    necesario = 12;
    tiempoLimite = 16;
    dificultadActual = 0;
    actualizarPuntaje(puntos, necesario);
    actualizarTiempo(tiempo, tiempoLimite);
    tituloDificultad('FÁCIL');

}
function normal() {
    docMejorTiempo.innerHTML = '';
    docMejorTiempoDificil.innerHTML = '';

    if (localStorage.getItem('mejorTiempoNormal') != null) {
        docMejorTiempoNormal.innerHTML = localStorage.getItem('mejorTiempoNormal') + 's';
    } else {
        docMejorTiempoNormal.innerHTML = 'No establecido.';
    }

    docFacil.disabled = false;
    docNormal.disabled = true;
    docDificil.disabled = false;
    necesario = 18;
    tiempoLimite = 20;
    dificultadActual = 1;
    actualizarPuntaje(puntos, necesario);
    docTiempo.innerHTML = ' - Tiempo: ' + tiempo + '/' + tiempoLimite;
    tituloDificultad('NORMAL');
}
function dificil() {
    docMejorTiempo.innerHTML = '';
    docMejorTiempoNormal.innerHTML = '';

    if (localStorage.getItem('mejorTiempoDificil') != null) {
        docMejorTiempoDificil.innerHTML = localStorage.getItem('mejorTiempoDificil') + 's';
    } else {
        docMejorTiempoDificil.innerHTML = 'No establecido.';
    }

    docFacil.disabled = false;
    docNormal.disabled = false;
    docDificil.disabled = true;
    necesario = 24;
    tiempoLimite = 16;
    dificultadActual = 2;
    actualizarPuntaje(puntos, necesario);
    docTiempo.innerHTML = ' - Tiempo: ' + tiempo + '/' + tiempoLimite;
    tituloDificultad('DIFÍCIL');
}
function tituloDificultad(dificultad) {
    document.getElementById('dificultad').innerHTML = dificultad;
}
function activarBoton(valor) {
    switch (valor) {
        case 0:
            docFacil.disabled = true;
            docNormal.disabled = false;
            docDificil.disabled = false;
        break;

        case 1:
            docFacil.disabled = false;
            docNormal.disabled = true;
            docDificil.disabled = false;
        break;

        case 2:
            docFacil.disabled = false;
            docNormal.disabled = false;
            docDificil.disabled = true;
        break;
    }
}


facil();