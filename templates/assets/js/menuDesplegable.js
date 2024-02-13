document.addEventListener("DOMContentLoaded", function() {
    var iconoMenu = document.getElementById("iconoMenu");
    var menuDesplegable = document.querySelector(".menu--desplegable");
    var iconoCerrar = document.querySelector(".cerrarMenu");
  
    iconoMenu.addEventListener("click", function() {
      // Cambiar la visibilidad del modal
        menuDesplegable.style.display = "block"; // Mostrar
      });
    iconoCerrar.addEventListener("click", function(event) {
      // Ocultar el menú desplegable al hacer clic en el icono de cerrar
      menuDesplegable.style.display = "none";
      // Detener la propagación del evento para evitar que se propague al contenedor .menu--desplegable
      event.stopPropagation();
      });
      menuDesplegable.addEventListener("click", function(event) {
      // Ocultar el modal al hacer clic fuera de él (en el fondo oscuro)
      if (event.target === menuDesplegable) {
        menuDesplegable.style.display = "none";
      }
    });
  });