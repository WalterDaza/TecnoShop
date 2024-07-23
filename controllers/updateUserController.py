from models.updateUserModel import updateUsuarioModel, deleteUsuarioModel
from flask import jsonify

def updateUsuarioController(datos):
    success = updateUsuarioModel(datos)
    if success:
        result = {"success": True, "message": "Usuario actualizado correctamente"}
    else:
        result = {"success": False, "message": "Error al actualizar el usuario"}
    return jsonify(result)

def deleteUsuarioController(id):
    success = deleteUsuarioModel(id)
    if success:
        result = {"success": True, "message": "Usuario eliminado correctamente"}
    else:
        result = {"success": False, "message": "Error al eliminar el usuario"}
    return jsonify(result)