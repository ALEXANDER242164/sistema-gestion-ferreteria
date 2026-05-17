package com.proyecto.model;

public abstract class Empleado {
    private int id;
    private String nombre;

    public Empleado(int id, String nombre) {
        this.id = id;
        this.nombre = nombre;
    }

    public abstract String getRol();

    public int getId() {
        return id;
    }

    public String getNombre() {
        return nombre;
    }
}
