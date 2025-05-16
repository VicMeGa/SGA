package com.vantus.project.dto;

import com.vantus.project.model.Horario_Sala;
import com.vantus.project.model.Usuario;

public class EditarUsuarioRequest {

    private String tipo; // "alumno" o "administrativo"

    private Usuario usuario;

    // Solo para alumno
    private String matricula;
    private Integer semestre;
    private String grupo;
    private Horario_Sala horario;

    // Solo para administrativo
    private String numeroEmpleado;
    private String cargo;
    private String contrasena;

    public String getTipo() {
        return tipo;
    }
    public void setTipo(String tipo) {
        this.tipo = tipo;
    }
    public Usuario getUsuario() {
        return usuario;
    }
    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }
    public String getMatricula() {
        return matricula;
    }
    public void setMatricula(String matricula) {
        this.matricula = matricula;
    }
    public Integer getSemestre() {
        return semestre;
    }
    public void setSemestre(Integer semestre) {
        this.semestre = semestre;
    }
    public String getGrupo() {
        return grupo;
    }
    public void setGrupo(String grupo) {
        this.grupo = grupo;
    }
    public Horario_Sala getHorario() {
        return horario;
    }
    public void setHorario(Horario_Sala horario) {
        this.horario = horario;
    }
    public String getNumeroEmpleado() {
        return numeroEmpleado;
    }
    public void setNumeroEmpleado(String numeroEmpleado) {
        this.numeroEmpleado = numeroEmpleado;
    }
    public String getCargo() {
        return cargo;
    }
    public void setCargo(String cargo) {
        this.cargo = cargo;
    }
    public String getContrasena() {
        return contrasena;
    }
    public void setContrasena(String contrasena) {
        this.contrasena = contrasena;
    }

    

}
