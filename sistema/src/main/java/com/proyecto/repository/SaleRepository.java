package com.proyecto.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.proyecto.model.Sale;

public interface SaleRepository extends JpaRepository<Sale, Integer> {

}
