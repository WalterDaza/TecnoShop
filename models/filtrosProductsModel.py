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

#Filtro de productos por marcas*******************************************
def filtroMarcaProductosModel (marca):
    sql = """
        SELECT  *
        FROM 
            productos
        WHERE 
            marca = '{0}';
    """.format(marca)

    result = con.getdata(sql)
    return result

#Filtro de productos por categoria*******************************************
def filtroCategoriaProductoModel (categoria):
    sql = """
            SELECT  *
        FROM 
            productos
        WHERE 
            categoria = '{0}';
    """.format(categoria)

    result = con.getdata(sql)
    return result