package com.vantus.project.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.vantus.project.model.Horario_Sala;

@Repository
public interface HorarioSalaRepository extends JpaRepository<Horario_Sala, Integer> {

    Optional<Horario_Sala> findByIdHorario(Integer idHorario);

    @Query("SELECT h FROM Horario_Sala h WHERE h.administrativo.usuario.activo = true")
    List<Horario_Sala> findAllByAdministrativoActivo();

    @Query("SELECT DISTINCT h.materia FROM Horario_Sala h ORDER BY h.materia")
    List<String> findDistinctMaterias();

    @Query("SELECT DISTINCT h.semestre FROM Horario_Sala h ORDER BY h.semestre")
    List<String> findDistinctSemestre();

}
