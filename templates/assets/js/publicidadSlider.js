const btnLeft = document.querySelector(".btn-left"),
    btnRigth = document.querySelector(".btn-rigth"),
    slider = document.querySelector("#slider"),
    sliderSection = document.querySelectorAll(".slider-section");

let intervalId;

// Agregar evento de click a los botones
btnLeft.addEventListener("click", moveToLeft);
btnRigth.addEventListener("click", moveToRigth);

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