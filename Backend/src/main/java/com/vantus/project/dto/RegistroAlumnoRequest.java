package com.vantus.project.dto;

public class RegistroAlumnoRequest {

    private String nombre;
    private String apellido_paterno;
    private String apellido_materno;
    private String correo;
    private String numeroTelefono;
    private String programaEducativo;
    private String huellaDactilar;

    private String matricula;
    private Integer semestre;
    private String grupo;


    public String getNombre() {
        return nombre;
    }
    public void setNombre(String nombre) {
        this.nombre = nombre;
    }
    public String getApellido_paterno() {
        return apellido_paterno;
    }
    public void setApellido_paterno(String apellido_paterno) {
        this.apellido_paterno = apellido_paterno;
    }
    public String getApellido_materno() {
        return apellido_materno;
    }
    public void setApellido_materno(String apellido_materno) {
        this.apellido_materno = apellido_materno;
    }
    public String getCorreo() {
        return correo;
    }
    public void setCorreo(String correo) {
        this.correo = correo;
    }
    public String getNumeroTelefono() {
        return numeroTelefono;
    }
    public void setNumeroTelefono(String numeroTelefono) {
        this.numeroTelefono = numeroTelefono;
    }
    public String getProgramaEducativo() {
        return programaEducativo;
    }
    public void setProgramaEducativo(String programaEducativo) {
        this.programaEducativo = programaEducativo;
    }
    public String getMatricula() {
        return matricula;
    }
    public void setMatricula(String matricula) {
        this.matricula = matricula;
    }
    public String getGrupo() {
        return grupo;
    }
    public void setGrupo(String grupo) {
        this.grupo = grupo;
    }
    public Integer getSemestre() {
        return semestre;
    }
    public void setSemestre(Integer semestre) {
        this.semestre = semestre;
    }
    public String getHuellaDactilar() {
        return huellaDactilar;
    }
    public void setHuellaDactilar(String huellaDactilar) {
        this.huellaDactilar = huellaDactilar;
    }
}
