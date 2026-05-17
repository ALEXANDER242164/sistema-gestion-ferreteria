package com.proyecto.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.proyecto.model.Customer;
import com.proyecto.repository.CustomerRepository;

@Service
public class CustomerService {

    @Autowired
    public CustomerRepository customerRepository;

    public List<Customer> getAll() {
        return customerRepository.findAll();
    }

    public Customer getById(int id) {
        return customerRepository.findById(id).orElse(null);
    }

    public Customer add(Customer customer) {
        return customerRepository.save(customer);
    }

    public Customer update(int id, Customer updated) {
        Customer existing = getById(id);
        if (existing != null) {
            existing.setNombre(updated.getNombre());
            existing.setTelefono(updated.getTelefono());
            existing.setEmail(updated.getEmail());
            return customerRepository.save(existing);

        }
        return null;
    }

    public boolean delete(int id) {
        if (customerRepository.existsById(id)) {
            customerRepository.deleteById(id);
            return true;
        }
        return false;
    }

}
