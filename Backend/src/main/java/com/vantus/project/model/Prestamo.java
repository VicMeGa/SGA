package com.vantus.project.model;

import java.time.LocalDateTime;

import jakarta.persistence.*;

@Entity
@Table(name = "Prestamo")


public class Prestamo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_prestamo")
    private Integer idPrestamo;

    @ManyToOne
    @JoinColumn(name = "id_usuario")
    private Usuario usuario;

    @Column(name = "fecha_hora_prestamo", nullable = false)
    private LocalDateTime fechaHoraPrestamo;

    @Column(name = "fecha_hora_devolucion")
    private LocalDateTime fechaHoraDevolucion;

    @ManyToOne
    @JoinColumn(name = "id_articulo")
    private Articulos_Laboratorio articulo;

    //Setters y Getters
    
    public Integer getIdPrestamo() {
        return idPrestamo;
    }

    public void setIdPrestamo(Integer idPrestamo) {
        this.idPrestamo = idPrestamo;
    }

    public Usuario getUsuario() {
        return usuario;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
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

    public Articulos_Laboratorio getArticulo() {
        return articulo;
    }

    public void setArticulo(Articulos_Laboratorio articulo) {
        this.articulo = articulo;
    }

}
