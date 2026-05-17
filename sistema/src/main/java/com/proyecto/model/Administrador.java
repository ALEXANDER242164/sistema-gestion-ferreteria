package com.proyecto.model;

public class Administrador extends Empleado {

    public Administrador(int id, String nombre) {
        super(id, nombre);
    }

    @Override
    public String getRol() {
        return "admin";
    }
}
