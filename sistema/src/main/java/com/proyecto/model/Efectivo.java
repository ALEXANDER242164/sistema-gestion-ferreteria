package com.proyecto.model;
// Se esta aplicando el patron estrategia para manejar diferentes tipos de metodos de pago en las ordenes de compra (strategy pattern)

public class Efectivo implements MetodoDePago {

    private double efectivoRecibido;

    public Efectivo(double efectivoRecibido) {
        this.efectivoRecibido = efectivoRecibido;
    }

    @Override
    public boolean procesarPago(double monto) {
        return efectivoRecibido >= monto;

    }

    @Override
    public String getNombre() {
        return "Efectivo";
    }

    public double calcularCambio(double monto) {
        return efectivoRecibido - monto;
    }

}
