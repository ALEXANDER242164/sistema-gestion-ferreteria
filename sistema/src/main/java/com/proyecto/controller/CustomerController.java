package com.proyecto.controller;

import com.proyecto.model.Customer;
import com.proyecto.model.Product;
import com.proyecto.service.CustomerService;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/customers")
@CrossOrigin(origins = "*")
public class CustomerController {

    @Autowired
    private CustomerService customerService;

    @GetMapping
    public List<Customer> getAll() {
        return customerService.getAll();
    }

    @GetMapping("/{id}")
    public Customer getById(@PathVariable int id) {
        return customerService.getById(id);
    }

    @PostMapping
    public Customer add(@RequestBody Customer customer) {
        return customerService.add(customer);
    }

    @PutMapping("/{id}")
    public Customer update(@PathVariable("id") int id, @RequestBody Customer customer) {
        return customerService.update(id, customer);
    }

    @DeleteMapping("/{id}")
    public boolean delete(@PathVariable("id") int id) {
        return customerService.delete(id);
    }

}
