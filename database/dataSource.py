#Conector de Mysql

# import pymysql.cursors

# class DataSourceMysql():
#     connection = ""

#     #constructor
#     def __init__(self, host, user, password, database):
#         self.connection = pymysql.connect(host=host,
#                              user=user,
#                              password=password,
#                              database=database,
#                              cursorclass=pymysql.cursors.DictCursor)
    
#     #función select
#     def getdata(self, sql): 
#         cursor = self.connection.cursor() #lee consultas sql
#         cursor.execute(sql) #Ejecuta la consulta sql
#         return cursor.fetchone() #Trae los datos que se cumplan
    
#     #Create, Delete and Update
#     def query(self, sql):
#         cursor = self.connection.cursor() #lee consultas sql
#         cursor.execute(sql) #Ejecuta la consulta sql
#         self.connection.commit()
    
#Ejemplo de mostrar en consola la información
# cmysql = DataSourceMysql("localhost", "root", "", "python")
# print(cmysql.getdata("SELECT * FROM `users`")) 

#Ingresar datos nuevos
# usuario = input("usuario: ")
# contraseña = input("Contraseña: ")
# sql = "INSERT INTO `users`(`usuario`, `contraseña`, `estado`) VALUES ('{0}', '{1}', 1)".format(usuario, contraseña)
# cmysql.query(sql) 

#Elimar datos
# cmysql = DataSourceMysql("localhost", "root", "", "python")
# usuario = input("usuario: ")
# sql = "DELETE FROM `users` WHERE usuario LIKE '{0}'".format(usuario)
# cmysql.query(sql)

#Actulizar datos
# nuevoUsuario = input("Ingrese nuevo nombre: ")
# sql ="UPDATE `users` SET `usuario`='{1}' WHERE usuario LIKE '{0}'".format(usuario, nuevoUsuario)
# cmysql.query(sql)


from pydal import DAL, Field #Importamos librerias

class DataSourceMysql:
    db = "" #conector Base de datos

    #constructor
    def __init__(self, host, user, passw, database, port, tipo_bd):

        # Conector Sqlite
        if tipo_bd == "sqlite":
            self.db = DAL("sqlite://" + database + ".db")
        
        # Conector Mysql
        elif tipo_bd == "mysql":
            self.db = DAL("mysql://" + user + ":" + passw + "@" + host + "/" + database)

        # Conector Postgresql
        elif tipo_bd == "postgres":
            self.db = DAL("postgres://" + user + ":"  + passw + "@" + host + "/" + database )
    
        # Conector Sql server
        elif tipo_bd == "sqlserver":
            self.db = DAL("mssql4://" + user + ":" + passw+ "@" + host+ "/" + database )
    
        # Conector Firebird
        elif tipo_bd == "firebird":
            self.db = DAL("firebird://" + user + ":" + passw+ "@" + host+ "/" + database )

        # Conector Oracle
        elif tipo_bd == "oracle":
            self.db = DAL("oracle://" + user + ":" + passw+ "@" + host+ "/" + database )  
        
        # Conector BD2
        elif tipo_bd == "db2":
            self.db = DAL("db2://" + user + ":" + passw+ "@" + database )

        # Conector Ingress
        elif tipo_bd == "ingres":
            self.db = DAL("ingres://" + user + ":" + passw + "@" + host + "/" + database )
        

    # funcion para la ejecucion de consultas sql tipo insert, delete, update
    def query (self, sql):
        try:
            self.db.executesql(sql)
            self.db.commit()
            return True
        except:
            return False
    
    # funcion para la ejecucion de transancciones (multiples consultas sql) 
    def transaction (self, list):
        try:
            for l in list:
                self.db.executesql(l)
            self.db.commit()
            return True
        except:
            return False

    # funcion para la ejecucion de consultas sql tipo select (obtener datos)        
    def getdata(self, sql):
        q = self.db.executesql(sql)
        self.db.commit()
        return q
        

