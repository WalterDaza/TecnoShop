from database.dataSource import DataSourceMysql #importación de conexión de base de datos
from database.settings import configuracion #asignación de valores db

connetion = DataSourceMysql(
    configuracion["host"],
    configuracion["user"],
    configuracion["password"],
    configuracion["db"],
    configuracion["port"],
    configuracion["tipo_bd"]
)

#Registrar usuarios*******************************************************
def registroUsuariosModel(datos):
    sql = """
    INSERT INTO comprador
        (id, nombre, contrasena, tipo_documento, numero_documento, correo, telefono, ciudad)
    VALUES
        (NULL, '{0}', '{1}', '{2}', '{3}', '{4}', '{5}', '{6}')
    """.format(datos[0], datos[1], datos[2], datos[3], datos[4], datos[5], datos[6])
    
    print("sql: ", sql)
    return connetion.query(sql)
    
   