package com.proyecto.model;

// Lo hice como clase abstracta ya que asi logro poner atributos como el nombre y la edad,
// algo que en la interfaz no podria hacer ya que necesitaria inicializarlos.
// Tambien con "public abstract String getRol();" logro que las clases que la extiendan
// tambien tengan que usar ese metodo abstracto.
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
