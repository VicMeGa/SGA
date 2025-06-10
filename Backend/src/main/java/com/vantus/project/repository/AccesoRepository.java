package com.vantus.project.repository;

import java.time.LocalDateTime;
import java.util.List; // ✅ este es el correcto

import org.springframework.data.jpa.repository.JpaRepository;
import com.vantus.project.model.Acceso;

public interface AccesoRepository extends JpaRepository<Acceso, Integer> {

    List<Acceso> findByFechaHoraEntradaBetween(LocalDateTime fechaInicio, LocalDateTime fechaFin); // ✅
}
