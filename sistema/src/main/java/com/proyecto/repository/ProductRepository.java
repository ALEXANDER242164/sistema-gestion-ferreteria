package com.proyecto.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.proyecto.model.Product;

public interface ProductRepository extends JpaRepository<Product, Integer> {

}
