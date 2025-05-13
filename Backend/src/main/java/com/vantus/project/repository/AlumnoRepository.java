package com.vantus.project.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.vantus.project.model.Alumno;
import com.vantus.project.model.Usuario;

@Repository
public interface AlumnoRepository extends JpaRepository<Alumno, String> {
    Optional<Alumno> findByMatricula(String matricula);

    Optional<Alumno> findByUsuario(Usuario usuario);
}

