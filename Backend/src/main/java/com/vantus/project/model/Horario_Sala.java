package com.vantus.project.model;
import java.time.DateTimeException;

import jakarta.persistence.*;

@Entity
@Table(name = "Horario_Sala")

public class Horario_Sala {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_horario")
    private Integer idHorario;

    @Column(name = "fecha_hora_inicio", nullable = false)
    private DateTimeException fechaHoraInicio; //Revisar el tipo de dato

    @Column(name = "fecha_hora_fin", nullable = false)
    private DateTimeException fechaHoraFin; //Revisar el tipo de dato

    @Column(name = "materia", nullable = false)
    private String materia;

    @Column(name = "grupo", nullable = false)
    private String grupo;

    //Faltan agregar 1 relacion, ademas de revisar la que ya esta

    @ManyToOne
    @JoinColumn(name = "id_sala", nullable = false)
    private Sala sala;

    @ManyToOne
    @JoinColumn(name = "id_administrativo")
    private Administrativo administrativo;

    public Integer getIdHorario() {
        return idHorario;
    }

    public void setIdHorario(Integer idHorario) {
        this.idHorario = idHorario;
    }

    public DateTimeException getFechaHoraInicio() {
        return fechaHoraInicio;
    }

    public void setFechaHoraInicio(DateTimeException fechaHoraInicio) {
        this.fechaHoraInicio = fechaHoraInicio;
    }

    public DateTimeException getFechaHoraFin() {
        return fechaHoraFin;
    }

    public void setFechaHoraFin(DateTimeException fechaHoraFin) {
        this.fechaHoraFin = fechaHoraFin;
    }

    public String getMateria() {
        return materia;
    }

    public void setMateria(String materia) {
        this.materia = materia;
    }

    public String getGrupo() {
        return grupo;
    }

    public void setGrupo(String grupo) {
        this.grupo = grupo;
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
