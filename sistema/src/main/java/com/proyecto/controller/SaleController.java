package com.proyecto.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.proyecto.model.Sale;
import com.proyecto.service.SaleService;

@RestController
@RequestMapping("/api/sales")
@CrossOrigin(origins = "*")
public class SaleController {

    @Autowired
    private SaleService saleService;

    @GetMapping
    public List<Sale> getAll() {
        return saleService.getAll();
    }

    @PostMapping
    public Sale create(@RequestBody Sale sale) {
        return saleService.add(sale);
    }

    @DeleteMapping("/{id}")
    public boolean delete(@PathVariable("id") int id) {
        return saleService.delete(id);
    }
}
