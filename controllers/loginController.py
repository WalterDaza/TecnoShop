from models.loginModels import loginUsuarioModel
from flask import jsonify #libreria para formatos json

def loginUsuariosController(datos):

    result = [str(loginUsuarioModel(datos))] #se pasa la respuesta (boolean) a texto con str
    return jsonify(result)
