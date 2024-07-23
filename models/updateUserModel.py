from database.dataSource import DataSourceMysql
from database.settings import configuracion

con = DataSourceMysql(
    configuracion["host"],
    configuracion["user"],
    configuracion["password"],
    configuracion["db"],
    configuracion["port"],
    configuracion["tipo_bd"]
)

def updateUsuarioModel(datos):
    sql = """
    UPDATE `comprador` 
    SET 
        `nombre` = '{1}',
        `telefono` = '{2}',
        `ciudad` = '{3}',
        `correo` = '{4}',
        `numero_documento` = '{5}'
    WHERE 
        `id` = '{0}';
    """.format(datos[0], datos[1], datos[2], datos[3], datos[4], datos[5]) # Actualiza la información en la DB

    result = con.query(sql)

    if result:
        return True
    else:
        return False

def deleteUsuarioModel(id):
    sql = """
    DELETE FROM `comprador`
    WHERE
        `id` = {0}
    """.format(id)

    result = con.query(sql)

    if result:
        return True
    else:
        return False