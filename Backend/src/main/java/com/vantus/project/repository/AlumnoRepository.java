package com.vantus.project.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.vantus.project.model.Alumno;
import com.vantus.project.model.Usuario;

@Repository
public interface AlumnoRepository extends JpaRepository<Alumno, String> {
    Optional<Alumno> findByMatricula(String matricula);

    Optional<Alumno> findByUsuario(Usuario usuario);
    
    @Query("SELECT DISTINCT a.grupo FROM Alumno a ORDER BY a.grupo")
    List<String> findDistinctGruposOrderByGrupo();
}