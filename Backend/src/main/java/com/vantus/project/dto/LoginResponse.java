package com.vantus.project.dto;

public class LoginResponse {
    private String mensaje;
    private boolean exito;
    private String numeroEmpleado;

    public LoginResponse(String mensaje, boolean exito, String numeroEmpleado) {
        this.mensaje = mensaje;
        this.exito = exito;
        this.numeroEmpleado = numeroEmpleado;
    }

    public String getMensaje() {
        return mensaje;
    }

    public boolean isExito() {
        return exito;
    }

    public String getNumeroEmpleado (){
        return numeroEmpleado;
    }
}
