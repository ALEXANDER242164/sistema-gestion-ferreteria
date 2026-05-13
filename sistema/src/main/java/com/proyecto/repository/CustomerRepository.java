package com.proyecto.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.proyecto.model.Customer;

public interface CustomerRepository extends JpaRepository<Customer, Integer> {

}
