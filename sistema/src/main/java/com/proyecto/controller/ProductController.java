package com.proyecto.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.*;
import com.proyecto.model.Product;
import com.proyecto.service.ProductService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/api/products")
@CrossOrigin(origins = "*")
public class ProductController {

    @Autowired // Spring inyect el servidce automaticamente
    private ProductService productService;

    // GET /api/products devolvera todos los productos.
    @GetMapping
    public List<Product> getAll() {
        return productService.getAll();
    }

    @GetMapping("/{id}") // GET /api/products/1 devuelve el producto con id 1
    public Product getById(@PathVariable int id) {
        return productService.getById(id);

    }

    @PostMapping // POST /api/products crear un nuevo producto
    public Product create(@RequestBody Product product) {
        return productService.add(product);
    }

    @PutMapping("/{id}")
    public Product update(@PathVariable int id, @RequestBody Product product) {
        return productService.update(id, product);
    }

    @DeleteMapping("/{id}")
    public boolean delete(@PathVariable int id) {
        return productService.delete(id);
    }
}
