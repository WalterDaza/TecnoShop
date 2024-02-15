document.addEventListener("DOMContentLoaded", init);
const URL = "http://127.0.0.1:3010/api/"

function init (){ //muestra todos los GET que se requieran en la pagina
    verProductos(),
    verPublicidad()
}
//Card productos***********************************************************************

let productos = [];


async function verProductos(){
    let url = URL + "productos";

    //hacer petición a API
    let respuesta = await fetch(url, {
        method: "GET",
        headers: {
            "Content-Type":"application/json"
        }
    });
    productos = await respuesta.json(); //formato json

    let html = "";

    for (producto of productos){ //crear formato html
        let row = 
        `<div class="cardProduct-content">
            <div class="cardProducto-info">
                <h1 class="">${producto.nombre}</h1>
                <h2>${producto.descripcion}</h2>    
                <h2>${producto.precio}</h2>
                <img class="cardProduct-img" src="${producto.URL_imagen}" alt="">
                <h2>${producto.stock}</h2>
                <h2>${producto.id_vendedor}</h2>
            </div>
        </div>`;
        html = html + row 
    }
    document.querySelector("#productos").outerHTML = html  //mostar en pantalla el formato ya creado
}


//Registro*************************************************************************************
async function registroUser(){
    let data = { //data con Id's de los inputs creado en el formulario
        nombre: document.getElementById("txtNombre").value,
        contrasena: document.getElementById("txtContrasena").value,
        tipo_documento: document.getElementById("txtTipoDocumento").value,
        numero_documento: document.getElementById("txtNumeroDocumento").value,
        correo: document.getElementById("txtCorreo").value,
        telefono: document.getElementById("txtTelefono").value,
        ciudad: document.getElementById("txtCiudad").value
    }

    let url = URL + "registro" //es la url a utilizar 
    let response = await fetch(url, {
    method: "POST", //metodo POST para registra nuevo usuario
    body: JSON.stringify(data), //convierte en formato json la data ingresada por el user
    headers: {
        "Content-Type": "application/json", 
    },
    })

    let respuesta = await response.json() //esperamos que la response nos devuelva un json

    if (respuesta[0] == "True"){
        alert("Usuario Guardado exitosamente")
    }else{
        alert("Hubo un error")
    }

    window.location.reload(); //Actualización de
}

//Inicio de Sesión***********************************************************************************
async function loginUser(){
    let data = {
        correo: document.getElementById("txtloginCorreo").value,
        contrasena: document.getElementById("txtloginContrasena").value
    }
    let url = URL + "login"
    let response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json"
        }
    })

    let respuesta = await response.json()

    if (respuesta[0] == "True"){
        alert("Sesión Iniciada")
    }else{
        alert("Credenciales Invalidas")
    }

    window.location.reload();
}

//Ver Publicidad***********************************************************************
let publicidades = [];

async function verPublicidad(){
    let url = URL + "publicidad";

    //hacer petición a API
    let respuesta = await fetch(url, {
        method: "GET",
        headers: {
            "Content-Type":"application/json"
        }
    });
    publicidades = await respuesta.json(); //formato json

    // console.log(publicidades)
    // Asignar las URLs de las imágenes de la publicidad
    for (let i = 0; i < publicidades.length; i++) {
        let imagen = document.getElementById(`imagen${i + 1}`); //itera el id de cada img
        let src = window.innerWidth >= 768 ? publicidades[i].urlmax : publicidades[i].urlmin;
        imagen.src = src; //si es superior a 768px mostrara urlmax y si es inferior urlmin
        imagen.alt = publicidades[i] ? publicidades[i].descripcion : ""; // Si hay publicidad, asignar la descripción, de lo contrario, dejar alt vacío
    }
}