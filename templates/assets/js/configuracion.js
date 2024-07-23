document.addEventListener("DOMContentLoaded", function() {
    var configuracionUser = document.querySelectorAll(".configuracion");
    var cardConfiguracion = document.querySelector(".configuracion-content");
    var cerrarConfiguracion = document.querySelector(".cerrarConfiguracion");
  
    configuracionUser.forEach(function(boton) {
      boton.addEventListener("click", function() {
        // Cambiar la visibilidad del modal
        cardConfiguracion.style.display = "block"; // Mostrar
      });
    });
  
    cerrarConfiguracion.addEventListener("click", function(event) {
        // Ocultar el modal al hacer clic en el icono de cerrar
        cardConfiguracion.style.display = "none";
        // Detener la propagación del evento para evitar que se propague al contenedor .registro--content
        event.stopPropagation();
    });
  
    cardConfiguracion.addEventListener("click", function(event) {
        // Ocultar el modal al hacer clic fuera de él (en el fondo oscuro)
        if (event.target === cardConfiguracion) {
            cardConfiguracion.style.display = "none";
        }
    });
  });