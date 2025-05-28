package com.vantus.project.dto;

public class RegistroHorarioRequest {

    private String materia;
    private String dia;
    private String horaInicio;
    private String horaFin;
    private String nombreSala;
    private String numeroEmpleado;
    private String grupo;
    private Integer semestre;
    
    public String getGrupo() {
        return grupo;
    }
    public void setGrupo(String grupo) {
        this.grupo = grupo;
    }
    public String getMateria() {
        return materia;
    }
    public Integer getSemestre() {
        return semestre;
    }
    public void setSemestre(Integer semestre) {
        this.semestre = semestre;
    }
    public void setMateria(String materia) {
        this.materia = materia;
    }
    public String getDia() {
        return dia;
    }
    public void setDia(String dia) {
        this.dia = dia;
    }
    public String getHoraInicio() {
        return horaInicio;
    }
    public void setHoraInicio(String horaInicio) {
        this.horaInicio = horaInicio;
    }
    public String getHoraFin() {
        return horaFin;
    }
    public void setHoraFin(String horaFin) {
        this.horaFin = horaFin;
    }
    public String getNombreSala() {
        return nombreSala;
    }
    public void setNombreSala(String nombreSala) {
        this.nombreSala = nombreSala;
    }
    public String getNumeroEmpleado() {
        return numeroEmpleado;
    }
    public void setNumeroEmpleado(String numeroEmpleado) {
        this.numeroEmpleado = numeroEmpleado;
    }
}
