from models.productsModels import * #importar todos los modelos
from flask import jsonify #libreria para formatos json

#Ver productos*******************************************
def verProductosControllers(id=""):
    datos = verProductosModel(id)
    result = []

    #estructura fotmato json
    for row in datos: #se cicla en el modelo
        contenido = {
            'id': row[0],
            'nombre': row[1],
            'descripcion': row[2],
            'precio': row[3],
            'URL_imagen' : row[4],
            'stock' : row[5],
            'id_vendedor' : row[6]
        }
        result.append(contenido) #se envia información al result

    return jsonify(result) #se convierte a json

#Crear Produtos******************************************
def crearProductosControllers(datos):
    result = [str(crearProductosModel(datos))] #se pasa la respuesta (boolean) a texto con str
    return jsonify(result)#se convierte a formato json

#Modificar Productos**************************************
def modifcarProductosControllers(datos):
    result = [str(modifcarProductosModel(datos))] #se pasa la respuesta (boolean) a texto con str
    return jsonify(result)

#Eliminar Productos*****************************************
def borrarProductosControllers(id):
    result = [str(borrarProductosModel(id))] #se pasa la respuesta (boolean) a texto con str
    return jsonify(result)