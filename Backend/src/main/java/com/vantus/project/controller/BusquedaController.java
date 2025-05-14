package com.vantus.project.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.vantus.project.dto.BusquedaRequest;
import com.vantus.project.model.Administrativo;
import com.vantus.project.model.Alumno;
import com.vantus.project.model.Usuario;
import com.vantus.project.repository.AdministrativoRepository;
import com.vantus.project.repository.AlumnoRepository;
import com.vantus.project.repository.UsuarioRepository;

//@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/sga/buscar")
public class BusquedaController {

    @Autowired
    private AlumnoRepository alumnoRepo;

    @Autowired
    private AdministrativoRepository adminRepo;

    @Autowired
    private UsuarioRepository usuarioRepo;

    @GetMapping("/usuarios")
    public ResponseEntity<?> buscar(@RequestParam String query) {
        List<BusquedaRequest> resultados = new ArrayList<>();

        // Buscar por matrícula (8 dígitos)
        if (query.matches("\\d{8}")) {
            alumnoRepo.findByMatricula(query).ifPresent(alumno -> {
                String nombre = alumno.getUsuario().getNombre();
                resultados.add(new BusquedaRequest(alumno.getMatricula(), nombre));
            });
        }

        // Buscar por número de empleado (6 dígitos)
        else if (query.matches("\\d{6}")) {
            adminRepo.findByNumeroEmpleado(query).ifPresent(admin -> {
                String nombre = admin.getUsuario().getNombre();
                resultados.add(new BusquedaRequest(admin.getNumeroEmpleado(), nombre));
            });
        }

        // Buscar por nombre (en tabla Usuario)
        else {
            List<Usuario> usuarios = usuarioRepo.findByNombreContainingIgnoreCase(query);
            for (Usuario usuario : usuarios) {
                // Ver si es alumno
                Optional<Alumno> alumnoOpt = alumnoRepo.findByUsuario(usuario);
                if (alumnoOpt.isPresent()) {
                    resultados.add(new BusquedaRequest(alumnoOpt.get().getMatricula(), usuario.getNombre()));
                    continue;
                }

                // Ver si es administrativo
                Optional<Administrativo> adminOpt = adminRepo.findByUsuario(usuario);
                if (adminOpt.isPresent()) {
                    resultados.add(new BusquedaRequest(adminOpt.get().getNumeroEmpleado(), usuario.getNombre()));
                }
            }
        }

        if (resultados.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No se encontraron resultados.");
        }

        return ResponseEntity.ok(resultados);
    }

    @GetMapping("/usuario/detalle/{identificador}")
    public ResponseEntity<?> obtenerDetalleUsuario(@PathVariable String identificador) {
        if (identificador.matches("\\d{8}")) {
            Optional<Alumno> alumno = alumnoRepo.findByMatricula(identificador);
            if (alumno.isPresent()) {
                return ResponseEntity.ok(alumno.get());
            }
        } else if (identificador.matches("\\d{6}")) {
            Optional<Administrativo> admin = adminRepo.findByNumeroEmpleado(identificador);
            if (admin.isPresent()) {
                return ResponseEntity.ok(admin.get());
            }
        }

        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Usuario no encontrado.");
    }

    @DeleteMapping("/usuarios/{identificador}")
    public ResponseEntity<?> eliminarUsuario(@PathVariable String identificador) {
        // Buscar si es Alumno
        Optional<Alumno> alumnoOpt = alumnoRepo.findByMatricula(identificador);
        if (alumnoOpt.isPresent()) {
            Usuario usuario = alumnoOpt.get().getUsuario(); // Obtener usuario antes de borrar
            alumnoRepo.delete(alumnoOpt.get());
            usuarioRepo.delete(usuario); // Eliminar el usuario también
            return ResponseEntity.ok("Alumno y usuario eliminados.");
        }
    
        // Buscar si es Administrativo
        Optional<Administrativo> adminOpt = adminRepo.findByNumeroEmpleado(identificador);
        if (adminOpt.isPresent()) {
            Usuario usuario = adminOpt.get().getUsuario();
            adminRepo.delete(adminOpt.get());
            usuarioRepo.delete(usuario);
            return ResponseEntity.ok("Administrativo y usuario eliminados.");
        }
    
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Usuario no encontrado.");
    }
}