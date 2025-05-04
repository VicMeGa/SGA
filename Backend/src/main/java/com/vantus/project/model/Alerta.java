package com.vantus.project.model;

import java.time.LocalDateTime;

import jakarta.persistence.*;

@Entity
@Table(name = "Alerta")

public class Alerta {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_alerta")
    private Integer idAlerta;

    public enum TipoAlerta {
        Acceso_Autorizado,
        Acceso_No_Autorizado,
        Capacidad_Máxima_Alcanzada,
        Otro
    }

    @Column(name = "descripcion")
    private String descripcion;

    @Column(name = "fecha_hora")
    private LocalDateTime fechaHora;

    @ManyToOne
    @JoinColumn(name = "id_sala")
    private Sala sala;

    public Integer getIdAlerta() {
        return idAlerta;
    }

    public void setIdAlerta(Integer idAlerta) {
        this.idAlerta = idAlerta;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public LocalDateTime getFechaHora() {
        return fechaHora;
    }

    public void setFechaHora(LocalDateTime fechaHora) {
        this.fechaHora = fechaHora;
    }

    public Sala getSala() {
        return sala;
    }

    public void setSala(Sala sala) {
        this.sala = sala;
    }

    
    
}
