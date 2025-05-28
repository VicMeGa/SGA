package com.vantus.project.model;

import java.time.LocalTime;
import java.time.format.DateTimeFormatter;

import jakarta.persistence.*;

@Entity
@Table(name = "Horario_Sala")

public class Horario_Sala {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_horario")
    private Integer idHorario;

    @Column(name = "hora_inicio", nullable = false)
    private LocalTime horaInicio;

    @Column(name = "hora_fin", nullable = false)
    private LocalTime horaFin;

    @Column(name = "dia", nullable = false)
    private String dia;

    @Column(name = "materia", nullable = false)
    private String materia;

    @Column(name = "grupo", nullable = false)
    private String grupo;

    @Column(name = "semestre", nullable = false)
    private Integer semestre;

    // Faltan agregar 1 relacion, ademas de revisar la que ya esta

    public Integer getSemestre() {
        return semestre;
    }

    public void setSemestre(Integer semestre) {
        this.semestre = semestre;
    }

    public String getDia() {
        return dia;
    }

    public void setDia(String dia) {
        this.dia = dia;
    }

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

    public String getMateria() {
        return materia;
    }

    public String getHoraInicioFormateada() {
        return horaInicio.format(DateTimeFormatter.ofPattern("HH:mm"));
    }

    public void setHoraInicio(LocalTime horaInicio) {
        this.horaInicio = horaInicio;
    }

    public String getHoraFinFormateada() {
        return horaFin.format(DateTimeFormatter.ofPattern("HH:mm"));
    }

    public void setHoraFin(LocalTime horaFin) {
        this.horaFin = horaFin;
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
