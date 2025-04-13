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
![](/assets/estructura_carpetas.png "Estructura de carpetas")

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

### PROBAR LA API EN POSTMAN

Para probar la API, es necesario los siguientes pasos en POSTMAN:

*** 1. METODO POST, INSERTAR RESERVAS***

Este metodo es util para crear  reservas. Para ello realizar lo siguiente:

a) Crear una "Collection" (grupo de solicitudes HTTP) en Postman. Para esto realizarlo en "Create new Collection" en la esquina superior izquierda en simbolo + .  El nombre puede ser "Reservas Hoteleras".

b) Una vez creada la coleccion, crear un metodo POST. Este nombrarlo como Todaslasreservas. Para esto, en el body del post, en la pestaña JSON, insertar el siguiente arreglo:

[
  {
    "hotel": "Hotel Dreams valdivia",
    "fecha": "2025-04-12",
    "tipoHabitacion": "doble",
    "adultos": 3,
    "niños": 2
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
    "niños": 3
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
![](/assets/TODASLASRESERVAS.png "Todas las reservas")
nota: Simpre guardar(esquina superior derecha)

***2. METODO GET, LISTAR RESERVAS***
Para realizar este metodo, simplemente crear el metodo post en postman tal como se realizo anteriormentey con la url http://localhost:3000/api/reservas en el metodo.
Al realizar clic en send, si no hay error, ir a la url para listar las reservas.

***3. METODO GET, OBTENER RESERVA POR ID***

Para obtener una reserva por id, se probara con el siguiente id:

f43791da-7836-43d1-b872-68d8ab799494

Para ello crear en postman con el metodo GET, insertar la siguiente url y realizar clic en send:

http://localhost:3000/api/reservas/f43791da-7836-43d1-b872-68d8ab799494

Ver la siguiente imagen:
![](/assets/busquedaporID.png "Busqueda por ID")
***4. METODO PUT : ACTUALIZAR RESERVA POR ID*** 
En el enunciado del ejercicio dice que es necesario cambiar una reserva.Originalmente se reservo una habitación doble, pero ahora se requiere una suite familiar. Se trabajara con cualquier codigo de reserva, por ejemplo el siguiente y se modificara el tipo de habitacion:

b267fe66-cdec-484d-a716-299b85897766

Agregar una nueva request en POSTMAN, con metodo PUT. Este se llamara actualizar reserva.
El link en postman sera el siguiente:
http://localhost:3000/api/reservas/b267fe66-cdec-484d-a716-299b85897766
Posteriormente en la pestaña body, subpestaña RAW, en JSON, insertar la modificacion solicitada:

{
  "tipoHabitacion": "suite familiar"
}

Realizar clic en send, y posteriormente para verificar , en el codigo json de la seccion inferior se puede verificar que se modifico el tipo de habitacion por familiar (ver la siguiente imagen).

![](/assets/actualizar_reserva.png)

***5. METODO DELETE: ELIMINAR RESERVA***
Para borrar la reserva crear una nueva request, y configurar la solicitud DELETE.
Ingresar el siguiente URL:
http://localhost:3000/api/reservas/253e175c-7d0c-4e87-a806-bca7e84e382e
Realizar clic en send. Para verificar que funciono deberia arrojar el mensaje :
Reserva con ID 253e175c-7d0c-4e87-a806-bca7e84e382e eliminada correctamente
Ver la siguiente imagen:
![](/assets/BorrarReserva.png "Eliminar reserva") 
***6. METODO GET : FILTRAR RESERVAS POR TIPO DE HABITACION***
Para filtrar reservas por tipo de habitacion, por ejemplo filtrar las que son "individual", crear una nueva request y configurar la solicitud GET.
Ingresar la siguiente URL:
http://localhost:3000/api/reservas?tipo_habitacion=individual
Si se desea filtrar por otro tipo, modificar el link al final y reemplazar la palabra indivudual por el tipo de habitacion y señalar de que tipo es(suite doble, suite familiar).
Al realizar clic en send, se desplegara un arreglo con todas las habitaciones individuales.
***7. METODO GET: FILTRAR POR FECHAS***
Para filtrar por fechade inicio y fecha de termino, crear un nuevo request en POSTMAN con el metodo GET.
El link es el siguiente:
http://localhost:3000/api/reservas?fecha_inicio=2025-04-06&fecha_fin=2025-04-10
En la url, si se desea otro rango de fechas , modificar la fechas actuales.
Para corroborar si esta bien el metodo, apareceran listadas las habitabiones del rango de fecha solicitada, caso contrario arrojara el mensaje "No hay reservas en la fecha solicitada".
Ver la siguiente imagen:
![](/assets/FiltrarporRangodefechas.png "Filtrar por rango de fechas")
***8. METODO GET : FILTRAR RESERVAS POR HOTEL***
Crear un nuevo request en postman con el metodo GET. La url es la siguiente:
http://localhost:3000/api/reservas?hotel=Hotel Paraíso
Posteriormente realizar clic en send, y los resultados de las reservas filtradas mostraran las reservas del "Hotel Paraiso".

***9. METODO GET : FILTRAR POR GRUPOS GRANDES DE HUESPEDES(> A 5 PERSONAS)  ***
Crear una nueva request y configurar el metodo get.Para ello, ingresar el siguiente link en postman:
http://localhost:3000/api/reservas?grupos_grandes=true
Realizar clic en send.Si hay reservas con 5 o más de 5 invitados, se recibira un arreglo con las reservas correspondientes y el detalle, caso contrario , arrojara el mensaje:
"No hay reservas para invitados con grupos sobre 5 personas".




***Nota importante: En todos los request, una vez se cree el metodo, siempre guardar **








