package com.vantus.project.model;

import jakarta.persistence.*;

@Entity
@Table(name = "Articulos_Laboratorio")


public class Articulos_Laboratorio {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_articulo")
    private Integer idArticulo;

    public enum TipoArticulo {
        Proyector,
        Microfono,
        Grabadora,
        Laptop,
        Bocina,
        Cable,
        Convertidor
    }

    @Column(name = "numero_articulo", nullable = false)
    private String numeroArticulo;

    @Column(name = "nombre", nullable = false)
    private String nombre;

    @Column(name = "descripcion", nullable = false)
    private String descripcion;

    @Column(name = "url_fotografia", nullable = false)
    private String urlFotografia;

    @ManyToOne
    @JoinColumn(name = "id_responsable_asignado")
    private Administrativo administrativo;

    //Revisar esta relacion
    // @OneToMany(mappedBy = "articulo")

    public Integer getIdArticulo() {
        return idArticulo;
    }

    public void setIdArticulo(Integer idArticulo) {
        this.idArticulo = idArticulo;
    }

    public String getNumeroArticulo() {
        return numeroArticulo;
    }

    public void setNumeroArticulo(String numeroArticulo) {
        this.numeroArticulo = numeroArticulo;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public String getUrlFotografia() {
        return urlFotografia;
    }

    public void setUrlFotografia(String urlFotografia) {
        this.urlFotografia = urlFotografia;
    }

    public Administrativo getAdministrativo() {
        return administrativo;
    }

    public void setAdministrativo(Administrativo administrativo) {
        this.administrativo = administrativo;
    }    
}
