package com.proyecto.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.proyecto.model.DescuentoPorcentaje;
import com.proyecto.model.Efectivo;
import com.proyecto.model.EstrategiaDescuento;
import com.proyecto.model.MetodoDePago;
import com.proyecto.model.Sale;
import com.proyecto.model.SaleItem;
import com.proyecto.model.SinDescuento;
import com.proyecto.model.Tarjeta;
import com.proyecto.repository.SaleRepository;
//Se aplica patron Stratety de descuentos

@Service
public class SaleService {

    @Autowired
    private SaleRepository saleRepository;

    @Autowired
    private ProductService productService;

    public List<Sale> getAll() {
        return saleRepository.findAll();
    }

    public Sale add(Sale sale) {
        // Patron Strategy : seleccionar estrategia de descuento
        EstrategiaDescuento estrategia;

        if (sale.getDescuento() == 0) {
            estrategia = new SinDescuento();
        } else {
            estrategia = new DescuentoPorcentaje(sale.getDescuento());
        }
        double montoDescuento = estrategia.aplicar(sale.getSubTotal());
        System.out.println("Estrategia: " + estrategia.getNombre() + " - descuento aplicado: $" + montoDescuento);

        // Patron Strategy : seleccionar metodo de pago

        MetodoDePago metodo;

        if ("Efectivo".equals(sale.getMetodoPago())) {
            metodo = new Efectivo(sale.getTotal());
        } else {
            metodo = new Tarjeta("", "");

        }
        metodo.procesarPago(sale.getTotal());
        System.out.println("Pago procesado con: " + metodo.getNombre());

        // reducir Stock de cada producto (Observer aciiva aqui)
        if (sale.getItems() != null) {
            for (SaleItem item : sale.getItems()) {
                productService.reduceStock(item.getProductId(), item.getCantidad());
            }
        }
        return saleRepository.save(sale);

    }

    public boolean delete(int id) {
        if (saleRepository.existsById(id)) {
            saleRepository.deleteById(id);
            return true;
        }
        return false;
    }

}
