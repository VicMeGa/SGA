package com.vantus.project.controller;

import com.vantus.project.dto.LoginRequest;
import com.vantus.project.dto.LoginResponse;
import com.vantus.project.repository.AdministrativoRepository;
import com.vantus.project.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/sga")
@CrossOrigin(origins = "*")
public class LoginController {

    @Autowired
    private UsuarioRepository usuarioRepo;

    @Autowired
    private AdministrativoRepository adminRepo;

    @PostMapping("/login")
    public LoginResponse login(@RequestBody LoginRequest request) {
        return usuarioRepo.findByCorreo(request.getCorreo())
            .flatMap(usuario -> adminRepo.findByUsuario(usuario)
                .filter(admin -> admin.getContrasena().equals(request.getContrasena()))
                .map(admin -> new LoginResponse("Inicio de sesión exitoso", true))
            )
            .orElse(new LoginResponse("Credenciales incorrectas.", false));
    }
}
