package com.proyecto.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.proyecto.model.PurchaseOrder;
import com.proyecto.service.PurchaseOrderService;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin(origins = "*")
public class PurchaseOrderController {

    @Autowired
    private PurchaseOrderService service;

    @GetMapping
    public List<PurchaseOrder> getAll() {
        return service.getAll();
    }

    @GetMapping("/{id}")
    public PurchaseOrder getById(@PathVariable("id") int id) {
        return service.getById(id);
    }

    @PostMapping
    public PurchaseOrder create(@RequestBody PurchaseOrder order) {
        return service.add(order);
    }

    @PutMapping("/{id}")
    public PurchaseOrder update(@PathVariable("id") int id, @RequestBody PurchaseOrder order) {
        return service.update(id, order);
    }

    @DeleteMapping("/{id}")
    public boolean delete(@PathVariable("id") int id) {
        return service.delete(id);
    }
}
