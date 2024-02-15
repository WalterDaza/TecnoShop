const btnLeft = document.querySelector(".btn-left"),
    btnRigth = document.querySelector(".btn-rigth"),
    slider = document.querySelector("#slider"),
    sliderSection = document.querySelectorAll(".slider-section");


//Funciones de dar play y pausar movimiento automatico si el mause esta dentro del slider////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
let intervalId;

// Iniciar el desplazamiento automático
intervalId = setInterval(moveToRigth, 5000);

// Agregar manejadores de eventos para pausar el desplazamiento automático cuando el mouse está sobre el slider
slider.addEventListener("mouseenter", pauseSlider);
slider.addEventListener("mouseleave", resumeSlider);

// Función para pausar el desplazamiento automático
function pauseSlider() {
    clearInterval(intervalId);
}

// Función para reanudar el desplazamiento automático
function resumeSlider() {
    intervalId = setInterval(moveToRigth, 5000);
}

//Que cuando pase a modo celular, inferior a 720px de ancho, se maneje el slider de manera tactil////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Variables para almacenar las coordenadas de inicio y fin del toque
let touchStartX = 0;
let touchEndX = 0;

// Manejador de evento para el inicio del toque
function handleTouchStart(event) {
    // Almacena la coordenada X del primer punto de contacto con la pantalla
    touchStartX = event.touches[0].clientX;
}

// Manejador de evento para el movimiento del toque
function handleTouchMove(event) {
    // Actualiza la coordenada X del último punto de contacto con la pantalla mientras se mueve el dedo
    touchEndX = event.touches[0].clientX;
}

// Manejador de evento para el final del toque
function handleTouchEnd() {
    // Si el desplazamiento horizontal del dedo es mayor a 50 píxeles hacia la izquierda, mueve el slider hacia la derecha
    if (touchStartX - touchEndX > 50) {
        moveToRigth();
    } 
    // Si el desplazamiento horizontal del dedo es mayor a 50 píxeles hacia la derecha, mueve el slider hacia la izquierda
    else if (touchEndX - touchStartX > 50) {
        moveToLeft();
    }
}

// Agregar manejadores de eventos para los eventos táctiles
slider.addEventListener("touchstart", handleTouchStart);
slider.addEventListener("touchmove", handleTouchMove);
slider.addEventListener("touchend", handleTouchEnd);

//Funciones de movimiento al dar click////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Agregar evento de click a los botones
btnLeft.addEventListener("click", moveToLeft);
btnRigth.addEventListener("click", moveToRigth);

//Funcion para mover el slider a la derecha

let operacion = 0,
    counter = 0,
    widthImg = 100 / sliderSection.length;


function moveToRigth () {
    if (counter >= sliderSection.length-1){
        counter = 0;
        operacion = 0;
        slider.style.transform = `translate(-${operacion}%)`;
        slider.style.transition = "none"
        return;
    }
    counter++;
    operacion = operacion + widthImg;
    slider.style.transform = `translate(-${operacion}%)`;
    slider.style.transition = "all ease .6s"
}

//Funcion para mover el slider a la izquierda

function moveToLeft(){
    counter --;
    if (counter < 0){
        counter = sliderSection.length-1;
        operacion = widthImg * (sliderSection.length-1)
        slider.style.transform = `translate(-${operacion}%)`
        slider.style.transition = "none"
        return;
    }
    operacion = operacion - widthImg;
    slider.style.transform = `translate(-${operacion}%)`;
    slider.style.transition = "all ease .6s"
}