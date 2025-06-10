package com.vantus.project.controller;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.vantus.project.dto.BusquedaRequest;
import com.vantus.project.model.Acceso;
import com.vantus.project.model.Administrativo;
import com.vantus.project.model.Alumno;
import com.vantus.project.model.Apartado_Sala;
import com.vantus.project.model.Articulos_Laboratorio;
import com.vantus.project.model.Horario_Sala;
import com.vantus.project.model.Sala;
import com.vantus.project.model.Usuario;
import com.vantus.project.repository.AccesoRepository;
import com.vantus.project.repository.AdministrativoRepository;
import com.vantus.project.repository.AlumnoRepository;
import com.vantus.project.repository.ApartadoSalaRepository;
import com.vantus.project.repository.ArticulosRepository;
import com.vantus.project.repository.HorarioSalaRepository;
import com.vantus.project.repository.SalaRepository;
import com.vantus.project.repository.UsuarioRepository;

@RestController
@RequestMapping("/sga/buscar")
public class BusquedaController {

    @Autowired
    private AlumnoRepository alumnoRepo;

    @Autowired
    private AdministrativoRepository adminRepo;

    @Autowired
    private UsuarioRepository usuarioRepo;

    @Autowired
    private ArticulosRepository artiRepo;

    @Autowired
    private SalaRepository salaRepo;

    @Autowired
    private ApartadoSalaRepository apartadoRepo;

    @Autowired
    private HorarioSalaRepository horaRepo;

    @Autowired
    private AccesoRepository accesoRepo;

    private static final DateTimeFormatter FORMATO = DateTimeFormatter.ofPattern("dd/MM/yyyy");

    @GetMapping("/usuarios")
    public ResponseEntity<?> buscar(@RequestParam String query) {
        List<BusquedaRequest> resultados = new ArrayList<>();

        // Buscar por matrícula (8 dígitos)
        if (query.matches("\\d{8}")) {
            alumnoRepo.findByMatricula(query).ifPresent(alumno -> {
                if (Boolean.TRUE.equals(alumno.getUsuario().getActivo())) {
                    String nombre = alumno.getUsuario().getNombre();
                    resultados.add(new BusquedaRequest(alumno.getMatricula(), nombre));
                }
            });
        }

        // Buscar por número de empleado (6 dígitos)
        else if (query.matches("\\d{6}")) {
            adminRepo.findByNumeroEmpleado(query).ifPresent(admin -> {
                if (Boolean.TRUE.equals(admin.getUsuario().getActivo())) {
                    String nombre = admin.getUsuario().getNombre();
                    resultados.add(new BusquedaRequest(admin.getNumeroEmpleado(), nombre));
                }
            });
        }

        // Buscar por nombre (en tabla Usuario)
        else {
            List<Usuario> usuarios = usuarioRepo.findByNombreContainingIgnoreCaseAndActivoTrue(query);
            for (Usuario usuario : usuarios) {
                Optional<Alumno> alumnoOpt = alumnoRepo.findByUsuario(usuario);
                if (alumnoOpt.isPresent()) {
                    resultados.add(new BusquedaRequest(alumnoOpt.get().getMatricula(), usuario.getNombre()));
                    continue;
                }

                Optional<Administrativo> adminOpt = adminRepo.findByUsuario(usuario);
                if (adminOpt.isPresent()) {
                    resultados.add(new BusquedaRequest(adminOpt.get().getNumeroEmpleado(), usuario.getNombre()));
                }
            }
        }

        if (resultados.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No se encontraron resultados.");
        }

        return ResponseEntity.ok(resultados);
    }

    @GetMapping("/usuario/detalle/{identificador}")
    public ResponseEntity<?> obtenerDetalleUsuario(@PathVariable String identificador) {
        if (identificador.matches("\\d{8}")) {
            Optional<Alumno> alumno = alumnoRepo.findByMatricula(identificador);
            if (alumno.isPresent()) {
                return ResponseEntity.ok(alumno.get());
            }
        } else if (identificador.matches("\\d{6}")) {
            Optional<Administrativo> admin = adminRepo.findByNumeroEmpleado(identificador);
            if (admin.isPresent()) {
                return ResponseEntity.ok(admin.get());
            }
        }

        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Usuario no encontrado.");
    }

    @PostMapping("/eliminar/usuarios/{identificador}")
    public ResponseEntity<?> eliminarUsuario(@PathVariable String identificador) {
        // Buscar si es Alumno
        Optional<Alumno> alumnoOpt = alumnoRepo.findByMatricula(identificador);
        if (alumnoOpt.isPresent()) {
            Usuario usuario = alumnoOpt.get().getUsuario(); // Obtener usuario antes de borrar
            usuario.setActivo(false); // Eliminar el usuario también
            usuarioRepo.save(usuario);
            return ResponseEntity.ok("Alumno y usuario eliminados.");
        }

        // Buscar si es Administrativo
        Optional<Administrativo> adminOpt = adminRepo.findByNumeroEmpleado(identificador);
        if (adminOpt.isPresent()) {
            Usuario usuario = adminOpt.get().getUsuario();
            usuario.setActivo(false); // Eliminar el usuario también
            usuarioRepo.save(usuario);
            return ResponseEntity.ok("Usuario 'eliminado'");
        }

        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Usuario no encontrado.");
    }

    @GetMapping("/articulo/{id}/imagen")
    public ResponseEntity<byte[]> obtenerImagen(@PathVariable Integer id) {
        Optional<Articulos_Laboratorio> optionalArticulo = artiRepo.findById(id);
        if (optionalArticulo.isEmpty() || optionalArticulo.get().getFoto() == null) {
            return ResponseEntity.notFound().build();
        }

        byte[] imagen = optionalArticulo.get().getFoto();
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.IMAGE_JPEG); // o IMAGE_PNG, según el tipo

        return new ResponseEntity<>(imagen, headers, HttpStatus.OK);
    }

    @GetMapping("/articulos")
    public ResponseEntity<List<Articulos_Laboratorio>> obtenerArticulos() {
        List<Articulos_Laboratorio> articulos = artiRepo.findAll();
        return ResponseEntity.ok(articulos);
    }

    @GetMapping("/articulos/{id}")
    public ResponseEntity<Articulos_Laboratorio> obtenerArticuloPorId(@PathVariable Integer id) {
        Optional<Articulos_Laboratorio> articulo = artiRepo.findById(id);
        return articulo.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("/salas")
    public ResponseEntity<List<Sala>> obtenerSalas() {
        List<Sala> salas = salaRepo.findAll();
        return ResponseEntity.ok(salas);
    }

    @GetMapping("/horarios")
    public ResponseEntity<List<Horario_Sala>> obtenerHorarios() {
        List<Horario_Sala> todosHorarios = horaRepo.findAll();

        List<Horario_Sala> filtrados = todosHorarios.stream()
                .filter(h -> h.getAdministrativo().getUsuario().getActivo() == true) // Suponiendo getter booleano
                .collect(Collectors.toList());

        return ResponseEntity.ok(filtrados);
    }

    @GetMapping("/horarios/apartados")
    public ResponseEntity<List<Apartado_Sala>> obtenerApartados() {
        List<Apartado_Sala> todosHorarios = apartadoRepo.findAll();

        List<Apartado_Sala> filtrados = todosHorarios.stream()
                .filter(h -> h.getAdministrativo().getUsuario().getActivo() == true) // Suponiendo getter booleano
                .collect(Collectors.toList());

        return ResponseEntity.ok(filtrados);
    }

    @GetMapping("/anteriores")
    public List<String> obtenerFechasHabiles(
            @RequestParam("fecha") @DateTimeFormat(pattern = "dd/MM/yyyy") LocalDate fechaActual) {

        List<String> fechasHabiles = new ArrayList<>();
        LocalDate fecha = fechaActual;

        while (fechasHabiles.size() < 9) {
            if (esDiaHabil(fecha)) {
                fechasHabiles.add(0, fecha.format(FORMATO)); // Insertar al inicio para que queden en orden
            }
            fecha = fecha.minusDays(1);
        }

        return fechasHabiles;
    }

    private boolean esDiaHabil(LocalDate fecha) {
        DayOfWeek dia = fecha.getDayOfWeek();
        return dia != DayOfWeek.SATURDAY && dia != DayOfWeek.SUNDAY;
    }

    @GetMapping("/grupos")
    public ResponseEntity<List<String>> obtenerGrupos() {
        List<String> todosGrupos = alumnoRepo.findDistinctGruposOrderByGrupo();
        return ResponseEntity.ok(todosGrupos);
    }

    @GetMapping("/materias")
    public ResponseEntity<List<String>> obtenerMaterias() {
        List<String> todasMaterias = horaRepo.findDistinctMaterias();
        return ResponseEntity.ok(todasMaterias);
    }

    @GetMapping("/semestres")
    public ResponseEntity<List<String>> obtenerSemestres() {
        List<String> todosSemestres = horaRepo.findDistinctSemestre();
        return ResponseEntity.ok(todosSemestres);
    }

    @GetMapping("/nombres/semestre/{semestre}/grupo/{grupo}/materia/{materia}/sala/{nombreSala}")
    public ResponseEntity<List<String>> obtenerNombres(
            @PathVariable String grupo,
            @PathVariable Integer semestre,
            @PathVariable String materia,
            @PathVariable String nombreSala) {

        List<String> nombres = alumnoRepo.obtenerNombresUsuariosPorGrupoSemestreMateriaYSala(grupo, semestre, materia,
                nombreSala);
        return ResponseEntity.ok(nombres);
    }

    @GetMapping("/nombres/maestro/{materia}")
    public ResponseEntity<List<Administrativo>> obtenerNombres(@PathVariable String materia) {
        List<Administrativo> administrativos = adminRepo.obtenerAdministrativosPorMateria(materia);
        return ResponseEntity.ok(administrativos);
    }

    @GetMapping("/accesos")
    public ResponseEntity<List<Acceso>> getTodosLosAccesos() {
        List<Acceso> accesos = accesoRepo.findAll();
        return ResponseEntity.ok(accesos);
    }

}