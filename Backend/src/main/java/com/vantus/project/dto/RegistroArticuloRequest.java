package com.vantus.project.dto;

public class RegistroArticuloRequest {


    private String nombre;
    private String numeroArticulo;
    private String descripcion;
    private String urlFotografia;
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
    public String getUrlFotografia() {
        return urlFotografia;
    }
    public void setUrlFotografia(String urlFotografia) {
        this.urlFotografia = urlFotografia;
    }

    
}