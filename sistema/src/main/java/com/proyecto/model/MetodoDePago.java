package com.proyecto.model;

// Se esta aplicando el patron estrategia para manejar diferentes tipos de metodos de pago en las ordenes de compra (strategy pattern)
public interface MetodoDePago {
    boolean procesarPago(double monto);

    String getNombre();

}
