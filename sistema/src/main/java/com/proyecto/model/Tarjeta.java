package com.proyecto.model;

public class Tarjeta implements MetodoDePago {
    private String numeroTarjeta;
    private String banco;

    public Tarjeta(String numeroTarjeta, String banco) {
        this.numeroTarjeta = numeroTarjeta;
        this.banco = banco;
    }

    @Override
    public boolean procesarPago(double monto) {
        return autorizarPago();
    }

    @Override
    public String getNombre() {
        return "Tarjeta";
    }

    public String getBanco() {
        return banco;
    }

    private boolean autorizarPago() {
        return true;
    }
}
