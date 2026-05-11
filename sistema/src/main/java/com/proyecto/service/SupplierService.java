package com.proyecto.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.proyecto.model.Supplier;
import com.proyecto.repository.SupplierRepository;

@Service
public class SupplierService {
    @Autowired
    private SupplierRepository supplierRepository;

    public List<Supplier> getAll() {
        return supplierRepository.findAll();
    }

    public Supplier getById(int id) {
        return supplierRepository.findById(id).orElse(null);
    }

    public Supplier add(Supplier supplier) {
        return supplierRepository.save(supplier);
    }

    public Supplier update(int id, Supplier updated) {
        Supplier existing = getById(id);
        if (existing != null) {
            existing.setNombre(updated.getNombre());
            existing.setContacto(updated.getContacto());
            existing.setDireccion(updated.getDireccion());
            existing.setTelefono(updated.getTelefono());
            existing.setEmail(updated.getEmail());
            existing.setProductosSuministrados(updated.getProductosSuministrados());
            return supplierRepository.save(existing);
        }
        return null;
    }

    public boolean delete(int id) {
        if (supplierRepository.existsById(id)) {
            supplierRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
