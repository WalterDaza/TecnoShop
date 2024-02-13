from models.publicidadModels import * #importar todos los modelos
from flask import jsonify #libreria para formatos json

#Ver productos*******************************************
def verPublicidadControllers(id=""):
    datos = verPublicidadModel(id)
    result = []

    #estructura fotmato json
    for row in datos: #se cicla en el modelo
        contenido = {
            'id': row[0],
            'nombre': row[1],
            'descripcion': row[2],
            'url': row[3]
        }
        result.append(contenido) #se envia información al result

    return jsonify(result) #se convierte a json
