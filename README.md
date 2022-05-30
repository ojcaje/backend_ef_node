# backend_tp2_node
### se realizo el grafico de mesas en el frontend, en el menu restaurantes, boton ver plano de mesas
## crear base de datos
nombre de la base de datos: dbpwb
## ejecutar server
node server.js
## cargar datos de prueba
POST http://localhost:9090/api/cliente/ 

{
    "nombre": "Antonio",
    "cedula": 1234567,
    "apellido": "Flags"
}

POST http://localhost:9090/api/restaurante/

{
    "nombre": "Le Restaurant",
    "direccion": "Italia 123 casi Francia"
}

POST http://localhost:9090/api/mesa

{
    "nombre": "Mesa 1",
    "RestauranteId": 1,
    "posicionx": 100,
    "posiciony": 100,
    "planta": 1,
    "capacidad": 4
}

