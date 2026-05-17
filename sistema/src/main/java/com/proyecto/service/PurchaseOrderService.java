package com.proyecto.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.proyecto.model.PurchaseOrder;
import com.proyecto.repository.PurchaseOrderRepository;

@Service
public class PurchaseOrderService {
    @Autowired
    private PurchaseOrderRepository repository;

    public List<PurchaseOrder> getAll() {
        return repository.findAll();
    }

    public PurchaseOrder getById(int id) {
        return repository.findById(id).orElse(null);
    }

    public PurchaseOrder add(PurchaseOrder order) {
        return repository.save(order);
    }

    public PurchaseOrder update(int id, PurchaseOrder updated) {
        PurchaseOrder existing = getById(id);
        if (existing != null) {
            existing.setFecha(updated.getFecha());
            existing.setProveedor(updated.getProveedor());
            existing.setEstado(updated.getEstado());
            existing.setProductos(updated.getProductos());
            existing.setTotal(updated.getTotal());
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
}
