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

#Ver Publicidad completa**********************************************
def verPublicidadModel(id):
    sql = """
        SELECT
            id, 
            nombre,
            descripcion,
            urlmax,
            urlmin
        FROM
            publicidad
    """    
    return con.getdata(sql)