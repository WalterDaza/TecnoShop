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

#Ver Productos completos**********************************************
def verProductosModel(id = ""):
    sql = """
        SELECT
            id, 
            nombre,
            marca,
            categoria,
            descuento,
            precio_descuento,
            descripcion,
            precio,
            URL_imagen,
            stock,
            id_vendedor
        FROM
            productos
    """
    return con.getdata(sql)

#Crear Productos*******************************************************
def crearProductosModel(datos):
    sql = """
    INSERT INTO productos
        (id, nombre,
            descripcion,
            precio,
            URL_imagen,
            stock,
            id_vendedor)
    VALUES
        (NULL, '{0}', '{1}', '{2}', '{3}', '{4}', '{5}')
    """.format(datos[0], datos[1], datos[2], datos[3], datos[4], datos[5])

    return con.query(sql)

#Modificar Productos****************************************************
def modifcarProductosModel(datos):
    sql = """
    UPDATE productos 
    SET
        nombre = '{1}'
        descripcion = '{2}'            
        precio = '{3}'
        URL_imagen = '{4}'
        stock = '{5}'
        id_vendedor = '{6}'
    WHERE
        productos.id = {0}
    """.format(datos[0], datos[1], datos[2], datos[3], datos[4], datos[5], datos[6])

    return con.query(sql)

#Borrar Productos******************************************************
def borrarProductosModel(id):
    sql = """
    DELETE FROM productos
    WHERE
        productos.id = {0}
    """.format(id)

    return con.query(sql)