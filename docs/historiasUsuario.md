# Historias de usuarios


## Gestión de Inventarios

## Historia de usuario No.1
El sistema debe permitir la creación y mantenimiento de un catálogo de productos con detalles como nombre, descripción, número de artículo, categoría, precio y cantidad en stock.
#### Titulo:
Crear y modificar catalogo de productos.

### Descripción: 
Como admin, quiero crear, visualizar y modificar los productos que se encuentran en el catalogo para mantenerlo actualizado.

### Criterios de aceptación:
- Dado que se encuentrar en el catalogo, entonces debe verse los productos en forma de lista.
- Dado que se esta en el catalogo, entonces debe de verse las categorias de los productos en un barra superior.
- Dado que se visualiza algun producto, entonces debe de existir una opcion que diga "Modificar"
- Dado que se esta en el catalogo, entonces debe de existir un boton en el catalogo que diga "Añadir Producto".
- Dado que creo un producto, entonces se debe de registrar con la siguiente información:
    - Nombre
    - Descripción
    - ID Producto
    - Categoria 
    - Precio
    - Cantidad en stock

## Historia de usuario No.2
Debe permitir la actualización de los niveles de inventario cuando se realicen compras o ventas.
### Titulo: 
Visualizar el estado de inventario.

### Descripción;
Como usuario, quiero visualizar la cantidad disponible y el stock mínimo de cada producto, para conocer el estado actual del inventario
### Criterios de aceptación:
- Dado que el usuario accede al catálogo de productos, entonces debe visualizar por cada producto:
    - La cantidad disponible (ej: 5 unidades)
    - El stock mínimo definido
- Dado que el sistema muestra los productos, entonces debe incluir un indicador visual del nivel de stock mediante una barra.
- Dado que el nivel de stock cambia, entonces la barra debe reflejar proporcionalmente la cantidad disponible respecto al stock mínimo.

## Historia de usuario No.3

Debe generar alertas cuando los niveles de inventario sean bajos.

### Titulo:
Visualizar alertas de productos con stock bajo

### Descripción:
Como usuario, quiero identificar rápidamente los productos con stock bajo, para tomar acciones de reposición oportunamente.

### Criterios de aceptación:

- Dado que existen productos con stock menor al mínimo, entonces el sistema debe:
    - Mostrar una etiqueta de “Stock Bajo” en cada producto afectado
    - Resaltar visualmente el producto mediante colores (naranja o rojo)
- Dado que existen productos con stock bajo, entonces debe mostrarse un contador general indicando la cantidad (ej: “Stock Bajo (5)”).
- Dado que el usuario accede al catálogo, entonces debe existir una opción para filtrar o identificar fácilmente los productos con stock bajo.
- Dado que un producto tiene stock suficiente, entonces no debe mostrarse como alerta ni destacarse visualmente.

## Registro de Ventas y Compras

