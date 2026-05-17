package com.proyecto.model;

public class EmpleadoFactory {

    public static Empleado crear(int id, String nombre, String rol) {
        switch (rol.toLowerCase()) {
            case "vendedor": return new Vendedor(id, nombre);
            case "admin":    return new Administrador(id, nombre);
            default: throw new IllegalArgumentException("Rol no reconocido: " + rol);
        }
    }
}
