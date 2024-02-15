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
def loginUsuarioModel(datos):
    sql = """
    SELECT * FROM `comprador` 
    WHERE 
        `correo` = '{0}' and 
        `contrasena` = '{1}';
    """.format(datos[0], datos[1]) #consulta la información en db y devuelve la consulta

    result = con.getdata(sql)

    if result: #si existe el usuario traera un [] con la información del usuario encontrado
        return True
    else: 
        return False #si no trae información que retorne False