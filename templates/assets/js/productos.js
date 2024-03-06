document.addEventListener("DOMContentLoaded", init);
const URL = "http://127.0.0.1:3010/api/"

const valores = window.location.search; // se recibe la información enviada por la ruta
const urlParams = new URLSearchParams(valores); // se ingresa a los parametros de la ruta
const filtro = urlParams.get('variable'); // se identifica la variable recibida
const input = urlParams.get('input'); // se identifica la variable recibida
console.log(filtro)
console.log(input)


function init() {// se condiciona el valor que trae la ruta para ejecutar las peticiones a la db 
    verProductos()

    if (filtro === "descuento") { 
        filtroProductoDescuento(); //pertición de productos con descuento
    } else {
        filtrosProductosCategoria(filtro); // peticion con productos por categoria
    }
}

//filtro por descuento------------------------------------------------------------------
let filtroDescuento =  [];

async function filtroProductoDescuento () {
    let url = URL + "filtrodes"
    let respuesta = await fetch (url, {
        method: "GET",
        headers: {
            "Content-Type":"application/json"
        }
    });
    filtroDescuento = await respuesta.json();
    mostrarFiltros(filtroDescuento);
}

//filtro por categoria------------------------------------------------------------------
let filtroCategoria = [];

async function filtrosProductosCategoria(categoria){
    let url = URL + `filtrocat/${categoria}` //se le asigna el parametro a la URL

    let respuesta = await fetch(url, {
        method: "GET",
        headers: {
            "Content-Type":"application/json"
        }
    });
    filtroCategoria = await respuesta.json();
    mostrarFiltros(filtroCategoria); 
}


function mostrarFiltros(productos) {
    let html = "";
    productos.forEach(producto => {
        // Verificar si el descuento y el precio de descuento son diferentes de 0
        if (producto.descuento !== 0 && producto.precio_descuento !== 0) { 
            let row = `
                <div class="">
                    <div class="">
                        <h2>${producto.marca}</h2>
                        <img class="" src="${producto.URL_imagen}" alt="">
                        <h1 class="">${producto.nombre}</h1>
                        <h2 class="">${producto.descripcion}</h2>
                        <h2 class="">${producto.descuento}%</h2>
                        <h2 class="">${producto.precio}</h2>
                        <h2 class="">${producto.precio_descuento}</h2>
                        <h2 class="">Unidades disponibles ${producto.stock}</h2>
                    </div>
                </div>`;
            html += row;
        } else {
            // Si el descuento o el precio de descuento son 0, crear el elemento sin mostrarlos
            let row = `
                <div class="">
                    <div class="">
                        <h2>${producto.marca}</h2>
                        <img class="" src="${producto.URL_imagen}" alt="">
                        <h1 class="">${producto.nombre}</h1>
                        <h2 class="">${producto.descripcion}</h2>
                        <h2 class="">${producto.precio}</h2>
                        <h2 class="">Unidades disponibles ${producto.stock}</h2>
                    </div>
                </div>`;
            html += row;
        }
    });
    document.querySelector("#categoria").innerHTML = html;
}


// ******************************************

let resultadoinput = [];

async function verProductos(){
    let url = URL + "productos";

    //hacer petición a API
    let respuesta = await fetch(url, {
        method: "GET",
        headers: {
            "Content-Type":"application/json"
        }
    });
    resultadoinput = await respuesta.json(); //formato json
    console.log(resultadoinput)
    realizarBusqueda(input)
}

function realizarBusqueda(consulta) {
    // Filtrar productos que coincidan con la consulta
    const resultados = resultadoinput.filter(producto =>
        (producto.categoria && producto.categoria.toLowerCase().includes(consulta.toLowerCase())) ||
        (producto.nombre && producto.nombre.toLowerCase().includes(consulta.toLowerCase())) ||
        (producto.descripcion && producto.descripcion.toLowerCase().includes(consulta.toLowerCase())) ||
        (producto.marca && producto.marca.toLowerCase().includes(consulta.toLowerCase()))
    );
    // Mostrar los resultados (aquí podrías realizar cualquier acción con los resultados)
    console.log(resultados);
}