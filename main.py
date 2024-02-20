from flask import Flask, render_template, request
from flask_cors import CORS, cross_origin

from controllers.productsControllers import * #importación de controladores
from controllers.registroController import *
from controllers.loginController import *
from controllers.publicidadController import *
from controllers.filtrosProductsController import *

app = Flask(__name__) #instaciamiento
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-type'

#rutas

#ver productos*****************************************************************************************
@app.route('/api/productos')
@cross_origin()
def getAllProduct():
    return verProductosControllers()

#ver producto id***************************************
@app.route('/api/productos/<id>')
@cross_origin()
def getProduct(id):
    return verProductosControllers(id)

#Modificar y Crear productos***************************
@app.route('/api/productos', methods = ["POST"])
@cross_origin()
def createUpdateProduct():
    if 'id' in request.json:
        result = updateProduct()
    else:
        result = createProduct()
    return result

def createProduct():
    datos = [
        request.json['nombre'],
        request.json['descripcion'],
        request.json['precio'],
        request.json['URL_imagen'],
        request.json['stock'],
        request.json['id_vendedor']
    ]
    return crearProductosControllers(datos)

def updateProduct():
    datos = [
        request.json['nombre'],
        request.json['descripcion'],
        request.json['precio'],
        request.json['URL_imagen'],
        request.json['stock'],
        request.json['id_vendedor']
    ]
    return modifcarProductosControllers(datos)

#Borrar Productos****************************************
@app.route('/api/productos/<id>', methods = ["DELETE"])
@cross_origin()

def removeUsers(id):
    return borrarProductosControllers(id)


#Registro User*******************************************************************************************
@app.route('/api/registro', methods = ["POST"])
@cross_origin()

def createUser(): #información que se solicita al usuario en formato JSON
    datos = [
        request.json['nombre'],
        request.json['contrasena'],
        request.json['tipo_documento'],
        request.json['numero_documento'],
        request.json['correo'],
        request.json['telefono'],
        request.json['ciudad']
    ]
    result = crearUsuariosControllers(datos)

    return result
#Login Usuarios****************************************************************************************
@app.route('/api/login', methods=["POST"])
@cross_origin()

def loginUser(): #información que se solicita al usuario en formato JSON
    datos = [
        request.json['correo'],
        request.json['contrasena']
    ]

    result = loginUsuariosController(datos)
    return result

#Ver publicidad******************************************************************************************
@app.route('/api/publicidad')
@cross_origin()
def getAllPublicidad():
    return verPublicidadControllers()

#Filtros Productos*********************************************************************************************

#Filtro por marca***************
@app.route('/api/filtromarca/<marca>')
@cross_origin()
def filtroMarca(marca):
    return filtroMarcaController(marca)

#Filtro por categoria***************
@app.route('/api/filtrocategoria/<categoria>')
@cross_origin()
def filtroCategoria(categoria):
    return  filtroCategoriaController(categoria)


#pagina por defecto
@app.route("/")
@cross_origin()

def index():
    return "Servidor API TecnoShop"


if __name__ == '__main__':
    app.run(port  = 3010, debug = True)