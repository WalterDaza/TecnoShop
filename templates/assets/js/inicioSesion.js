document.addEventListener("DOMContentLoaded", function() {
  var inicioSesion = document.querySelectorAll(".inicioSesion");
  var cardInicioSesion = document.querySelector(".inicio--sesion--content");
  var cerrarinicioSesion = document.querySelector(".cerrarSesion");
  
    inicioSesion.forEach(function(boton) {
      boton.addEventListener("click", function() {
          // Cambiar la visibilidad del modal
          cardInicioSesion.style.display = "block"; // Mostrar
      });
  });

  cerrarinicioSesion.addEventListener("click", function(event) {
      // Ocultar el modal al hacer clic en el icono de cerrar
      cardInicioSesion.style.display = "none";
      // Detener la propagación del evento para evitar que se propague al contenedor .inicio--sesión--content
      event.stopPropagation();
  });

  cardInicioSesion.addEventListener("click", function(event) {
      // Ocultar el modal al hacer clic fuera de él (en el fondo oscuro)
      if (event.target === cardInicioSesion) {
          cardInicioSesion.style.display = "none";
      }
  });
});
