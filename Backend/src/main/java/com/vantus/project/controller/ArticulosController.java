package com.vantus.project.controller;

import com.vantus.project.repository.ArticulosRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("sga/apii/articulos")
public class ArticulosController {

    @Autowired
    private ArticulosRepository articulosRepo;

    @PutMapping("/desactivar/{id}")
    public ResponseEntity<?> desactivarArticulo(@PathVariable Integer id) {
        return articulosRepo.findById(id)
                .map(articulo -> {
                    articulo.setActivo(false);
                    articulosRepo.save(articulo);
                    return ResponseEntity.ok("Artículo desactivado correctamente uwu");
                }).orElse(ResponseEntity.status(404).body("Artículo no encontrado uwu"));
    }
}
