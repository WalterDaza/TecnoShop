document.addEventListener("DOMContentLoaded", function() {
    var carrito = document.querySelectorAll(".carrito--compras");
    var cardCarrito = document.querySelector(".cart-content");
    var cerrarCarrito = document.querySelector(".cerrarCarrito");
  
    carrito.forEach(function(boton) {
      boton.addEventListener("click", function() {
        // Cambiar la visibilidad del modal
        cardCarrito.style.display = "block"; // Mostrar
      });
    });
  
    cerrarCarrito.addEventListener("click", function(event) {
        // Ocultar el modal al hacer clic en el icono de cerrar
        cardCarrito.style.display = "none";
        // Detener la propagación del evento para evitar que se propague al contenedor .registro--content
        event.stopPropagation();
    });
  
    cardCarrito.addEventListener("click", function(event) {
        // Ocultar el modal al hacer clic fuera de él (en el fondo oscuro)
        if (event.target === cardCarrito) {
            cardCarrito.style.display = "none";
        }
    });
  });