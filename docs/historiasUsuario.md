
# Gestión de Inventarios

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

# Registro de Ventas y Compras

### Historia de usuario No1.1

Debe permitir a los empleados registrar ventas de productos a clientes.

### Titulo: 
Registrar las ventas de los productos en el carrito.

### Descripción:
Como vendedor, quiero añadir productos al carrito de venta para registrar la compra del cliente de manera rrapida y controlada.

### Criterios de aceptación:


- Dado que el vendedor esta en el modulo de venta,cuando selecciona un producto, entonces el sistema debe agregarlo al carrito.
- Dado que el producto ya está en el carrito, cuando el vendedor presiona el botón “+”, entonces la cantidad debe incrementarse en una unidad.
- Dado que el producto está en el carrito, cuando el vendedor presiona el botón “-”, entonces la cantidad debe disminuir en una unidad.
- Dado que la cantidad de un producto llega a 0, entonces el producto debe eliminarse automáticamente del carrito.
- Dado que el vendedor intenta agregar más productos que el stock disponible, entonces el sistema debe impedirlo.
- Dado que el vendedor está en el carrito, entonces debe poder eliminar un producto completamente (icono de basurita).


### Historia de usuario No1.2

* Debe permitir la creación de órdenes de compra a proveedores para reponer inventario.

### Titulo:
Crear órdenes de compra a proveedores

### Descripción:
Como administrador, quiero crear órdenes de compra a proveedores para reabastecer productos cuando el stock sea bajo.

### Criterios de aceptación:
- Dado que el administrador accede al módulo de reportes, entonces debe poder crear una nueva orden de compra.
-  Dado que el usuario está creando una orden, entonces debe poder seleccionar un proveedor.
- Dado que el usuario está creando una orden, entonces debe poder seleccionar un proveedor.
- Dado que el usuario está creando una orden, entonces debe poder añadir uno o varios productos a la orden.
- Dado que el usuario añade un producto, entonces debe poder especificar la cantidad a comprar.
- Dado que el usuario confirma la orden, entonces el sistema debe registrar la orden de compra.
- Dado que una orden ha sido creada, entonces debe quedar guardada con un estado (por ejemplo: pendiente).
- Dado que el usuario intenta crear una orden sin productos, entonces el sistema debe impedirlo y mostrar un mensaje.


### Historia de usuario No1.3

Debe mantener un historial de todas las transacciones de ventas y compras.

### Titulo:
Visualizar transacciones.

### Descripción:
Como administrador, quiero visualizar todas las transacciones eso incluye órdenes de compra, historial de ventas y todas las transacciones.

### Criterios de aceptación:
- Dado que el administrador esta en el modulo de reportes, entonces debe de existir los siguientes elementos:
    - Órdenes de Compra.
    - Historial de Ventas.
    - Todas las Transacciones.
- Dado que el administrador selecciona Órdenes de Compra, entonces debe ver una lista de órdenes registradas.
- Dado que se muestra una orden, entonces debe contener:
    - Identificador de la orden
    - Fecha
    - Proveedor
    - Estado (Pendiente o Recibido)
    - Total de la orden
- Dado que el administrador visualiza una orden, entonces debe poder ver el detalle de:
    - Productos incluidos
    - Cantidad por producto
    - Precio por unidad
- Dado que el administrador selecciona Historial de Ventas, entonces debe ver una lista de ventas realizadas.
- Dado que se muestra una venta, entonces debe contener:
    - Identificador de la venta (ej. VEN-426536)
    - Fecha y hora
    - Nombre del empleado
    - Nombre del cliente (si existe)
    - Método de pago
    - Total de la venta
- Dado que el administrador visualiza una venta, entonces debe poder ver el detalle de:
    - Lista de productos vendidos
    - Cantidad por producto
    - Precio unitario
    - Subtotal
    - IVA
    - Total final
- Dado que el administrador selecciona Todas las Transacciones, entonces debe ver una lista combinada de:
    Órdenes de compra
    Ventas
- Dado que se muestra una transacción, entonces debe indicar:
    - Tipo de transacción (Compra o Venta)
    - Identificador
    - Fecha
    - Total

# Gestión de Proveedores

## Historia de usuario No.2.1
* Debe permitir el registro y mantenimiento de información sobre proveedores, incluyendo nombre, dirección, información de contacto y productos que suministran.
### Titulo:
Gestión de proveedores

### Descripción:
Como administrador, quiero registrar y mantener la información de los proveedores, incluyendo nombre, dirección, datos de contacto y productos que suministran, para tener un control organizado y actualizado de los proveedores del sistema.

### Criterios de aceptación:
- Dado que el administrador accede al módulo de proveedores, entonces debe poder visualizar la lista de proveedores registrados.
- Dado que el administrador selecciona la opción “Nuevo proveedor”, entonces debe poder registrar un proveedor ingresando:
    - Nombre del proveedor
    - Nombre de Contacto.
    - Dirección
    - Teléfono
    - Correo electrónico
    - Productos que suministra
- Dado que el administrador registra un proveedor con datos válidos, entonces el sistema debe guardarlo y mostrarlo en la lista de proveedores.
- Dado que el administrador selecciona un proveedor existente, entonces debe poder editar su información.
- Dado que el administrador actualiza la información de un proveedor, entonces el sistema debe guardar los cambios correctamente.
- Dado que el administrador selecciona eliminar un proveedor, entonces el sistema debe permitir eliminarlo previa confirmación.
- Dado que el administrador utiliza la barra de búsqueda, entonces debe poder filtrar proveedores por nombre.

# Facturación y Cobro

## Historia de usuario No. 3.1
* Debe generar recibos para las ventas.

### Titulo:
Generación de recibos de venta

### Descripción:
Como empleado, quiero generar un recibo al finalizar una venta, seleccionando el método de pago e incluyendo los datos del cliente y los productos comprados, para entregar un comprobante claro y completo al cliente.

### Criterios de aceptación:

- Dado que el empleado ha agregado productos al carrito, entonces debe poder visualizar el resumen de la venta antes de procesar el pago.
- Dado que el empleado ingresa el nombre y teléfono del cliente, entonces el sistema debe asociar esos datos a la venta.
- Dado que el empleado presiona el botón de “Procesar pago”, entonces el sistema debe mostrar las opciones de método de pago:
    - Efectivo
    - Tarjeta
    - Transferencia
- Dado que el empleado selecciona un método de pago válido, entonces el sistema debe procesar la venta correctamente.
- Dado que la venta es procesada exitosamente, entonces el sistema debe generar automáticamente un recibo que incluya:
    - Nombre del negocio
    - Número de recibo
    - Fecha y hora
    - Método de pago
    - Lista de productos (nombre, cantidad, precio)
    - Subtotal
    - IVA
    - Total
- Dado que el recibo es generado, entonces el sistema debe mostrarlo en pantalla.
- Dado que el recibo está visible, entonces el empleado debe poder:
    - Descargar el recibo
    - Imprimir el recibo
    - Cerrar la vista

# Descuentos y Promociones

* Debe permitir la aplicación de descuentos y promociones en productos específicos o en compras totales.

## Historia de usuario No.4.1

### Titulo:
Aplicar descuentos a una compra

### Descripción:
Como vendedor, quiero poder agregar ciertos descuentos ya establecidos en un venta.

### Criterios de aceptación:

- Dado que el carrito de venta esta listo, entonces debe aparecer los siguiente descuentos:
    - 5%
    - 10%
    - 15% 
    - 20%
- Dado que el vendedor selecciona un descuento, entonces el sistema debe de mostrar un mensaje de confirmación y aplicarlo.
- Dado que el vendedor selecciona otro descuento, el sistema debe de quitar el descuento previo y aplicar el nuevo.
- Dado que el vendedor deselecciona un descuento, entonces el sistema debe de mostrar un mensaje de confirmación y retirarlo.


# Búsqueda y Consulta de Productos

* Debe permitir la búsqueda rápida de productos por nombre, número de artículo o categoría.

## Historia de usuario No.5.1

### Titulo: 
Busqueda rapida de productos.

### Descripción:
Como vendedor, quiero buscar de forma rapida y eficiente los productos ya sea por nombre, ID de articulo o Palabra clave.

### Criterios de aceptación:

- Dado que el vendedor accede al catalogo de productos, entonces debe visualizar las categorias disponibles.
- Dado que el vendedor esta en catalogo de productos, entonces debe de existir una barra de busqueda.
- Dado que el vendedor usa la barra de busqueda, entonces debe poder buscar por:
    - Nombre de articulo.
    - Id de articulo.
    - Palabra clave.
- Dado que el vendedor selecciona la opcion de Todas las Categorias, cuando use la barra de busqueda, entonces debe de buscar en todas la categorias.
- Dado que el vendedor selecciona una categoria en especifico, cuando use la barra de busqueda, entonces debe solo poder buscar en esa catergoria.
- Dado que no existen productos que coincidan con la búsqueda, entonces el sistema debe mostrar un mensaje indicando que no se encontraron resultados.

# Generación de Reportes

Historia de usuario No. 6.1
Debe generar informes de ventas diarios, semanales, mensuales y anuales.
### Título:
Generar reportes de ventas.

### Descripción:
Como administrador, quiero generar informes de ventas mensuales, para analizar el desempeño del negocio en diferentes periodos.

### Criterios de aceptación:
- Dado que se solicita un reporte, entonces se debe poder seleccionar el periodo (diario, semanal, mensual, anual).
- Dado que se genera el reporte, entonces debe mostrar el total de ventas del periodo seleccionado.
- Dado que se genera el reporte, entonces debe incluir el detalle de las transacciones realizadas.
- Dado que se visualiza el reporte, entonces debe existir una opción para exportarlo.


# Registro de Clientes
Debe permitir la creación y mantenimiento de registros de clientes, incluyendo información de contacto y registros de compras anteriores.
## Historia de usuario No. 7.1

### Título:
Gestión de clientes

### Descripción:
Como administrador, quiero registrar y mantener la información de los clientes, incluyendo sus datos de contacto y su historial de compras, para tener un mejor control y seguimiento de las ventas realizadas.

### Criterios de aceptación:
- Dado que el administrador accede al módulo de clientes, entonces debe poder visualizar la lista de clientes registrados.
- Dado que el administrador selecciona la opción “Nuevo cliente”, entonces debe poder registrar un cliente ingresando:
    - Nombre Completo
    - Teléfono
    - Correo electrónico (opcional)
- Dado que el administrador registra un cliente con datos válidos, entonces el sistema debe guardarlo y mostrarlo en la lista de clientes.
- Dado que el administrador selecciona un cliente existente, entonces debe poder visualizar su información completa junto con su historial de compras.
- Dado que el administrador consulta el historial de compras de un cliente, entonces el sistema debe mostrar:
    - Productos adquiridos
        - Cada producto con su precio individual. 
    - Total de la compra
- Dado que el administrador edita la información de un cliente, entonces el sistema debe guardar los cambios correctamente.
- Dado que el administrador selecciona eliminar un cliente, entonces el sistema debe solicitar confirmación antes de eliminarlo.
- Dado que el administrador utiliza la barra de búsqueda, entonces debe poder buscar clientes por nombre o teléfono.