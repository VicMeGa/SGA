package com.vantus.project.repository;

import com.vantus.project.model.Admin;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AdminRepository extends JpaRepository<Admin, Long> {
    Admin findByUsuarioCorreo(String correo);
}
