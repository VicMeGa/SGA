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


}
