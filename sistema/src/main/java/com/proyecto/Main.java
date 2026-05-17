package com.proyecto;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.proyecto.model.AlertaStockBajo;
import com.proyecto.model.Empleado;
import com.proyecto.model.EmpleadoFactory;
import com.proyecto.service.ProductService;

@SpringBootApplication
public class Main implements CommandLineRunner {
    @Autowired
    private ProductService productService;

    public static void main(String[] args) {
        SpringApplication.run(Main.class, args);
    }

    @Override
    public void run(String... args) throws Exception {
        // Observer: alerta de stock bajo
        productService.agregarObserver(new AlertaStockBajo());

        // Factory Method: creación de empleados según rol
        Empleado admin = EmpleadoFactory.crear(1, "Carlos López", "admin");
        Empleado vendedor = EmpleadoFactory.crear(2, "María García", "vendedor");
        System.out.println("Empleado creado: " + admin.getNombre() + " — rol: " + admin.getRol());
        System.out.println("Empleado creado: " + vendedor.getNombre() + " — rol: " + vendedor.getRol());
    }
}