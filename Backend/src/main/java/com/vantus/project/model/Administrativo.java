package com.vantus.project.model;

import jakarta.persistence.*;

@Entity
@Table(name = "Administrativo")
public class Administrativo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_administrativo")
    private Integer idAdministrativo;

    @Column(name = "numero_empleado", nullable = false)
    private String numeroEmpleado;

    @Column(nullable = false)
    private String cargo;

    @Column(nullable = false)
    private String contrasena;

    @OneToOne
    @JoinColumn(name = "id_usuario", nullable = false)
    private Usuario usuario;

    // Setters y Getters
    
    public Integer getIdAdministrativo() {
        return idAdministrativo;
    }

    public void setIdAdministrativo(Integer idAdministrativo) {
        this.idAdministrativo = idAdministrativo;
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

    public Usuario getUsuario() {
        return usuario;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;

    }   
}  
