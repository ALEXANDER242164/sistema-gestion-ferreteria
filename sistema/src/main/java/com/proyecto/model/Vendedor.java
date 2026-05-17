package com.proyecto.model;

public class Vendedor extends Empleado {

    public Vendedor(int id, String nombre) {
        super(id, nombre);
    }

    @Override
    public String getRol() {
        return "vendedor";
    }
}
