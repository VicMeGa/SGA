package com.vantus.project.model;

import jakarta.persistence.*;

@Entity
@Table(name = "Articulos_Laboratorio")


public class Articulos_Laboratorio {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_articulo")
    private Integer idArticulo;

    @Column(name = "tipo")
    @Enumerated(EnumType.STRING)
    private TipoArticulo tipoArticulo;

    public enum TipoArticulo {
        Proyector,
        Micrófono,
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

    @Column(name = "esta_prestado", nullable = false)
    private Integer estaPrestado;

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

    public TipoArticulo getTipoArticulo() {
        return tipoArticulo;
    }

    public void setTipoArticulo(TipoArticulo tipoArticulo) {
        this.tipoArticulo = tipoArticulo;
    }

    public Integer getEstaPrestado() {
        return estaPrestado;
    }

    public void setEstaPrestado(Integer estaPrestado) {
        this.estaPrestado = estaPrestado;
    }
}
