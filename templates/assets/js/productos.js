document.addEventListener("DOMContentLoaded", init);
const URLS = "http://127.0.0.1:3010/api/"

//Variables para traer la información de la ruta
const valores = window.location.search; // se recibe la información enviada por la ruta
const urlParams = new URLSearchParams(valores); // se ingresa a los parametros de la ruta
const filtro = urlParams.get('variable'); // se identifica la variable recibida
const input = urlParams.get('input'); // se identifica la variable recibida
console.log(filtro)
console.log(input)

// Actualizar la ruta al hacer clic en una nueva categoría
const categoriasActualizadas = ["celular", "computador", "televisor", "video", "consola", "audio", "almacenamiento"];
categoriasActualizadas.forEach(categoria => {
    const elementoCategoria = document.getElementById(categoria);
    elementoCategoria.addEventListener("click", () => {
        // Actualizar la ruta con la nueva categoría seleccionada
        window.location.href = `productos.html?variable=${categoria}`;
    });
});

// Almacena las opciones originales de marca y precio
let opcionesMarcasOriginales = [];
let opcionesPreciosOriginales = [];

function init() { 
    obtenerProductosOriginales();

    // Agregar event listener para el cambio de marca
    const selectMarca = document.getElementById('marca');
    selectMarca.addEventListener('change', function() {
    const marcaSeleccionada = this.value;
    if (marcaSeleccionada === '') {
        // Si se selecciona la opción de quitar todos los filtros de marca
        mostrarFiltros(resultadosfiltro); // Mostrar los filtros originales
    } else {
        // Filtrar por marca seleccionada
        filtrarPorMarca(marcaSeleccionada);
    }
    });

    // Agregar event listener para el cambio de precio
    const selectPrecio = document.getElementById('precio');
    selectPrecio.addEventListener('change', function() {
        const precioSeleccionado = parseFloat(this.value); // Convertir a número
        filtrarPorPrecio(precioSeleccionado);
    });
    if (filtro) {
        mostrarMensaje(`Categoria "${filtro}"`);
    } else if (input) {
        mostrarMensaje(`Resultado de búsqueda "${input}"`);
    }
}

function mostrarMensaje(mensaje) {
    const mensajeElement = document.createElement('div');
    mensajeElement.textContent = mensaje;
    document.getElementById('mensaje').appendChild(mensajeElement);
}

async function obtenerProductosOriginales() {
    let url = '';

    // Determinar la URL según el filtro
    if (filtro === "descuento") {
        url = URLS + "filtrodes"; // URL para filtrar por descuento
    } else if (input !== null) {
        url = URLS + "productos"; // URL para búsqueda por input
    } else {
        url = URLS + `filtrocat/${filtro}`; // URL para filtrar por categoría
    }

    // Realizar la petición para obtener los productos originales
    let respuesta = await fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    });
    let productosOriginales = await respuesta.json();

    // Almacenar las opciones originales de marca y precio solo si aún no se han almacenado
    if (opcionesMarcasOriginales.length === 0 && opcionesPreciosOriginales.length === 0) {
        opcionesMarcasOriginales = [...new Set(productosOriginales.map(producto => producto.marca))];
        opcionesPreciosOriginales = [...new Set(productosOriginales.map(producto => producto.precio))];
    }

    // se condiciona el valor que trae la ruta para ejecutar las peticiones a la db  
    if (filtro === "descuento") { 
        filtroProductoDescuento(); //petición de productos con descuento
    } else if (input !== null){
        verProductos()
    } else {
        filtrosProductosCategoria(filtro); // peticion con productos por categoria
    }
}

// variable global de filtros--------------------------------------------------------
let resultadosfiltro = []

//filtro por descuento------------------------------------------------------------------
async function filtroProductoDescuento () {
    let url = URLS + "filtrodes"
    let respuesta = await fetch (url, {
        method: "GET",
        headers: {
            "Content-Type":"application/json"
        }
    });
    resultadosfiltro = await respuesta.json();
    console.log(resultadosfiltro)
    mostrarFiltros(resultadosfiltro);
}

//filtro por categoria------------------------------------------------------------------
async function filtrosProductosCategoria(categoria){
    let url = URLS + `filtrocat/${categoria}` //se le asigna el parametro a la URL

    let respuesta = await fetch(url, {
        method: "GET",
        headers: {
            "Content-Type":"application/json"
        }
    });
    resultadosfiltro = await respuesta.json()
    console.log(resultadosfiltro)
    mostrarFiltros(resultadosfiltro)
}

//filtro por busqueda input search------------------------------------------------------------------
async function verProductos(){
    let url = URLS + "productos";

    //hacer petición a API
    let respuesta = await fetch(url, {
        method: "GET",
        headers: {
            "Content-Type":"application/json"
        }
    });
    resultadosfiltro = await respuesta.json(); //formato json
    if (input !== null) {
        realizarBusqueda(input);
    }
}

function realizarBusqueda(consulta) {
    // Filtrar productos que coincidan con la consulta
    const resultados = resultadosfiltro.filter(producto =>
        (producto.categoria && producto.categoria.toLowerCase().includes(consulta.toLowerCase())) ||
        (producto.nombre && producto.nombre.toLowerCase().includes(consulta.toLowerCase())) ||
        (producto.descripcion && producto.descripcion.toLowerCase().includes(consulta.toLowerCase())) ||
        (producto.marca && producto.marca.toLowerCase().includes(consulta.toLowerCase()))
    );
    // Mostrar los resultados (aquí podrías realizar cualquier acción con los resultados)
    resultadosfiltro = resultados
    console.log("Hola: ",resultadosfiltro);
    mostrarFiltros(resultadosfiltro);
}

// Filtrar por marca
function filtrarPorMarca(marca) {
    const productosFiltrados = resultadosfiltro.filter(producto => producto.marca === marca);
    mostrarFiltros(productosFiltrados, marca);
}

// Filtrar por precio
function filtrarPorPrecio(precio) {
    const productosFiltrados = resultadosfiltro.filter(producto => parseFloat(producto.precio) === precio);
    mostrarFiltros(productosFiltrados);
}

// Filtrar por marca y precio
function filtrarPorMarcaYPrecio(marca, precio) {
    const productosFiltrados = resultadosfiltro.filter(producto =>
        producto.marca === marca && parseFloat(producto.precio_descuento) === precio
    );
    mostrarFiltros(productosFiltrados, marca);
}


//muestra según la acción los productos--------------------------------------------
function mostrarFiltros(productos, marcaSeleccionada) {

   // Función para formatear números con separadores de miles
    function formatearNumero(numero) {
        return numero.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
     
    
    let html = "";
    let preciosUnicos = new Set();
    productos.forEach(producto => {
        preciosUnicos.add(producto.precio);
        let precioDescuentoFormateado = formatearNumero(producto.precio_descuento);
        let precioFormateado = formatearNumero(producto.precio);
        // Verificar si el descuento y el precio de descuento son diferentes de 0
        if (producto.descuento !== 0 && producto.precio_descuento !== 0) { 
            let row = `
                <div class="cardProduct-content">
                    <h2 class="cardProduct-marca">${producto.marca}</h2>
                    <div class="cardProduct-img-content">
                        <img class="cardProduct-img" src="${producto.URL_imagen}" alt="">
                    </div>
                    <h1 class="cardProduct-nombre">${producto.nombre}</h1>
                    <hr class="division"/>
                    <h2 class="cardProduct-descripcion">${producto.descripcion}</h2>
                    <h2 class="cardProduct-descuento">-${producto.descuento}%</h2>
                    <h2 class="cardProduct-precioDescuento">$ ${precioDescuentoFormateado}</h2>
                    <h2 class="cardProduct-precio tachado">$ ${precioFormateado}</h2>
                    <h2 class="cardProduct-stock">Uds. disponibles: ${producto.stock}</h2>
                    <button class="cardProduct-carrito" onclick="agregarAlCarrito(${producto.id})">Agregar a Carro</button>
                </div>`;
            html += row;
        } else {
            // Si el descuento o el precio de descuento son 0, crear el elemento sin mostrarlos
            let row = `
                <div class="cardProduct-content">
                    <h2 class="cardProduct-marca">${producto.marca}</h2>
                    <div class="cardProduct-img-content">
                        <img class="cardProduct-img" src="${producto.URL_imagen}" alt="">
                    </div>
                    <h1 class="cardProduct-nombre">${producto.nombre}</h1>
                    <hr class="division"/>
                    <h2 class="cardProduct-descripcion">${producto.descripcion}</h2>
                    <h2 class="cardProduct-precio">$ ${precioFormateado}</h2>
                    <h2 class="cardProduct-stock">Uds. disponibles ${producto.stock}</h2>
                    <button class="cardProduct-carrito" onclick="agregarAlCarrito(${producto.id})">Agregar a Carro</button>
                </div>`;
            html += row;
        }
    });

    // creación de lista de marcas---------------------------------------
    const selectMarca = document.getElementById('marca'); //id del select
    selectMarca.innerHTML = ''; // Limpiar opciones anteriores

   // Agregar opción inicial
   const optionMarcaInicial = document.createElement('option');
   optionMarcaInicial.value = '';
   optionMarcaInicial.textContent = 'Seleccione marca';
   selectMarca.appendChild(optionMarcaInicial);

     opcionesMarcasOriginales.forEach((marca) => { //itera la varible marcasUnicas y crea option de manera dinamica
         const optionMarca = document.createElement('option');
         optionMarca.value = marca;
         optionMarca.textContent = marca;
         selectMarca.appendChild(optionMarca);
     });

    // Agregar opción para quitar todos los filtros de marca
    const optionQuitarFiltrosMarca = document.createElement('option');
    optionQuitarFiltrosMarca.value = '';
    optionQuitarFiltrosMarca.textContent = 'Quitar todos los filtros de marca';
    selectMarca.appendChild(optionQuitarFiltrosMarca);
    
     let preciosFiltrados;
     if (marcaSeleccionada) {
        // Filtrar productos por marca seleccionada
        const productosFiltrados = productos.filter(producto => producto.marca === marcaSeleccionada);
        // Obtener precios únicos de los productos filtrados
        const preciosUnicos = new Set(productosFiltrados.map(producto => producto.precio));
        // Convertir el conjunto de precios únicos a un array
        preciosFiltrados = [...preciosUnicos];
    } else {
        // Mostrar todos los precios originales si no se ha seleccionado una marca
        const preciosUnicos = new Set(opcionesPreciosOriginales.filter((precio) => precio !== 0));
        preciosFiltrados = [...preciosUnicos];
    }

     // creación de lista de precios---------------------------------------
     const selectPrecio = document.getElementById('precio');
     selectPrecio.innerHTML = '';
 
    const optionPrecioInicial = document.createElement('option');
    optionPrecioInicial.value = '';
    optionPrecioInicial.textContent = 'Seleccione precio';
    selectPrecio.appendChild(optionPrecioInicial);

    preciosFiltrados.forEach (precio => {
    const optionPrecio = document.createElement('option');
    optionPrecio.value = precio;
    optionPrecio.textContent = precio;
    selectPrecio.appendChild(optionPrecio);
     });
     console.log(opcionesMarcasOriginales) 
     console.log(opcionesPreciosOriginales)
    document.querySelector("#categoria").innerHTML = html;
}

// Carrito de compras -----------------------------------------------------------------------------------------

// Variable global para almacenar los productos en el carrito
let carrito = [];

// Función para agregar un producto al carrito
function agregarAlCarrito(idProducto) {
    // Encontrar el producto seleccionado por su ID
    const productoSeleccionado = resultadosfiltro.find(producto => producto.id === idProducto);
    
    // Verificar si el producto ya está en el carrito
    const productoExistente = carrito.find(producto => producto.id === idProducto);
    
    if (productoExistente) {
        // Si el producto ya está en el carrito, incrementar la cantidad
        productoExistente.cantidad++;
    } else {
        // Si no está en el carrito, agregarlo con cantidad 1
        carrito.push({ ...productoSeleccionado, cantidad: 1 });
    }
    
    // Actualizar el carrito en la interfaz
    actualizarCarrito();
}

function actualizarCarrito() {
    const carritoProductos = document.getElementById('carritoProductos');
    const totalCompraSpan = document.getElementById('totalCompra');
    
    // Limpiar el contenido actual del carrito
    carritoProductos.innerHTML = '';
    
    // Recorrer todos los productos en el carrito
    let totalCompra = 0;
    carrito.forEach(producto => {
        const productoHTML = `
            <div class="carritoProducto" data-productId="${producto.id}">
                <div class="carritoProducto-info">
                    <div class="carrito-img-content">
                        <img class="carrito-img" src="${producto.URL_imagen}" alt="">
                    </div>
                    <h3 class="carritoProducto-nombre">${producto.nombre}</h3>
                    <h3>$${producto.precio}</h3>
                </div>
                <div class="carritoProducto-cantidad-content">
                    <div class="carritoProducto-cantidad">
                        <button class="cantidadBtn" onclick="restarCantidad(${producto.id})">-</button>
                        <h3 class="cantidadProducto">${producto.cantidad}</h3>
                        <button class="cantidadBtn" onclick="sumarCantidad(${producto.id})">+</button>
                    </div>
                    <button class="eliminarProducto" onclick="eliminarDelCarrito(${producto.id})">Eliminar</button>
                </div>
            </div>
        `;
        carritoProductos.innerHTML += productoHTML;
        
        // Calcular el subtotal del producto y sumarlo al total de la compra
        const subtotalProducto = producto.precio * producto.cantidad;
        totalCompra += subtotalProducto;
    });
    
    // Mostrar el total de la compra
    totalCompraSpan.textContent = totalCompra.toFixed(2);
}

function restarCantidad(idProducto) {
    const productoExistente = carrito.find(producto => producto.id === idProducto);
    if (productoExistente && productoExistente.cantidad > 1) {
        productoExistente.cantidad--;
    }
    actualizarCarrito();
}

function sumarCantidad(idProducto) {
    const productoExistente = carrito.find(producto => producto.id === idProducto);
    if (productoExistente) {
        productoExistente.cantidad++;
    }
    actualizarCarrito();
}

function eliminarDelCarrito(idProducto) {
    const indiceProducto = carrito.findIndex(producto => producto.id === idProducto);
    
    if (indiceProducto !== -1) {
        carrito.splice(indiceProducto, 1);
    }
    
    actualizarCarrito();
}

function vaciarCarrito() {
    carrito = []; // Vaciar el arreglo carrito
    actualizarCarrito(); // Actualizar la interfaz para reflejar el carrito vacío
}
