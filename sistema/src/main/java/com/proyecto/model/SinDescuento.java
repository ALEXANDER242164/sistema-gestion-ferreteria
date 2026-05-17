package com.proyecto.model;

//Se esta aplicando el patron estrategia para manejar diferentes tipos de descuentos en las ordenes de compra (strategy pattern)
public class SinDescuento implements EstrategiaDescuento {

    @Override
    public double aplicar(double subtotal) {
        return 0.0;
    }

    @Override
    public String getNombre() {
        return "Sin Descuento";
    }

}
