package com.vantus.project.model;

import java.time.LocalDateTime;

import jakarta.persistence.*;

@Entity
@Table(name = "apartado_sala")

public class Apartado_Sala {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_apartado")
    private Integer idApartado;

    @Column(name = "dia", nullable = false)
    private String dia;

    @Column(name = "fecha_hora_inicio", nullable = false)
    private LocalDateTime fechaHoraInicio;

    @Column(name = "fecha_hora_fin", nullable = false)
    private LocalDateTime fechaHoraFin;

    @ManyToOne
    @JoinColumn(name = "id_sala")
    private Sala sala;

    public String getDia() {
        return dia;
    }

    public void setDia(String dia) {
        this.dia = dia;
    }

    @ManyToOne
    @JoinColumn(name = "id_administrativo")
    private Administrativo administrativo;

    public Integer getIdApartado() {
        return idApartado;
    }

    public void setIdApartado(Integer idApartado) {
        this.idApartado = idApartado;
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

    public Sala getSala() {
        return sala;
    }

    public void setSala(Sala sala) {
        this.sala = sala;
    }

    public Administrativo getAdministrativo() {
        return administrativo;
    }

    public void setAdministrativo(Administrativo administrativo) {
        this.administrativo = administrativo;
    }
}
