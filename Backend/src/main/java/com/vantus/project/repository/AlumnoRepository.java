package com.vantus.project.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.vantus.project.model.Alumno;
import com.vantus.project.model.Usuario;

@Repository
public interface AlumnoRepository extends JpaRepository<Alumno, String> {
    Optional<Alumno> findByMatricula(String matricula);

    Optional<Alumno> findByUsuario(Usuario usuario);

    @Query("SELECT DISTINCT a.grupo FROM Alumno a ORDER BY a.grupo")
    List<String> findDistinctGruposOrderByGrupo();

    // ✅ CORRECTO: Devuelve List<String>
    @Query(value = "SELECT u.nombre " +
            "FROM usuario u " +
            "JOIN alumno a ON u.id_usuario = a.id_usuario " +
            "JOIN horario_sala h ON a.semestre = h.semestre " +
            "JOIN sala s ON h.id_sala = s.id_sala " +
            "WHERE h.grupo = :grupo " +
            "AND h.semestre = :semestre " +
            "AND h.materia = :materia " +
            "AND s.nombre = :nombreSala ORDER BY nombre", nativeQuery = true)
    List<String> obtenerNombresUsuariosPorGrupoSemestreMateriaYSala(
            @Param("grupo") String grupo,
            @Param("semestre") Integer semestre,
            @Param("materia") String materia,
            @Param("nombreSala") String nombreSala);

}