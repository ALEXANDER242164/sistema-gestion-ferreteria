package com.proyecto.service;

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

    public List<Product> getAll() {
        return products;

    }

    public Product getById(int id) {
        return products.stream().filter(p -> p.getId() == id).findFirst().orElse(null);
    }

    public Product add(Product product) {
        product.setId(nextId.getAndIncrement());
        products.add(product);
        return product;
    }

    public Product update(int id, Product updated) {
        Product existing = getById(id);
        if (existing != null) {
            existing.setName(updated.getName());
            existing.setDescription(updated.getDescription());
            existing.setCategory(updated.getCategory());
            existing.setPrice(updated.getPrice());
            existing.setStock(updated.getStock());
            existing.setMinStock(updated.getMinStock());
        }
        return existing;
    }

    // eliminamos el producto
    public boolean delete(int id) {
        return products.removeIf(p -> p.getId() == id);
    }

    public boolean reduceStock(int productId, int quantity) {
        Product p = getById(productId);
        if (p != null && p.getStock() >= quantity) {
            p.setStock(p.getStock() - quantity);
            return true;

        }
        return false;

    }
}
