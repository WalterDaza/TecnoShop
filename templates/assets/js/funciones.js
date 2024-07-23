document.addEventListener("DOMContentLoaded", init);
const URL = "http://127.0.0.1:3010/api/"

function init (){ //muestra todos los GET que se requieran en la pagina
    verProductos()
    if (esPaginaIndex()) { // unicamente muestra la publicidad si esta en la ruta index.html
        verPublicidad();
    }
}
//Card productos***********************************************************************************

// let productos = [];


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
}


//Registro**********************************************************************************************
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

//Inicio de Sesión***************************************************************************************
let userId = null; // Define una variable global para almacenar el ID del usuario

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

    if (respuesta.success){
        alert("Sesión Iniciada");

        userId = respuesta.id; // Almacena el ID del usuario

        // Ocultar el botón de inicio de sesión y registro
        document.querySelector(".inicioSesion").style.display = "none";
        document.querySelector(".registrate").style.display = "none";
        
        // Mostrar el menú desplegable
        document.querySelector(".dropdown").style.display = "inline-block";
        
        // Actualizar el texto del menú desplegable
        document.getElementById("user-name").innerText = "Hola, " + respuesta.nombre;

        // Llenar los campos del formulario de configuración con los datos del usuario
        document.getElementById("updateNombre").value = respuesta.nombre;
        document.getElementById("updateCorreo").value = respuesta.correo;
        document.getElementById("updateDocumento").value = respuesta.documento;
        document.getElementById("updateTelefono").value = respuesta.telefono;
        document.getElementById("updateCiudad").value = respuesta.ciudad;

    } else {
        alert("Credenciales Invalidas");
    }
}

// Añadir un event listener para cerrar sesión
document.getElementById("logout").addEventListener("click", function(){
    // Lógica para cerrar sesión
    alert("Sesión Cerrada");
    
    // Volver a mostrar el botón de inicio de sesión y registro
    document.querySelector(".inicioSesion").style.display = "inline-block";
    document.querySelector(".registrate").style.display = "inline-block";
    
    // Ocultar el menú desplegable
    document.querySelector(".dropdown").style.display = "none";
});

//configurar usuario********************************************************************************************
document.getElementById("guardarCambios").addEventListener("click", async function() {
    let data = {
        id: userId, // Asegúrate de tener el ID del usuario disponible en este contexto
        nombre: document.getElementById("updateNombre").value,
        telefono: document.getElementById("updateTelefono").value,
        ciudad: document.getElementById("updateCiudad").value,
        correo: document.getElementById("updateCorreo").value,
        numero_documento: document.getElementById("updateDocumento").value
    };

    let url = URL + "updateUser";
    let response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json"
        }
    });

    let respuesta = await response.json();

    if (respuesta.success) {
        alert("Datos actualizados correctamente");
    } else {
        alert("Error al actualizar los datos");
    }
});

//Eliminar usuario********************************************************************************************
// Añadir un event listener para el botón de eliminar usuario
document.getElementById("eliminarUser").addEventListener("click", async function() {
    if (!userId) {
        alert("No se pudo encontrar el ID del usuario.");
        return;
    }

    let url = URL + "deleteUser/" + userId;
    let response = await fetch(url, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
    });

    let respuesta = await response.json();

    if (respuesta.success) {
        alert("Usuario eliminado correctamente");
        // Opcional: puedes agregar lógica aquí para redirigir al usuario o limpiar el estado de la sesión
        // por ejemplo, redirigir al inicio de sesión o limpiar los campos del formulario
        // y ocultar elementos relacionados con el usuario logueado
        document.querySelector(".inicioSesion").style.display = "inline-block";
        document.querySelector(".registrate").style.display = "inline-block";
        document.querySelector(".dropdown").style.display = "none";
        document.getElementById("user-name").innerText = "";
        document.getElementById("updateNombre").value = "";
        document.getElementById("updateCorreo").value = "";
        document.getElementById("updateDocumento").value = "";
        document.getElementById("updateTelefono").value = "";
        document.getElementById("updateCiudad").value = "";
        userId = null; // Restablecer el ID de usuario
    } else {
        alert("Error al eliminar el usuario");
    }
});

//Ver Publicidad***********************************************************************************************
function esPaginaIndex() { //esta función detecta la ruta actual y se indica que se ejecute solo en index.html
    return window.location.pathname === '/index.html';
}

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

//Ver productos filtrados por categoria***************************************************************************
// Array de categorías
const categorias = ["celular1", "celular2", 
    "computador1", "computador2", "televisor1", "televisor2", 
    "video1", "video2", "consola1", "consola2", "audio1",  "audio2", 
    "almacenamiento1", "almacenamiento2"];

// Iterar sobre las categorías para crear los event listeners
categorias.forEach(categoria => {
    const elementoCategoria = document.getElementById(categoria); //id de la categoria
    if (elementoCategoria) {
        elementoCategoria.addEventListener("click", () => {
            const categoriaBase = categoria.replace(/\d+/g, ''); // Remover números para mantener la lógica de categoría base
            filtrosProductosCategoria(categoriaBase);
        });
    }
});

async function filtrosProductosCategoria(categoria){
    window.location.href = `templates/productos.html?variable=${categoria}`;
    //Se envia por la ruta la categoria donde haya dado click 
}

//Ver productos filtrados por descuento***************************************************************************
const descuentos = document.getElementById("descuento"); //Componente con ID "descuento"

descuentos.addEventListener("click", filtroProductoDescuento); // evento click y asignación de función

async function filtroProductoDescuento () { // función de ruta
    window.location.href = `templates/productos.html?variable=${"descuento"}`;
        //Se envia por la ruta la palabra descuento donde haya dado click 
}

//Ver productos por busqueda del input***************************************************************************
const searchInput = document.getElementById("searchInput");
const searchButton = document.getElementById("searchButton");
// Escuchar el evento de pulsación de tecla en el campo de búsqueda
searchInput.addEventListener("keyup", function(event) {
    if (event.key === "Enter") {
        realizarBusqueda(searchInput.value);
    }
});

// Escuchar el evento de clic en el botón de búsqueda
searchButton.addEventListener("click", function() {
    realizarBusqueda(searchInput.value);
});

function realizarBusqueda() {
    window.location.href = `templates/productos.html?input=${searchInput.value}`
}

