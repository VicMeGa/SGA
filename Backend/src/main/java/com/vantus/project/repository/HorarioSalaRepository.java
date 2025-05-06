package com.vantus.project.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.vantus.project.model.Horario_Sala;

@Repository
public interface HorarioSalaRepository extends JpaRepository<Horario_Sala, Integer> {
    Optional<Horario_Sala> findByIdHorario(Integer idHorario);
}
