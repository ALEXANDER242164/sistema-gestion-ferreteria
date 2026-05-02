package com.proyecto.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.atomic.AtomicInteger;
import org.springframework.stereotype.Service;
import com.proyecto.model.Product; //Se llama paquete model -> clase Product.

@Service // Segun por lo que entiendo es el que le dice a spring que esta clase es de
         // serivicio.
public class ProductService {
    // Se usara lista en memoria entonces cada que se reinicie el programa se
    // pierden los datos.
    private List<Product> products = new ArrayList<>();
    private AtomicInteger nextId = new AtomicInteger(1); // para incrementar los id de los procutos.
    // Contructor

    public ProductService() {
        products.add(
                new Product(nextId.getAndIncrement(), "Martillo", "Martillo de acero", "Herramientas", 150.00, 20, 5));
    }
}
