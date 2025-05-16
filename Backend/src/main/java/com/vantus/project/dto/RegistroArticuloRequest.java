package com.vantus.project.dto;

public class RegistroArticuloRequest {


    private String nombre;
    private String numeroArticulo;
    private String descripcion;
    
    public String getTipoArticulo() {
        return tipoArticulo;
    }
    public void setTipoArticulo(String tipoArticulo) {
        this.tipoArticulo = tipoArticulo;
    }
    private String tipoArticulo;
    
    public String getNombre() {
        return nombre;
    }
    public void setNombre(String nombre) {
        this.nombre = nombre;
    }
    public String getNumeroArticulo() {
        return numeroArticulo;
    }
    public void setNumeroArticulo(String numeroArticulo) {
        this.numeroArticulo = numeroArticulo;
    }
    public String getDescripcion() {
        return descripcion;
    }
    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }
}