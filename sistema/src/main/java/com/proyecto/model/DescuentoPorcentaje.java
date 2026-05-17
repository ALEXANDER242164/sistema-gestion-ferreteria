package com.proyecto.model;

//Se esta aplicando el patron estrategia para manejar diferentes tipos de descuentos en las ordenes de compra (strategy pattern)
public class DescuentoPorcentaje implements EstrategiaDescuento {

    private double porcentaje;

    public DescuentoPorcentaje(double porcentaje) {
        this.porcentaje = porcentaje;
    }

    @Override
    public double aplicar(double subtotal) {
        return subtotal * (porcentaje / 100.0);
    }

    @Override
    public String getNombre() {
        return "Descuento " + (int) porcentaje + "%";
    }

    public double getPorcentaje() {
        return porcentaje;
    }

}
