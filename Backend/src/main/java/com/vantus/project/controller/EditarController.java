package com.vantus.project.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.vantus.project.dto.EditarUsuarioRequest;
import com.vantus.project.model.Administrativo;
import com.vantus.project.model.Alumno;
import com.vantus.project.model.Usuario;
import com.vantus.project.repository.AdministrativoRepository;
import com.vantus.project.repository.AlumnoRepository;
import com.vantus.project.repository.UsuarioRepository;

@RestController
@RequestMapping("/sga/editar")
public class EditarController {

    @Autowired
    private AlumnoRepository alumnoRepo;

    @Autowired
    private AdministrativoRepository adminRepo;

    @Autowired
    private UsuarioRepository usuarioRepo;

    @PutMapping("/usuario")
    public ResponseEntity<String> editarUsuario(@RequestBody EditarUsuarioRequest dto) {
        Optional<Usuario> optUsuario = usuarioRepo.findById(dto.getUsuario().getIdUsuario());

        if (!optUsuario.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Usuario no encontrado");
        }

        Usuario usuario = optUsuario.get();

        // Actualizar datos generales
        usuario.setNombre(dto.getUsuario().getNombre());
        usuario.setApellido_paterno(dto.getUsuario().getApellido_paterno());
        usuario.setApellido_materno(dto.getUsuario().getApellido_materno());
        usuario.setCorreo(dto.getUsuario().getCorreo());
        usuario.setNumeroTelefono(dto.getUsuario().getNumeroTelefono());
        usuario.setProgramaEducativo(dto.getUsuario().getProgramaEducativo());

        usuarioRepo.save(usuario);

        if ("alumno".equalsIgnoreCase(dto.getTipo())) {
            Optional<Alumno> optAlumno = alumnoRepo.findByMatricula(dto.getMatricula());
            if (optAlumno.isPresent()) {
                Alumno alumno = optAlumno.get();
                alumno.setSemestre(dto.getSemestre());
                alumno.setGrupo(dto.getGrupo());
                alumnoRepo.save(alumno);
            }
        } else if ("administrativo".equalsIgnoreCase(dto.getTipo())) {
            Optional<Administrativo> optAdmin = adminRepo.findByNumeroEmpleado(dto.getNumeroEmpleado());
            if (optAdmin.isPresent()) {
                Administrativo admin = optAdmin.get();
                admin.setCargo(dto.getCargo());
                admin.setContrasena(dto.getContrasena());
                adminRepo.save(admin);
            }
        } else {
            return ResponseEntity.badRequest().body("Tipo de usuario no válido.");
        }
        return ResponseEntity.ok("Usuario editado correctamente.");
    }
}
