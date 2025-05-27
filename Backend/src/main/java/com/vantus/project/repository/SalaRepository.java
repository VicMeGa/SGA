package com.vantus.project.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import com.vantus.project.model.Sala;


public interface SalaRepository extends JpaRepository<Sala, Integer>{

    Optional<Sala> findByNombreSala(String nombreSala);

}
