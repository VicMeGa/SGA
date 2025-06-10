package com.vantus.project.repository;


import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.vantus.project.model.Prestamo;

public interface PrestamoRepository extends JpaRepository<Prestamo, Integer> {

    @Query("SELECT p FROM Prestamo p WHERE p.articulo.idArticulo = :idArticulo AND p.fechaHoraDevolucion IS NULL")
    Optional<Prestamo> findPrestamoActivoByArticulo(@Param("idArticulo") Integer idArticulo);

    List<Prestamo> findByFechaHoraPrestamoBetween(LocalDateTime inicio, LocalDateTime fin);
}

