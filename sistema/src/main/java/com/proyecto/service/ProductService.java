package com.proyecto.service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.proyecto.model.Product;
import com.proyecto.repository.ProductRepository;

@Service
public class ProductService {

    @Autowired
    private ProductRepository repository;

    public List<Product> getAll() {
        return repository.findAll();
    }

    public Product getById(int id) {
        return repository.findById(id).orElse(null);
    }

    public Product add(Product product) {
        return repository.save(product);
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
            return repository.save(existing);
        }
        return null;
    }

    public boolean delete(int id) {
        if (repository.existsById(id)) {
            repository.deleteById(id);
            return true;
        }
        return false;
    }

    public boolean reduceStock(int productId, int quantity) {
        Product p = getById(productId);
        if (p != null && p.getStock() >= quantity) {
            p.setStock(p.getStock() - quantity);
            repository.save(p);
            return true;
        }
        return false;
    }
}
