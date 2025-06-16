package com.vantus.project.controller;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.vantus.project.dto.ApartadoRequest;
import com.vantus.project.dto.RegistroAdministrativoRequest;
import com.vantus.project.dto.RegistroAlumnoRequest;
import com.vantus.project.dto.RegistroArticuloRequest;
import com.vantus.project.dto.RegistroHorarioRequest;
import com.vantus.project.dto.RegistroInvitadoRequest;
import com.vantus.project.dto.RegistroSalaRequest;
import com.vantus.project.model.Administrativo;
import com.vantus.project.model.Alumno;
import com.vantus.project.model.Apartado_Sala;
import com.vantus.project.model.Articulos_Laboratorio;
import com.vantus.project.model.Horario_Sala;
import com.vantus.project.model.Invitado;
import com.vantus.project.model.Sala;
import com.vantus.project.model.Usuario;
import com.vantus.project.repository.AdministrativoRepository;
import com.vantus.project.repository.AlumnoRepository;
import com.vantus.project.repository.ApartadoSalaRepository;
import com.vantus.project.repository.ArticulosRepository;
import com.vantus.project.repository.HorarioSalaRepository;
import com.vantus.project.repository.InvitadoRepository;
import com.vantus.project.repository.SalaRepository;
import com.vantus.project.repository.UsuarioRepository;
import com.vantus.project.service.EmailService;
import com.vantus.project.service.EncriptacionService;
import com.vantus.project.utils.QRGenerator;

import org.springframework.http.HttpStatus;

//import jakarta.persistence.criteria.Path;

import org.springframework.http.MediaType;

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
    private ApartadoSalaRepository apartadoRepo;

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
        admin.setContrasena(EncriptacionService.encriptar(request.getContrasena()));
        admin.setCargo(request.getCargo());
        admin.setUsuario(usuario);

        usuario.setHuellaDactilar("Huella_" + request.getNumeroEmpleado());

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

        Alumno alumn = new Alumno();
        alumn.setMatricula(request.getMatricula());
        alumn.setSemestre(request.getSemestre());
        alumn.setGrupo(request.getGrupo());
        alumn.setUsuario(usuario);

        usuario.setHuellaDactilar("Huella_" + request.getMatricula());

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
        usuario.setHuellaDactilar("N/A");
        usuario.setProgramaEducativo("N/A");

        Invitado invi = new Invitado();
        invi.setFechaRegistro(request.getFechaRegistro());
        invi.setUsuario(usuario);

        // ✅ Generar QR después de guardar el usuario
        try {
            String contenidoQR = "Nombre: " + usuario.getNombre() + " " + usuario.getApellido_paterno() + "\n" +
                    "Correo: " + usuario.getCorreo();

            String relativePath = "src/main/resources/static/qrcodes/";
            Files.createDirectories(Paths.get(relativePath)); // Asegura que exista

            String nombreArchivo = "usuario_" + request.getApellido_paterno() + "_" + request.getApellido_materno();
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

        // Aquí se guarda directamente el contenido en la BD
        arti.setFoto(imagen.getBytes());

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
        horario.setSemestre(request.getSemestre());

        // Buscar sala por nombre
        Sala sala = salaRepo.findByNombreSala(request.getNombreSala())
                .orElseThrow(() -> new RuntimeException("Sala no encontrada: " + request.getNombreSala()));
        horario.setSala(sala);

        // Verificar administrativo y su estado activo
        if (request.getNumeroEmpleado() != null) {
            Administrativo admin = adminRepo.findByNumeroEmpleado(request.getNumeroEmpleado())
                    .orElseThrow(
                            () -> new RuntimeException("Administrativo no encontrado: " + request.getNumeroEmpleado()));

            Usuario usuario = admin.getUsuario();
            if (usuario == null || !Boolean.TRUE.equals(usuario.getActivo())) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN)
                        .body("El administrativo no está activo, no puede registrar horarios.");
            }

            horario.setAdministrativo(admin);
        }

        horarioSalaRepo.save(horario);

        return ResponseEntity.ok("Horario registrado exitosamente");
    }

    @PostMapping("/apartado")
    public ResponseEntity<?> apartarSala(@RequestBody ApartadoRequest request) {
        Optional<Administrativo> adminOpt = adminRepo.findByNumeroEmpleado(request.getNumeroEmpleado());

        if (!adminOpt.isPresent()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Número de empleado no encontrado");
        }

        Administrativo admin = adminOpt.get();

        String contrasenaDesencriptada = EncriptacionService.desencriptar(admin.getContrasena());

        // Verificar contraseña (sin codificación)
        if (!contrasenaDesencriptada.equals(request.getPassword())) {
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

        Optional<Sala> salaOpt = salaRepo.findByNombreSala(request.getNombreSala());

        if (!salaOpt.isPresent()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Sala no encontrada.");
        }

        Sala sala = salaOpt.get();

        LocalDateTime inicio = LocalDateTime.of(LocalDate.now(), LocalTime.parse(request.getHoraInicio()));
        LocalDateTime fin = inicio.plusHours(1); // asumimos duración de 1h

        Apartado_Sala apartado = new Apartado_Sala();
        apartado.setAdministrativo(admin);
        apartado.setSala(sala);
        apartado.setDia(request.getDia());
        apartado.setFechaHoraInicio(inicio);
        apartado.setFechaHoraFin(fin);

        apartadoRepo.save(apartado);

        return ResponseEntity.ok("Apartado registrado con éxito");
    }

}