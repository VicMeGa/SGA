package com.vantus.project.dto;

public class RegistroSalaRequest {

    private String nombreSala;
    private Integer capacidadSala;
    private Integer numeroEquipos;

    public String getNombreSala() {
        return nombreSala;
    }
    public void setNombreSala(String nombreSala) {
        this.nombreSala = nombreSala;
    }
    public Integer getCapacidadSala() {
        return capacidadSala;
    }
    public void setCapacidadSala(Integer capacidadSala) {
        this.capacidadSala = capacidadSala;
    }
    public Integer getNumeroEquipos() {
        return numeroEquipos;
    }
    public void setNumeroEquipos(Integer numeroEquipos) {
        this.numeroEquipos = numeroEquipos;
    }
}
