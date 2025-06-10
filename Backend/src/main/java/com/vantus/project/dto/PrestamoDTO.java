package com.vantus.project.dto;

import java.time.LocalDateTime;

// PrestamoDTO.java
public class PrestamoDTO {
    private String nombreUsuario;
    private String nombreArticulo;
    private LocalDateTime fechaHoraPrestamo;
    private LocalDateTime fechaHoraDevolucion;

    public PrestamoDTO(String nombreUsuario, String nombreArticulo, LocalDateTime fechaHoraPrestamo,
            LocalDateTime fechaHoraDevolucion) {
        this.nombreUsuario = nombreUsuario;
        this.nombreArticulo = nombreArticulo;
        this.fechaHoraPrestamo = fechaHoraPrestamo;
        this.fechaHoraDevolucion = fechaHoraDevolucion;
    }

    public String getNombreUsuario() {
        return nombreUsuario;
    }

    public void setNombreUsuario(String nombreUsuario) {
        this.nombreUsuario = nombreUsuario;
    }

    public String getNombreArticulo() {
        return nombreArticulo;
    }

    public void setNombreArticulo(String nombreArticulo) {
        this.nombreArticulo = nombreArticulo;
    }

    public LocalDateTime getFechaHoraPrestamo() {
        return fechaHoraPrestamo;
    }

    public void setFechaHoraPrestamo(LocalDateTime fechaHoraPrestamo) {
        this.fechaHoraPrestamo = fechaHoraPrestamo;
    }

    public LocalDateTime getFechaHoraDevolucion() {
        return fechaHoraDevolucion;
    }

    public void setFechaHoraDevolucion(LocalDateTime fechaHoraDevolucion) {
        this.fechaHoraDevolucion = fechaHoraDevolucion;
    }

    // Constructor, getters, setters

}
