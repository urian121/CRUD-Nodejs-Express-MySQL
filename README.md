# CRUD Nodejs con Express y MySQL2

    Crud completo con Node js y MySQL
    Este proyecto es una aplicación CRUD (Crear, Leer, Actualizar y Borrar) en Node.js utilizando el framework Express y la biblioteca `mysql2` para interactuar con una base de datos MySQL.

## Pasos para crear la aplicación

### Paso 1: Configuración inicial

1.  Crea un nuevo directorio para tu proyecto:

    mkdir nodejs-crud-mysql
    cd nodejs-crud-mysql

2.  Inicializa un proyecto Node.js:

    npm init -y

3.  Instala las dependencias necesarias: Express, Ejs y mysql2:

    npm install express ejs mysql2 cors

4.  Crea un archivo llamado db.js en la raíz de tu proyecto para configurar la conexión a la base de datos:

    import mysql from 'mysql2/promise';

        const pool = mysql.createPool({
        host: 'localhost',
        user: 'root',
        password: '', // Coloca tu contraseña de MySQL
        database: 'CrudNodejs',
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0,
        });

        export default pool;

#### Para correr el proyecto solo ejecutas

    npm install o npm i

#### Ejecutar el proyecto

    node --watch app.js ----> Opcion 1
    node app.js    -----> Opcion 2

#### Notas

    https://www.npmjs.com/package/mysql2

    La propiedad "type": "module", en el archivo packege.json indica que estamos usando el sistema de modulos ECMAScript(ESM).
    Con el fin de las palabras claves 'import' y 'export' para importar y exportar modulos respectivamente.
    Cuando usamos (ESM) algunas caracteriscticas de nodejs como require() y module.exports no estan disponibles, en su lugar estan import y export.

![](https://github.com/urian121/CRUD-Nodejs-Express-MySQL/blob/master/crud-completo-nodejs-express-mysql-urian-viera.png)
