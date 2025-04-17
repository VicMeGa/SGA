package com.vantus.project.repository;

import com.vantus.project.model.Administrativo;
import com.vantus.project.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AdministrativoRepository extends JpaRepository<Administrativo, Integer> {
    Optional<Administrativo> findByUsuario(Usuario usuario);
}
