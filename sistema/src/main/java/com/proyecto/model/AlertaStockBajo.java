package com.proyecto.model;

public class AlertaStockBajo implements StockObserver {
    @Override
    public void actualizar(Product producto) {
        if (producto.getStock() < producto.getMinStock()) {
            System.out.println("Alerta: Stock bajo '" + producto.getName() +
                    "'- Stock actual:" + producto.getStock() +
                    ", minimo: " + producto.getMinStock());
        }
    }

}
