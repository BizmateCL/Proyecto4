## README PROYECTO RESERVAS HOTELERAS

Crear en un servidor, una API REST en el Framework Express y se trabajara con las peticiones CRUD (Crear, leer, actualizar y eliminar).
Nota importante: API REST : usa el protocolo HTTP para transferir datos de forma eficiente y flexible. Los datos se trabajan con peticiones crud. 
Para el frontend se utilizará la herramienta Postmand debido a 3 motivos:
1.	Amplia popularidad
2.	Cantidad de documentación en Gitgub 
3.	Estabilidad.
Proyecto gestión de reservas de hoteles de la ciudad de valdivia
Consistirá en la gestión de reservas de hoteles para turistas y visitantes de la ciudad.

***Características del proyecto***
Se contara con un archivo .env y .gitignore. El primero se establecen las variables de entorno. En el segundo estarán las carpetas y archivos que se ocultarán para el repositorio.
Ademas de ello, cuenta con la siguiente estructura de carpetas:
![](\assets\estructura_carpetas.png "Estructura de carpetas")

***Aplicación de servicios/peticiones crud con métodos post, get, put, delete que tendra las siguientes caracteristicas:***
-Creación de reservas de hoteles
-Visualizar lista de reservas
-listar una reserva acorde a su numero de id (identificador único de la reserva)
-Actualizar información de una reserva
-Eliminar una reserva
-Buscar reservas acorde a criterios específicos ( fecha, tipo de habitación, estado, numero de huéspedes)
-Almacenar los datos en un arreglo

***Requisitos previos***

1. Tener instalado [Node.js](https://nodejs.org/).
2. Tener instalado [Postman](https://www.postman.com/) o la extension de visual studio code Thunderclient para probar la api
3. Clonar este repositorio y ejecutar `npm install` para instalar las dependencias.

*** Configuración del proyecto (carpeta '.env')***

1. Crear un archivo `.env` en la raíz del proyecto con el siguiente contenido:

PUERTO=3000
2. Ejecutar el servidor con el comando:
npm run dev
Nota: Con esta instruccion , se iniciará el servidor en el puerto 3000 (o el puerto configurado en el archivo `.env`).

3. Una vez ejecutado el comando , arrojara el mensaje "Servidor escuchando en el puerto 3000". 

***Probar la API en POSTMAN***

Para probar la API, es necesario los siguientes pasos en POSTMAN:

*** 1. METODO POST, insertar reservas***

Este metodo es util para crear  reservas. Para ello realizar lo siguiente:

a) Crear una "Collection" (grupo de solicitudes HTTP) en Postman. Para esto realizarlo en "Create new Collection" en la esquina superior izquierda en simbolo + .  El nombre puede ser "Reservas Hoteleras".

b) Una vez creada la coleccion, crear un metodo POST. Este nombrarlo como Todaslasreservas. Para esto, en el body del post, en la pestaña JSON, insertar el siguiente arreglo:

[
  {
    "hotel": "Hotel Dreams valdivia",
    "fecha": "2025-04-12",
    "tipoHabitacion": "doble",
    "adultos": 2,
    "niños": 1
  },
  {
    "hotel": "Hotel Cabañas el bosque",
    "fecha": "2025-04-10",
    "tipoHabitacion": "suite",
    "adultos": 1,
    "niños": 0
  },
  {
    "hotel": "Hotel Melillanca",
    "fecha": "2025-04-14",
    "tipoHabitacion": "individual",
    "adultos": 1,
    "niños": 0
  },
  {
    "hotel": "Hotel Paraíso",
    "fecha": "2025-04-05",
    "tipoHabitacion": "doble",
    "adultos": 3,
    "niños": 2
  },
  {
    "hotel": "Hotel Dreams valdivia",
    "fecha": "2025-04-15",
    "tipoHabitacion": "suite",
    "adultos": 2,
    "niños": 1
  }
]

C)Posteriormente realizar clic en Send, para insertar el arreglo en el archivo /datos/reservas.json.
Para verificar si los datos se cargaron, simplemente ingresar a la carpeta y verificarlo.
A continuacion se presenta un screenshot de Postman del metodo en cuestion:
![](\assets\TODASLASRESERVAS.png "Todas las reservas")
nota: Simpre guardar(esquina superior derecha)

***2. METODO GET, listar reservas***
Para realizar este metodo, simplemente crear el metodo post en postman tal como se realizo anteriormentey con la url http://localhost:3000/api/reservas en el metodo.
Al realizar clic en send, si no hay error, ir a la url para listar las reservas.

3. ***. METODO GET, Obtener reserva por id***

Para obtener una reserva por id, se probara con el siguiente id:

f43791da-7836-43d1-b872-68d8ab799494

Para ello crear en postman con el metodo GET, insertar la siguiente url y realizar clic en send:

http://localhost:3000/api/reservas/f43791da-7836-43d1-b872-68d8ab799494

Ver la siguiente imagen:
![](\assets\busquedaporID.png "Busqueda por ID")
4. METODO DELETE
5. METODO



