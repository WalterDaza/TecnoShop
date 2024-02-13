from models.registroModels import registroUsuariosModel
from flask import jsonify #libreria para formatos json


#Registrar Usuarios***********************************************
def crearUsuariosControllers(datos):
    result = [str(registroUsuariosModel(datos))] #se pasa la respuesta (boolean) a texto con str
    return jsonify(result)#se convierte a formato json
        
