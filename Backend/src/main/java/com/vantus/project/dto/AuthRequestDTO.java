package com.vantus.project.dto;

public class AuthRequestDTO {
    private String numeroEmpleado;
    private String password;
    private Integer idArticulo;

    // Getters y Setters


    public String getNumeroEmpleado() {
        return numeroEmpleado;
    }
    public void setNumeroEmpleado(String numeroEmpleado) {
        this.numeroEmpleado = numeroEmpleado;
    }
    public String getPassword() {
        return password;
    }
    public void setPassword(String password) {
        this.password = password;
    }
    public Integer getIdArticulo() {
        return idArticulo;
    }
    public void setIdArticulo(Integer idArticulo) {
        this.idArticulo = idArticulo;
    }
}
