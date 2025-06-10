package com.vantus.project.dto;

import java.time.LocalDateTime;
import com.vantus.project.model.Acceso;

public class AccesoDTO {

    private String nombreUsuario;
    private String nombreSala;
    private Acceso.TipoAcceso tipoAcceso;
    private LocalDateTime fechaHoraEntrada;

    public AccesoDTO() {}

    public AccesoDTO(String nombreUsuario, String nombreSala, Acceso.TipoAcceso tipoAcceso, LocalDateTime fechaHoraEntrada) {
        this.nombreUsuario = nombreUsuario;
        this.nombreSala = nombreSala;
        this.tipoAcceso = tipoAcceso;
        this.fechaHoraEntrada = fechaHoraEntrada;
    }

    // Getters y Setters
    public String getNombreUsuario() {
        return nombreUsuario;
    }

    public void setNombreUsuario(String nombreUsuario) {
        this.nombreUsuario = nombreUsuario;
    }

    public String getNombreSala() {
        return nombreSala;
    }

    public void setNombreSala(String nombreSala) {
        this.nombreSala = nombreSala;
    }

    public Acceso.TipoAcceso getTipoAcceso() {
        return tipoAcceso;
    }

    public void setTipoAcceso(Acceso.TipoAcceso tipoAcceso) {
        this.tipoAcceso = tipoAcceso;
    }

    public LocalDateTime getFechaHoraEntrada() {
        return fechaHoraEntrada;
    }

    public void setFechaHoraEntrada(LocalDateTime fechaHoraEntrada) {
        this.fechaHoraEntrada = fechaHoraEntrada;
    }
}
