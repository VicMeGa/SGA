package com.vantus.project.repository;

import com.vantus.project.model.Administrativo;
import com.vantus.project.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface AdministrativoRepository extends JpaRepository<Administrativo, Integer> {
    Optional<Administrativo> findByUsuario(Usuario usuario);

    Optional<Administrativo> findByNumeroEmpleado(String numeroEmpleado);

    @Query(value = "SELECT a.* " +
            "FROM administrativo a " +
            "JOIN horario_sala h ON a.id_administrativo = h.id_administrativo " +
            "WHERE h.materia = :materia", nativeQuery = true)
    List<Administrativo> obtenerAdministrativosPorMateria(@Param("materia") String materia);

}
