package com.kgisl.web;

public class Model {
    private Integer id;
    private String modelName;
    private int year;
    private int price;
    private String company;
    
    public int getId() {
        return id;
    }
    public void setId(int id) {
        this.id = id;
    }
    public String getModelName() {
        return modelName;
    }
    public void setModelName(String modelName) {
        this.modelName = modelName;
    }
    public int getYear() {
        return year;
    }
    public void setYear(int year) {
        this.year = year;
    }
    public int getPrice() {
        return price;
    }
    public void setPrice(int price) {
        this.price = price;
    }
    public String getCompany() {
        return company;
    }
    public void setCompany(String company) {
        this.company = company;
    }
    // public Model(int id, String modelName, int year, int price, String company) {
    //     this.id = id;
    //     this.modelName = modelName;
    //     this.year = year;
    //     this.price = price;
    //     this.company = company;
    // }
    public Model() {
       
    }

    @Override
    public String toString() {
        return "Model [id=" + id + ", modelName=" + modelName + ", year=" + year + ", price=" + price + ", company=" + company + "]";
    }
}
