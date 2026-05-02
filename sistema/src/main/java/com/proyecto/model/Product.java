package com.proyecto.model;

public class Product {
    private int id;
    private String name;
    private String description;
    private String category;
    private double price;
    private int stock;
    private int minStrock;

    public Product() {

    }

    public Product(int id, String name, String description, String category, double price, int stock, int minStrock) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.category = category;
        this.price = price;
        this.stock = stock;
        this.minStrock = minStrock;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public int getStock() {
        return stock;
    }

    public void setStock(int stock) {
        this.stock = stock;
    }

    public int getMinStrock() {
        return minStrock;
    }

    public void setMinStrock(int minStrock) {
        this.minStrock = minStrock;
    }

}
