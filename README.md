# backend_ef_node
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

>Observación: Al traer una ``Mesa`` por id ``(GET http://localhost:9090/api/mesa/:id)``, dentro de los datos ya se traen
> automáticamente todas las ``CabeceraConsumo`` con estado ``abierto``, junto con el ``Cliente``, sus ``DetalleConsumo``,
> y sus ``Productos``

## Model Categoría

### Crear
>**POST** http://localhost:9090/api/categoria/

json
```json
{
  "nombre": "Bebida"
}
```

### Actualizar
>**PUT** http://localhost:9090/api/categoria/:id

json
```json
{
  "nombre": "Platos"
}
```

### Borrar
>**DELETE** http://localhost:9090/api/categoria/:id

### Encontrar categoría por nombre
Ejemplo
>**GET** http://localhost:9090/api/categoria/?nombre=Platos

### Encontrar categoría por id
>**PUT** http://localhost:9090/api/categoria/:id

### Ver todas las categorías
>**GET** http://localhost:9090/api/categoria/

## Model Producto

### Crear
>**POST** http://localhost:9090/api/producto/

json
```json
{
  "nombre": "Gaseosa Coca Cola",
  "CategoriaId": 3,
  "precio_venta": 10000
}
```

### Actualizar
>**PUT** http://localhost:9090/api/producto/:id

json
```json
{
  "nombre": "Gaseosa Coca Cola",
  "CategoriaId": 3,
  "precio_venta": 5000
}
```

### Borrar
>**DELETE** http://localhost:9090/api/producto/:id

### Encontrar por nombre
Ejemplo
>**GET** http://localhost:9090/api/producto/?nombre=Gaseosa%20Coca%20Cola

### Encontrar por id
>**PUT** http://localhost:9090/api/producto/:id

### Ver todos los productos
>**GET** http://localhost:9090/api/producto/

## Model CabeceraConsumo

Almacena:
- Id de la mesa del consumo
- Id del cliente
- El estado del consumo
- El total del consumo
- La fecha y la hora de creación del consumo
- La fecha y hora de cierre del consumo

*Observación: Los ``GET`` ya devuelven la ``CabeceraConsumo`` con sus respectivos ``DetalleConsumo`` y ``Cliente``*


### Funciones
### Crear
>**POST** http://localhost:9090/api/cabecera_consumo

json

*("fecha_y_hora_creacion", "fecha_y_hora_cierre" y "estado" son opcionales)*

*("estado" sólo puede ser "abierto" o "cerrado")*
```json
{
  "MesaId": 1,
  "ClienteId": 1,
  "total": 0,
  "estado": "abierto",
  "fecha_y_hora_creacion": "2022-06-16:13:00",
  "fecha_y_hora_cierre": "2022-06-16:13:00"
}
```

### Actualizar
>**PUT** http://localhost:9090/api/cabecera_consumo/:id

json
```json
{
  "ClienteID": 1,
  "estado": "cerrado",
  "total": 0,
  "fecha_y_hora_cierre": "2022-06-16:13:00"
}
```

### Borrar
>**DELETE** http://localhost:9090/api/cabecera_consumo/:id

### encontrar (de manera opcional cada uno) por MesaId, ClienteId, estado

(si no se desea filtrar por uno de los campos, simplemente eliminarlo del url)
>**GET** http://localhost:9090/api/cabecera_consumo/?estado=abierto&MesaId=1&ClienteId=1

### Encontrar por id
>**PUT** http://localhost:9090/api/cabecera_consumo/:id

### Ver todas las cabeceras
>**GET** http://localhost:9090/api/cabecera_consumo/


## Model DetalleConsumo

Simboliza cada producto que se consume en la mesa.

Tiene una relación uno a muchos con ``CabeceraProducto`` y también con ``Producto``


*(Una ``Cabecera`` tiene muchos ``DetalleConsumo``)*

*(Un ``Producto`` tiene muchos ``DetalleConsumo``)*

Almacena:
- Id del producto
- Cantidad
- Id cabecera

*Observación: Todos los ``DetalleConsumo`` de una ``Cabecera`` ya son enviados en los ``GET`` de ``CabeceraConsumo``.
También los ``Producto`` ya son enviados en cada uno de esos ``DetalleConsumo``*.

También, cada vez que se crea un ``DetalleConsumo``, el campo ``total`` de ``CabeceraConsumo`` es actualizado con
su nuevo valor correspondiente.


### Funciones
### Crear
>**POST** http://localhost:9090/api/detalle_consumo/

json

```json
{
  "ProductoId": 2,
  "CabeceraConsumoId": 5,
  "cantidad": 1
}
```

### Actualizar
>**PUT** http://localhost:9090/api/detalle_consumo/:id

json
```json
{
  "ProductoId": 2,
  "CabeceraConsumoId": 5,
  "cantidad": 2
}
```

### Borrar
>**DELETE** http://localhost:9090/api/detalle_consumo/:id

### encontrar (de manera opcional cada uno) por ProductoId, CabeceraConsumoId

(si no se desea filtrar por uno de los campos, simplemente eliminarlo del url)

>**GET** http://localhost:9090/api/detalle_consumo/?ProductoId=2&CabeceraConsumo=5

### Encontrar por id
>**PUT** http://localhost:9090/api/detalle_consumo/:id

### Ver todos los DetalleConsumo
>**GET** http://localhost:9090/api/detalle_consumo/
