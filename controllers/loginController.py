from models.loginModels import loginUsuarioModel
from flask import jsonify #libreria para formatos json

def loginUsuariosController(datos):

    dataUser = loginUsuarioModel(datos)
    if dataUser:
        result = {
                "success": True, 
                "id": dataUser[0], 
                "nombre": dataUser[1], 
                "documento": dataUser[4],
                "correo": dataUser[5],
                "telefono": dataUser[6],
                "ciudad": dataUser[7]
                }
    else:
        result = {"success": False}
    return jsonify(result)
