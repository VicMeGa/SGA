package com.vantus.project.dto;

public class LoginResponse {
    private String mensaje;
    private boolean exito;

    public LoginResponse(String mensaje, boolean exito) {
        this.mensaje = mensaje;
        this.exito = exito;
    }

    public String getMensaje() {
        return mensaje;
    }

    public boolean isExito() {
        return exito;
    }
}
