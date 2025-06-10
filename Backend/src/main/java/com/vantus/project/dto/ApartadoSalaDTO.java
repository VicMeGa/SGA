package com.vantus.project.dto;

import java.time.LocalDateTime;

// ApartadoSalaDTO.java
public class ApartadoSalaDTO {
    private String nombreAdministrativo;
    private String nombreSala;
    private String dia;
    private LocalDateTime fechaHoraInicio;
    private LocalDateTime fechaHoraFin;


    public ApartadoSalaDTO(String nombreAdministrativo, String nombreSala, String dia, LocalDateTime fechaHoraInicio,
            LocalDateTime fechaHoraFin) {
        this.nombreAdministrativo = nombreAdministrativo;
        this.nombreSala = nombreSala;
        this.dia = dia;
        this.fechaHoraInicio = fechaHoraInicio;
        this.fechaHoraFin = fechaHoraFin;
    }


    public String getNombreAdministrativo() {
        return nombreAdministrativo;
    }


    public void setNombreAdministrativo(String nombreAdministrativo) {
        this.nombreAdministrativo = nombreAdministrativo;
    }


    public String getNombreSala() {
        return nombreSala;
    }


    public void setNombreSala(String nombreSala) {
        this.nombreSala = nombreSala;
    }


    public String getDia() {
        return dia;
    }


    public void setDia(String dia) {
        this.dia = dia;
    }


    public LocalDateTime getFechaHoraInicio() {
        return fechaHoraInicio;
    }


    public void setFechaHoraInicio(LocalDateTime fechaHoraInicio) {
        this.fechaHoraInicio = fechaHoraInicio;
    }


    public LocalDateTime getFechaHoraFin() {
        return fechaHoraFin;
    }


    public void setFechaHoraFin(LocalDateTime fechaHoraFin) {
        this.fechaHoraFin = fechaHoraFin;
    }
    
    // Constructor, getters, setters

    

    
}