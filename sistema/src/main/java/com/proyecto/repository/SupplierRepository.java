package com.proyecto.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.proyecto.model.Supplier;

public interface SupplierRepository extends JpaRepository<Supplier, Integer> {
}