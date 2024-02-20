from models.filtrosProductsModel import * #importar todos los modelos
from flask import jsonify #libreria para formatos json

#Filtro de productos por marcas*******************************************
def filtroMarcaController(marca):
    datos = filtroMarcaProductosModel(marca)
    result = []

    for row in datos: 
        contenido = {
            'id': row[0],
            'nombre': row[1],
            'descripcion': row[2],
            'marca': row[3],
            'descuento': row[4],
            'precio_descuento': row[5],
            'categoria': row[6],
            'precio': row[7],
            'URL_imagen': row[8],
            'stock': row[9],
            'id_vendedor': row[10]
        }
        result.append(contenido)

    return jsonify(result) 

#Filtro de productos por categoria*******************************************
def filtroCategoriaController(categoria):
    datos = filtroCategoriaProductoModel(categoria)
    result = []

    for row in datos: 
        contenido = {
            'id': row[0],
            'nombre': row[1],
            'descripcion': row[2],
            'marca': row[3],
            'descuento': row[4],
            'precio_descuento': row[5],
            'categoria': row[6],
            'precio': row[7],
            'URL_imagen': row[8],
            'stock': row[9],
            'id_vendedor': row[10]
        }
        result.append(contenido)

    return jsonify(result)

#Filtro de productos por precio**********************************************