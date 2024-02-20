document.addEventListener("DOMContentLoaded", init);

function init (){ //muestra todos los GET que se requieran en la pagina
    mostrarFiltros()
}
const productosFiltrados = JSON.parse(localStorage.getItem('productosFiltrados'));

console.log(productosFiltrados)

function mostrarFiltros () {
    
    let html = "";

    for (producto of productosFiltrados){ //crear formato html
        let row = 
        `<div class="cardProduct-content">
        <div class="cardProducto-info">
            <h2>${producto.marca}</h2>
            <img class="cardProduct-img" src="${producto.URL_imagen}" alt="">
            <h1 class="">${producto.nombre}</h1>
            <h2>${producto.descripcion}</h2>    
            <h2>${producto.descuento}%</h2>
            <h2>${producto.precio}</h2>
            <h2>${producto.precio_descuento}</h2>
            <h2>Unidades disponibles ${producto.stock}</h2>
        </div>
        </div>`;
        html = html + row 
    }
    document.querySelector("#categoria").outerHTML = html 
}