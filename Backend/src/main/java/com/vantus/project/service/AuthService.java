package com.vantus.project.service;

import com.vantus.project.model.*;
import com.vantus.project.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    @Autowired
    private AdminRepository adminRepository;

    public LoginResponse login(String correo, String contrasena) {
        Admin admin = adminRepository.findByUsuarioCorreo(correo);

        if (admin != null && admin.getContrasena().equals(contrasena)) {
            return new LoginResponse("Inicio de sesión exitoso", true);
        }
        return new LoginResponse("Credenciales incorrectas", false);
    }
}
