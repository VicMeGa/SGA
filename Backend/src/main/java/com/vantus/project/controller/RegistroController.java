package com.vantus.project.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.vantus.project.dto.RegistroAdministrativoRequest;
import com.vantus.project.dto.RegistroAlumnoRequest;
import com.vantus.project.dto.RegistroArticuloRequest;
import com.vantus.project.dto.RegistroInvitadoRequest;
import com.vantus.project.model.Administrativo;
import com.vantus.project.model.Alumno;
import com.vantus.project.model.Articulos_Laboratorio;
import com.vantus.project.model.Horario_Sala;
import com.vantus.project.model.Invitado;
import com.vantus.project.model.Usuario;
import com.vantus.project.repository.AdministrativoRepository;
import com.vantus.project.repository.AlumnoRepository;
import com.vantus.project.repository.ArticulosRepository;
import com.vantus.project.repository.HorarioSalaRepository;
import com.vantus.project.repository.InvitadoRepository;
import com.vantus.project.repository.UsuarioRepository;

@RestController
@RequestMapping("/sga/registro")
@CrossOrigin(origins = "*")
public class RegistroController {

    @Autowired
    private UsuarioRepository usuarioRepo;

    @Autowired
    private AdministrativoRepository adminRepo;

    @Autowired
    private AlumnoRepository alumnRepo;

    @Autowired
    private HorarioSalaRepository horarioSalaRepo; 

    @Autowired
    private InvitadoRepository inviRepo; 

    @Autowired
    private ArticulosRepository artiRepo; 

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

    @PostMapping("/alumno")
    public ResponseEntity<?> registrarAlumno(@RequestBody RegistroAlumnoRequest request) {
        Usuario usuario = new Usuario();
        usuario.setNombre(request.getNombre());
        usuario.setApellido_paterno(request.getApellido_paterno());
        usuario.setApellido_materno(request.getApellido_materno());
        usuario.setCorreo(request.getCorreo());
        usuario.setNumeroTelefono(request.getNumeroTelefono());
        usuario.setTipoUsuario(Usuario.TipoUsuario.Alumno);
        usuario.setProgramaEducativo(request.getProgramaEducativo());

        usuarioRepo.save(usuario);

        Optional<Horario_Sala> horarioOpt = horarioSalaRepo.findByIdHorario(request.getId_horario());
        if (!horarioOpt.isPresent()) {
            return ResponseEntity.badRequest().body("Horario con ID " + request.getId_horario() + " no encontrado.");
        }

        Alumno alumn = new Alumno();
        alumn.setMatricula(request.getMatricula());
        alumn.setSemestre(request.getSemestre());
        alumn.setGrupo(request.getGrupo());
        alumn.setHorario(horarioOpt.get());
        alumn.setUsuario(usuario);

        alumnRepo.save(alumn);

        return ResponseEntity.ok("Alumno registrado exitosamente");
    }

    @PostMapping("/invitado")
    public ResponseEntity<?> registrarInvitado(@RequestBody RegistroInvitadoRequest request) {
        Usuario usuario = new Usuario();
        usuario.setNombre(request.getNombre());
        usuario.setApellido_paterno(request.getApellido_paterno());
        usuario.setApellido_materno(request.getApellido_materno());
        usuario.setCorreo(request.getCorreo());
        usuario.setNumeroTelefono(request.getNumeroTelefono());
        usuario.setTipoUsuario(Usuario.TipoUsuario.Invitado);

        usuarioRepo.save(usuario);

        Invitado invi = new Invitado();
        invi.setFechaRegistro(request.getFechaRegistro());
        invi.setUsuario(usuario);

        inviRepo.save(invi);

        return ResponseEntity.ok("Invitado registrado exitosamente");
    }

    @PostMapping("/articulo")
    public ResponseEntity<?> registrarArticulo(@RequestBody RegistroArticuloRequest request) {
    
        Administrativo administrativo = adminRepo.findById(7)
            .orElseThrow(() -> new RuntimeException("Administrativo no encontrado"));
    
        Articulos_Laboratorio arti = new Articulos_Laboratorio();
        arti.setTipoArticulo(Articulos_Laboratorio.TipoArticulo.Bocina);
        arti.setNombre(request.getNombre());
        arti.setNumeroArticulo(request.getNumeroArticulo());
        arti.setDescripcion(request.getDescripcion());
        arti.setUrlFotografia(request.getUrlFotografia());
        arti.setAdministrativo(administrativo); // Aquí ya se usa el administrativo con ID 7
    
        artiRepo.save(arti);
    
        return ResponseEntity.ok("Artículo registrado exitosamente");
    }
    
}
