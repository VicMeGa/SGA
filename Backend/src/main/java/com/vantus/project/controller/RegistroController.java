package com.vantus.project.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.vantus.project.dto.RegistroAdministrativoRequest;
import com.vantus.project.model.Administrativo;
import com.vantus.project.model.Usuario;
import com.vantus.project.repository.AdministrativoRepository;
import com.vantus.project.repository.UsuarioRepository;

@RestController
@RequestMapping("/sga/registro")
@CrossOrigin(origins = "*")
public class RegistroController {

    @Autowired
    private UsuarioRepository usuarioRepo;

    @Autowired
    private AdministrativoRepository adminRepo;

    @PostMapping("/administrativo")
    public ResponseEntity<?> registrarAdministrativo(@RequestBody RegistroAdministrativoRequest request) {
        // Validaciones básicas
        if (usuarioRepo.findByCorreo(request.getCorreo()).isPresent()) {
            return ResponseEntity.badRequest().body("Correo ya registrado");
        }

        // Crear usuario
        Usuario usuario = new Usuario();
        usuario.setNombre(request.getNombre());
        usuario.setApellido_paterno(request.getApellido_paterno());
        usuario.setApellido_materno(request.getApellido_materno());
        usuario.setCorreo(request.getCorreo());
        usuario.setNumeroTelefono(request.getNumeroTelefono());
        usuario.setTipoUsuario(Usuario.TipoUsuario.Administrativo);
        usuario.setProgramaEducativo(request.getProgramaEducativo());

        usuarioRepo.save(usuario);

        // Crear administrativo
        Administrativo admin = new Administrativo();
        admin.setNumeroEmpleado(request.getNumeroEmpleado());
        admin.setContrasena(request.getContrasena());
        admin.setArea(request.getArea());
        admin.setCargo(request.getCargo());
        admin.setUsuario(usuario);

        adminRepo.save(admin);

        return ResponseEntity.ok("Administrativo registrado exitosamente");
    }
}
