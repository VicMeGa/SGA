package com.vantus.project.controller;

import java.time.LocalDateTime;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.vantus.project.dto.AuthRequestDTO;
import com.vantus.project.model.Administrativo;
import com.vantus.project.model.Articulos_Laboratorio;
import com.vantus.project.model.Prestamo;
import com.vantus.project.model.Usuario;
import com.vantus.project.repository.AdministrativoRepository;
import com.vantus.project.repository.ArticulosRepository;
import com.vantus.project.repository.PrestamoRepository;

@RestController
@RequestMapping("/sga/prestamo")
@CrossOrigin(origins = "*")
public class PrestamoController {

    @Autowired
    private AdministrativoRepository adminRepo;

    @Autowired
    private ArticulosRepository artiRepo;

    @Autowired
    private PrestamoRepository prestamoRepo;

    @PostMapping("/pedir")
    public ResponseEntity<?> solicitarPrestamo(@RequestBody AuthRequestDTO datos) {
        // Buscar al administrativo por número de empleado
        Optional<Administrativo> adminOpt = adminRepo.findByNumeroEmpleado(datos.getNumeroEmpleado());

        if (!adminOpt.isPresent()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Número de empleado no encontrado");
        }

        Administrativo admin = adminOpt.get();

        // Verificar contraseña (sin codificación)
        if (!admin.getContrasena().equals(datos.getPassword())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Contraseña incorrecta");
        }

        // Obtener usuario vinculado
        Usuario usuario = admin.getUsuario();
        if (usuario == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("No se encontró el usuario vinculado");
        }

        // Verificar si el usuario está activo
        if (!Boolean.TRUE.equals(usuario.getActivo())) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body("El usuario no está activo para realizar préstamos");
        }

        // Buscar el artículo
        Optional<Articulos_Laboratorio> artOpt = artiRepo.findById(datos.getIdArticulo());
        if (!artOpt.isPresent()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Artículo no encontrado");
        }

        Articulos_Laboratorio art = artOpt.get();

        // Verificar si ya está prestado
        if (art.getEstaPrestado() == 1) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("El artículo ya está prestado");
        }

        // Marcar como prestado
        art.setEstaPrestado(1);
        artiRepo.save(art);

        // Registrar el préstamo
        Prestamo nuevoPrestamo = new Prestamo();
        nuevoPrestamo.setUsuario(usuario);
        nuevoPrestamo.setFechaHoraPrestamo(LocalDateTime.now());
        nuevoPrestamo.setArticulo(art);

        prestamoRepo.save(nuevoPrestamo);

        return ResponseEntity.ok(String.valueOf(nuevoPrestamo.getIdPrestamo()));
    }

    @GetMapping("/id-actual/{idArticulo}")
    public ResponseEntity<Integer> obtenerIdPrestamoActivo(@PathVariable Integer idArticulo) {
        Optional<Prestamo> prestamo = prestamoRepo.findPrestamoActivoByArticulo(idArticulo);
        if (prestamo.isPresent()) {
            return ResponseEntity.ok(prestamo.get().getIdPrestamo());
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    @PutMapping("/devolver/{id}")
    public ResponseEntity<String> devolverPrestamo(@PathVariable Integer id) {
        Optional<Prestamo> optionalPrestamo = prestamoRepo.findById(id);
        if (!optionalPrestamo.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Préstamo no encontrado");
        }

        Prestamo prestamo = optionalPrestamo.get();

        if (prestamo.getFechaHoraDevolucion() != null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Este préstamo ya fue devuelto");
        }

        // Marcar la devolución
        prestamo.setFechaHoraDevolucion(LocalDateTime.now());
        prestamoRepo.save(prestamo);

        // Cambiar estado del artículo a "no prestado"
        Articulos_Laboratorio articulo = prestamo.getArticulo();
        if (articulo != null) {
            articulo.setEstaPrestado(0);
            artiRepo.save(articulo);
        }

        return ResponseEntity.ok("Préstamo devuelto exitosamente");
    }

}
