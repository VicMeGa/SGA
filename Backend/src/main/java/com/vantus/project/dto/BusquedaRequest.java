package com.vantus.project.dto;

public class BusquedaRequest {
    private String identificador;
    private String nombre;

    public BusquedaRequest(String identificador, String nombreCompleto) {
        this.identificador = identificador;
        this.nombre = nombreCompleto;
    }

    public String getIdentificador() {
        return identificador;
    }

    public void setIdentificador(String identificador) {
        this.identificador = identificador;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }
}
