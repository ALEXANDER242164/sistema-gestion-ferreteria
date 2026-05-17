package com.proyecto.model;

//Se esta aplicando el patron estrategia para manejar diferentes tipos de descuentos en las ordenes de compra (strategy pattern)
public interface EstrategiaDescuento {
    double aplicar(double subtotal);

    String getNombre();

}
