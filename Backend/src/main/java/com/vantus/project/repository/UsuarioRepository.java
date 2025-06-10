package com.vantus.project.repository;

import com.vantus.project.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UsuarioRepository extends JpaRepository<Usuario, Integer> {
    Optional<Usuario> findByCorreo(String correo);
    List<Usuario> findByNombreContainingIgnoreCaseAndActivoTrue(String nombre);

    List<Usuario> findByActivoTrue();
    Optional<Usuario> findByIdUsuarioAndActivoTrue(Long idUsuario);

}