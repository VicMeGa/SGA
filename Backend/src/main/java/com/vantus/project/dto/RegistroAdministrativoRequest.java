package com.vantus.project.dto;

public class RegistroAdministrativoRequest {

    //Datos de tabla Usuario
    private String nombre;
    private String apellido_paterno;
    private String apellido_materno;
    private String correo;
    private String numeroTelefono;
    private String programaEducativo;
    // private TipoUsuario tipoUsuario;
    private String huellaDactilar;
    // private String codigoQR;

    //Datos de tabla Administrativo
    private String numeroEmpleado;
    private String cargo;
    private String contrasena;
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
    public String getHuellaDactilar() {
        return huellaDactilar;
    }
    public void setHuellaDactilar(String huellaDactilar) {
        this.huellaDactilar = huellaDactilar;
    }
}