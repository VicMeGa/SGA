package com.vantus.project.controller;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.time.LocalTime;
import java.util.Optional;
import java.util.UUID;

//import org.apache.tomcat.util.http.parser.MediaType;
import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.vantus.project.dto.RegistroAdministrativoRequest;
import com.vantus.project.dto.RegistroAlumnoRequest;
import com.vantus.project.dto.RegistroArticuloRequest;
import com.vantus.project.dto.RegistroHorarioRequest;
import com.vantus.project.dto.RegistroInvitadoRequest;
import com.vantus.project.dto.RegistroSalaRequest;
import com.vantus.project.model.Administrativo;
import com.vantus.project.model.Alumno;
import com.vantus.project.model.Articulos_Laboratorio;
import com.vantus.project.model.Horario_Sala;
import com.vantus.project.model.Invitado;
import com.vantus.project.model.Sala;
import com.vantus.project.model.Usuario;
import com.vantus.project.repository.AdministrativoRepository;
import com.vantus.project.repository.AlumnoRepository;
import com.vantus.project.repository.ArticulosRepository;
import com.vantus.project.repository.HorarioSalaRepository;
import com.vantus.project.repository.InvitadoRepository;
import com.vantus.project.repository.SalaRepository;
import com.vantus.project.repository.UsuarioRepository;
import com.vantus.project.service.EmailService;
import com.vantus.project.utils.QRGenerator;

//import jakarta.persistence.criteria.Path;

import org.springframework.http.MediaType;
import java.nio.file.Path;

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

    @Autowired
    private SalaRepository salaRepo;

    @Autowired
    private QRGenerator qrGenerator;

    @Autowired
    private EmailService emailService;

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

        // Crear administrativo
        Administrativo admin = new Administrativo();
        admin.setNumeroEmpleado(request.getNumeroEmpleado());
        admin.setContrasena(request.getContrasena());
        admin.setCargo(request.getCargo());
        admin.setUsuario(usuario);

        // ✅ Generar QR después de guardar el usuario
        try {
            String contenidoQR = "ID: " + admin.getNumeroEmpleado() + "\n" +
                    "Nombre: " + usuario.getNombre() + " " + usuario.getApellido_paterno() + "\n" +
                    "Correo: " + usuario.getCorreo() + "\n" +
                    "Programa educativo: " + usuario.getProgramaEducativo();

            String relativePath = "src/main/resources/static/qrcodes/";
            Files.createDirectories(Paths.get(relativePath)); // Asegura que exista

            String nombreArchivo = "usuario_" + admin.getNumeroEmpleado();
            String rutaQR = qrGenerator.generateQR(contenidoQR, nombreArchivo);

            System.out.println("QR generado exitosamente en: " + rutaQR);
            usuario.setCodigoQR("/qrcodes/" + nombreArchivo);
            usuarioRepo.save(usuario);
            adminRepo.save(admin);
            emailService.enviarCorreoConQR(usuario.getCorreo(), usuario.getNombre(), rutaQR);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().body("Usuario creado, pero falló la generación del QR o envio");
        }

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

        // ✅ Generar QR después de guardar el usuario
        try {
            String contenidoQR = "ID: " + alumn.getMatricula() + "\n" +
                    "Nombre: " + usuario.getNombre() + " " + usuario.getApellido_paterno() + "\n" +
                    "Correo: " + usuario.getCorreo() + "\n" +
                    "Programa educativo: " + usuario.getProgramaEducativo();

            String relativePath = "src/main/resources/static/qrcodes/";
            Files.createDirectories(Paths.get(relativePath)); // Asegura que exista

            String nombreArchivo = "usuario_" + alumn.getMatricula();
            String rutaQR = qrGenerator.generateQR(contenidoQR, nombreArchivo);

            System.out.println("QR generado exitosamente en: " + rutaQR);
            usuario.setCodigoQR("/qrcodes/" + nombreArchivo);
            usuarioRepo.save(usuario);
            alumnRepo.save(alumn);
            emailService.enviarCorreoConQR(usuario.getCorreo(), usuario.getNombre(), rutaQR);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().body("Usuario creado, pero falló la generación del QR o envio");
        }

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

        Invitado invi = new Invitado();
        invi.setFechaRegistro(request.getFechaRegistro());
        invi.setUsuario(usuario);

        // ✅ Generar QR después de guardar el usuario
        try {
            String contenidoQR = "Nombre: " + usuario.getNombre() + " " + usuario.getApellido_paterno() + "\n" +
                    "Correo: " + usuario.getCorreo();

            String relativePath = "src/main/resources/static/qrcodes/";
            Files.createDirectories(Paths.get(relativePath)); // Asegura que exista

            String nombreArchivo = "usuario_" + invi.getIdInvitado();
            String rutaQR = qrGenerator.generateQR(contenidoQR, nombreArchivo);

            System.out.println("QR generado exitosamente en: " + rutaQR);
            usuario.setCodigoQR("/qrcodes/" + nombreArchivo);
            usuarioRepo.save(usuario);
            inviRepo.save(invi);
            emailService.enviarCorreoConQR(usuario.getCorreo(), usuario.getNombre(), rutaQR);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().body("Usuario creado, pero falló la generación del QR o envio");
        }

        return ResponseEntity.ok("Invitado registrado exitosamente");
    }

    @PostMapping(value = "/articulo", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> registrarArticulo(
            @RequestPart("datos") RegistroArticuloRequest request,
            @RequestPart("imagen") MultipartFile imagen) throws IOException {

        Articulos_Laboratorio arti = new Articulos_Laboratorio();

        // Convertir el string del request al enum (asegura que coincida exactamente)
        try {
            Articulos_Laboratorio.TipoArticulo tipo = Articulos_Laboratorio.TipoArticulo
                    .valueOf(request.getTipoArticulo());
            arti.setTipoArticulo(tipo);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body("Tipo de artículo inválido");
        }

        arti.setNombre(request.getNombre());
        arti.setNumeroArticulo(request.getNumeroArticulo());
        arti.setEstaPrestado(0);
        arti.setDescripcion(request.getDescripcion());

        String relativePath = "src/main/resources/static/uploads/";
        Files.createDirectories(Paths.get(relativePath)); // Asegura que exista

        String nombreArchivo = UUID.randomUUID().toString() + "_" + imagen.getOriginalFilename();
        Path ruta = Paths.get(relativePath + nombreArchivo);

        Files.copy(imagen.getInputStream(), ruta, StandardCopyOption.REPLACE_EXISTING);

        // Guarda solo la ruta relativa que se usará desde frontend (opcional)
        arti.setUrlFotografia("/uploads/" + nombreArchivo);
        artiRepo.save(arti);

        return ResponseEntity.ok("Artículo registrado exitosamente");
    }

    @PostMapping("/sala")
    public ResponseEntity<?> registrarSala(@RequestBody RegistroSalaRequest request) {
        Sala sala = new Sala();

        sala.setNombreSala(request.getNombreSala());
        sala.setCapacidadSala(request.getCapacidadSala());
        sala.setNumeroEquipos(request.getNumeroEquipos());

        salaRepo.save(sala);

        return ResponseEntity.ok("Sala registrada exitosamente");
    }

    @PostMapping("/horario")
    public ResponseEntity<?> resgistrarHorario(@RequestBody RegistroHorarioRequest request) {
        Horario_Sala horario = new Horario_Sala();

        horario.setMateria(request.getMateria());
        horario.setDia(request.getDia());
        horario.setHoraInicio(LocalTime.parse(request.getHoraInicio()));
        horario.setHoraFin(LocalTime.parse(request.getHoraFin()));
        horario.setGrupo(request.getGrupo());

        // Buscar sala por nombre
        Sala sala = salaRepo.findByNombreSala(request.getNombreSala())
                .orElseThrow(() -> new RuntimeException("Sala no encontrada: " + request.getNombreSala()));
        horario.setSala(sala);

        // Buscar administrativo por número de empleado
        if (request.getNumeroEmpleado() != null) {
            Administrativo admin = adminRepo.findByNumeroEmpleado(request.getNumeroEmpleado())
                    .orElseThrow(
                            () -> new RuntimeException("Administrativo no encontrado: " + request.getNumeroEmpleado()));

            horario.setAdministrativo(admin);
        }

        horarioSalaRepo.save(horario);

        return ResponseEntity.ok("Horario registrado exitosamente");
    }
}