package com.vantus.project.repository;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.vantus.project.model.Apartado_Sala;

public interface ApartadoSalaRepository extends JpaRepository<Apartado_Sala, Integer>{

    List<Apartado_Sala> findByFechaHoraInicioBetween(LocalDateTime inicio, LocalDateTime fin);
}
