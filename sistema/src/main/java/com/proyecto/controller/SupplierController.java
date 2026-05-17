package com.proyecto.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.proyecto.model.Supplier;
import com.proyecto.service.SupplierService;

@RestController
@RequestMapping("api/suppliers")
@CrossOrigin(origins = "*")

public class SupplierController {

    @Autowired
    private SupplierService supplierService;

    @GetMapping
    public List<Supplier> getAll() {
        return supplierService.getAll();
    }

    @GetMapping("/{id}")
    public Supplier getById(@PathVariable("id") int id) {
        return supplierService.getById(id);
    }

    @PostMapping // POSt /api/suppliers crear un nuevo proveedor
    public Supplier create(@RequestBody Supplier supplier) {
        return supplierService.add(supplier);

    }

    @PutMapping("/{id}")
    public Supplier update(@PathVariable("id") int id, @RequestBody Supplier supplier) {
        return supplierService.update(id, supplier);
    }

    @DeleteMapping("/{id}")
    public boolean delete(@PathVariable("id") int id) {
        return supplierService.delete(id);

    }

}
