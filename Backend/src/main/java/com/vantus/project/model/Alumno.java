package com.vantus.project.model;

import jakarta.persistence.*;

@Entity
@Table(name = "Alumno")

public class Alumno {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_alumno")
    private Integer idAlumno;

    @Column(name = "matricula", nullable = false)
    private String matricula;

    @Column(name = "semestre", nullable = false)
    private Integer semestre;

    @Column(name = "grupo", nullable = false)
    private String grupo;

//    @ManyToOne
//    @JoinColumn(name = "id_horario")
//    private Horario_Sala horario;

    @ManyToOne
    @JoinColumn(name = "id_usuario")
    private Usuario usuario;

    //Falta tabla Horario_sala

}
