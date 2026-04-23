### Diagrama de secuencia

![DiagramaSecuencia](assets/Diagrama%20de%20secuencia.png)

## 1. Fase Busqueda
La fase de preparación comienza con buscarProducto() en el Catálogo para obtener una lista de productos validados, seguida de agregarProducto() en el Carrito para agrupar los artículos seleccionados en un contenedor temporal. De manera opcional, se incluye la operación eliminarProducto() para poder quitar un producto no deseado del Carrito antes de generar el total.

## 2. Fase calcular
En esta etapa, la Venta coordina el aspecto financiero mediante calcularTotal para establecer el monto de la transacción de acuerdo a los productos del carrito. Despues, se ejecutan setEstrategiaDescuento() y aplicar() para determinar el precio final de forma dinámica, permitiendo que el cálculo de rebajas se realice de manera independiente a la lógica interna de la venta para no afectar la integridad de los precios base.

## 3. Fase Inventario
 El sistema utiliza getInstance de InventarioServicio() para asegurar que el producto este en el almacen y ejecuta actualizarInventario().. Esta operación recibe la venta (como una transacción) y reduce automáticamente las cantidades de las existencias globales de acuerdo con los artículos vendidos.

## 4. Fase proceso de pago
La operación procesarPago() en el MetodoDePago funciona como el filtro de seguridad del sistema, validando que el pago realizado sea exitoso (ya sea mediante tarjeta o efectivo) sin que la clase Venta necesite conocer los detalles técnicos o bancarios de la transacción, devolviendo un valor booleano que permite o bloquea la siguiente fase.

## 5. Fase Recibo
Finalmente, se invoca generarRecibo() para instanciar un recibo. Una vez generado, el ReciboServicio toma el control mediante las operaciones mostrarRecibo(), imprimirRecibo() o descargar(), separando cada operacion dependiendo del cliente y vendedor.