document.addEventListener("DOMContentLoaded", function() {
  var registro = document.querySelectorAll(".registrate");
  var cardRegistro = document.querySelector(".registro--content");
  var cerrarRegistro = document.querySelector(".cerrarRegistro");

  registro.forEach(function(boton) {
    boton.addEventListener("click", function() {
      // Cambiar la visibilidad del modal
      cardRegistro.style.display = "block"; // Mostrar
    });
  });

  cerrarRegistro.addEventListener("click", function(event) {
      // Ocultar el modal al hacer clic en el icono de cerrar
      cardRegistro.style.display = "none";
      // Detener la propagación del evento para evitar que se propague al contenedor .registro--content
      event.stopPropagation();
  });

  cardRegistro.addEventListener("click", function(event) {
      // Ocultar el modal al hacer clic fuera de él (en el fondo oscuro)
      if (event.target === cardRegistro) {
          cardRegistro.style.display = "none";
      }
  });
});