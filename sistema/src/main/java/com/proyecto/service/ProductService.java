package com.proyecto.service;

import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.proyecto.model.Product;
import com.proyecto.model.StockObserver;
import com.proyecto.repository.ProductRepository;

@Service
public class ProductService {

    @Autowired
    private ProductRepository repository;
    private List<StockObserver> observers = new ArrayList<>();

    public List<Product> getAll() {
        return repository.findAll();
    }

    public void agregarObserver(StockObserver observer) {
        observers.add(observer);
    }

    public void eliminarObserver(StockObserver observer) {
        observers.remove(observer);
    }

    private void notificarObservers(Product product) {
        for (StockObserver observer : observers) {
            observer.actualizar(product);
        }
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
            notificarObservers(existing);
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
            notificarObservers(p);
            return true;
        }
        return false;
    }
}
