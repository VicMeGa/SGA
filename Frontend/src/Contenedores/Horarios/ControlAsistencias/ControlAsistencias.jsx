import { useState, useEffect } from "react";
import Cabeza from "../../Cabeza";
import Nav from "../../Nav";
import Tabla from "./Tabla";

const ControlAsistencias = () => {

    const [salas, setSalas] = useState([]);
    const [materias, setMaterias] = useState([]);
    const [grupos, setGrupos] = useState([]);
    const [semestres, setSemestres] = useState([]);
    const [Sala, setSala] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [selectedCell, setSelectedCell] = useState({ day: "", hour: "" });
    const [schedule, setSchedule] = useState({});

    const [Materia, setMateriaa] = useState("");
    const [Profesor, setProfesor] = useState("");
    const [Grupo, setGrupo] = useState("");
    const [Carrera, setCarrera] = useState("");
    const [Semestre, setSemestre] = useState("");
    const [nombresAlumnos, setNombresAlumnos] = useState([]);
    const [asistencias, setAsistencias] = useState([]);

    const back = import.meta.env.VITE_BACKEND_URL;

    const obtenerAsistencias = async (nombresLista = nombresAlumnos) => {
        try {
            console.log("🔍 Obteniendo asistencias...");
            const response = await fetch(`${back}buscar/accesos`);
            const data = await response.json();
            
            console.log("📊 Datos de accesos recibidos:", data);
            console.log("👥 Nombres de alumnos:", nombresLista);
            console.log("🏫 Sala seleccionada:", Sala);

            const asistenciasPorAlumno = {};

            nombresLista.forEach((nombre) => {
                asistenciasPorAlumno[nombre] = [];
            });

            const salaSeleccionada = salas.find(s => s.nombreSala === Sala);
            console.log("🏫 Sala encontrada:", salaSeleccionada);

            data.forEach((acceso, index) => {
                console.log(`\n🔄 === PROCESANDO ACCESO ${index + 1} ===`);
                
                // ✅ Construir nombre completo del acceso (con espacios correctos)
                const nombreCompleto = `${acceso.usuario.nombre} ${acceso.usuario.apellido_paterno} ${acceso.usuario.apellido_materno}`.trim();
                
                console.log(`👤 Procesando acceso de: "${nombreCompleto}"`);
                console.log(`🏫 Sala del acceso: ${acceso.sala.idSala} (${acceso.sala.nombreSala}) vs Sala buscada: ${salaSeleccionada?.idSala} (${salaSeleccionada?.nombreSala})`);
                console.log(`📅 Fecha del acceso: ${acceso.fechaHoraEntrada}`);

                // ✅ Mostrar TODOS los nombres de la lista para comparar
                console.log(`📋 Lista completa de alumnos esperados:`);
                nombresLista.forEach((nombre, i) => {
                    console.log(`   ${i + 1}. "${nombre}"`);
                });

                // ✅ Buscar si este alumno está en nuestra lista (comparación más flexible)
                let alumnoEncontrado = null;
                
                // Primero intenta coincidencia exacta
                alumnoEncontrado = nombresLista.find((nombre) => {
                    const nombreTrimmed = nombre.trim();
                    const nombreCompletoTrimmed = nombreCompleto.trim();
                    console.log(`   🔍 Comparando exacta: "${nombreTrimmed}" === "${nombreCompletoTrimmed}"`);
                    return nombreTrimmed === nombreCompletoTrimmed;
                });
                
                // Si no encuentra coincidencia exacta, intenta solo con nombre y primer apellido                
                if (!alumnoEncontrado) {
                    const nombreCorto = `${acceso.usuario.nombre} ${acceso.usuario.apellido_paterno}`.trim();
                    console.log(`   🔍 Intentando con nombre corto: "${nombreCorto}"`);
                    
                    alumnoEncontrado = nombresLista.find((nombre) => {
                        const esCoincidencia = nombre.trim().startsWith(nombreCorto);
                        console.log(`     🔍 "${nombre.trim()}" starts with "${nombreCorto}"? ${esCoincidencia}`);
                        return esCoincidencia;
                    });
                }
                
                // Si aún no encuentra, intenta solo con el nombre
                if (!alumnoEncontrado) {
                    console.log(`   🔍 Intentando solo con nombre: "${acceso.usuario.nombre}"`);
                    
                    alumnoEncontrado = nombresLista.find((nombre) => {
                        const esCoincidencia = nombre.trim().includes(acceso.usuario.nombre.trim());
                        console.log(`     🔍 "${nombre.trim()}" includes "${acceso.usuario.nombre.trim()}"? ${esCoincidencia}`);
                        return esCoincidencia;
                    });
                }
                
                console.log(`   📝 Alumno encontrado en lista: ${alumnoEncontrado ? `SÍ - "${alumnoEncontrado}"` : 'NO'}`);
                
                // ✅ Verificar si el acceso es de la sala correcta
                const salaCoincide = acceso.sala.idSala === salaSeleccionada?.idSala;
                console.log(`   🏫 Sala coincide: ${salaCoincide ? 'SÍ' : 'NO'}`);
                
                if (alumnoEncontrado && salaCoincide) {
                    console.log(`✅ ¡COINCIDENCIA ENCONTRADA! para: "${nombreCompleto}" -> "${alumnoEncontrado}"`);
                    
                    // ✅ Formatear fecha como yyyy-mm-dd para consistencia
                    const fechaOriginal = acceso.fechaHoraEntrada;
                    console.log(`📅 Fecha original del acceso: ${fechaOriginal}`);
                    
                    // Manejar tanto formato "2025-05-30T15:30:00" como "2025-05-30 15:30:00"
                    const fechaISO = fechaOriginal.includes('T') ? fechaOriginal : fechaOriginal.replace(' ', 'T');
                    const fecha = new Date(fechaISO);
                    
                    if (isNaN(fecha.getTime())) {
                        console.error(`❌ Fecha inválida: ${fechaOriginal}`);
                        return;
                    }
                    
                    const anio = fecha.getFullYear();
                    const mes = String(fecha.getMonth() + 1).padStart(2, "0");
                    const dia = String(fecha.getDate()).padStart(2, "0");
                    const fechaFormateada = `${anio}-${mes}-${dia}`;
                    
                    console.log(`📅 Fecha formateada: ${fechaFormateada}`);
                    console.log(`📅 Agregando a asistencias de: "${alumnoEncontrado}"`);
                    
                    asistenciasPorAlumno[alumnoEncontrado].push(fechaFormateada);
                    
                    console.log(`📋 Asistencias actuales de ${alumnoEncontrado}:`, asistenciasPorAlumno[alumnoEncontrado]);
                } else {
                    console.log(`❌ No coincide - Alumno: ${!!alumnoEncontrado}, Sala: ${salaCoincide}`);
                }
                
                console.log(`🔄 === FIN ACCESO ${index + 1} ===\n`);
            });

            const arregloFinal = Object.keys(asistenciasPorAlumno).map(nombre => ({
                alumno: nombre,
                fechasAsistidas: asistenciasPorAlumno[nombre]
            }));

            console.log("📋 Resultado final de asistencias:", arregloFinal);
            setAsistencias(arregloFinal);
        } catch (error) {
            console.error("Error al obtener asistencias:", error);
        }
    };

    const obtenerSalas = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`${back}/buscar/salas`);
            if (!response.ok) {
                throw new Error(`Error: ${response.status} ${response.statusText}`);
            }

            const data = await response.json();
            setSalas(data);
        } catch (err) {
            console.error('Error al obtener las salas:', err);
            setError('Error al cargar las salas. Por favor, intenta de nuevo.');
        } finally {
            setLoading(false);
        }
    };

    const obtenerMaterias = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`${back}/buscar/materias`);
            if (!response.ok) {
                throw new Error(`Error: ${response.status} ${response.statusText}`);
            }

            const data = await response.json();
            setMaterias(data);
        } catch (err) {
            console.error('Error al obtener las materias:', err);
            setError('Error al cargar las materias. Por favor, intenta de nuevo.');
        } finally {
            setLoading(false);
        }
    };

    const obtenerGrupos = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`${back}buscar/grupos`);
            if (!response.ok) {
                throw new Error(`Error: ${response.status} ${response.statusText}`);
            }

            const data = await response.json();
            setGrupos(data);
        } catch (err) {
            console.error('Error al obtener los grupos:', err);
            setError('Error al cargar los grupos. Por favor, intenta de nuevo.');
        } finally {
            setLoading(false);
        }
    };

    const obtenerSemestres = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`${back}/buscar/semestres`);
            if (!response.ok) {
                throw new Error(`Error: ${response.status} ${response.statusText}`);
            }

            const data = await response.json();
            setSemestres(data);
        } catch (err) {
            console.error('Error al obtener los grupos:', err);
            setError('Error al cargar los grupos. Por favor, intenta de nuevo.');
        } finally {
            setLoading(false);
        }
    };

    const buscarAlumnosYMaestro = async () => {
        if (Semestre && Grupo && Materia && Sala) {
            try {
                const responseAlumnos = await fetch(`${back}/buscar/nombres/semestre/${Semestre}/grupo/${Grupo}/materia/${Materia}/sala/${Sala}`);
                const nombres = await responseAlumnos.json();
                setNombresAlumnos(nombres);

                const responseMaestro = await fetch(`${back}/buscar/nombres/maestro/${Materia}`);
                const nombreMaestro = await responseMaestro.json();
                if (Array.isArray(nombreMaestro) && nombreMaestro.length > 0) {
                    setProfesor(nombreMaestro[0]);
                }
                
                setTimeout(() => {
                    obtenerAsistencias(nombres);
                }, 100);

            } catch (error) {
                console.error("Error:", error);
            }
        }
    };

    useEffect(() => {
        obtenerSalas();
        obtenerMaterias();
        obtenerGrupos();
        obtenerSemestres();
    }, []);

    return (
        <>
            <Cabeza />
            <Nav />
            <div className="controlMain">
                <div className="upControl" >
                    <select value={Sala} onChange={(e) => setSala(e.target.value)}>
                        <option value="" disabled>
                            {loading ? 'Cargando salas...' : 'Selecciona una sala'}
                        </option>
                        {salas.map((sala) => (
                            <option key={sala.idSala} value={sala.nombreSala}>
                                {sala.nombreSala}
                            </option>
                        ))}
                    </select>

                    <select value={Materia} onChange={(e) => setMateriaa(e.target.value)}>
                        <option value="" disabled>
                            {loading ? 'Cargando materias...' : 'Selecciona una materia'}
                        </option>
                        {materias.map((materia) => (
                            <option key={materia} value={materia}>
                                {materia}
                            </option>
                        ))}
                    </select>

                    <select value={Grupo} onChange={(e) => setGrupo(e.target.value)}>
                        <option value="" disabled>
                            {loading ? 'Cargando grupos...' : 'Selecciona un grupo'}
                        </option>
                        {grupos.map((grupo) => (
                            <option key={grupo} value={grupo}>
                                {grupo}
                            </option>
                        ))}
                    </select>

                    <select value={Semestre} onChange={(e) => setSemestre(e.target.value)}>
                        <option value="" disabled>
                            {loading ? 'Cargando semestres...' : 'Selecciona un semestre'}
                        </option>
                        {semestres.map((smt) => (
                            <option key={smt} value={smt}>
                                {smt}
                            </option>
                        ))}
                    </select>

                    <button onClick={buscarAlumnosYMaestro}>
                        Aceptar
                    </button>

                </div>
                <div className="controlTab" >
                    <Tabla nombresAlumnos={nombresAlumnos} asistencias={asistencias} />
                </div>
                <div className="downControl" >
                    <input type='text' placeholder='Profesor:' value={Profesor && Profesor.usuario ? Profesor.usuario.nombre + " " + Profesor.usuario.apellido_paterno : ''} readOnly />
                    <input type='text' placeholder='Materia:' value={Materia} readOnly />
                    <input type='text' placeholder='Grupo:' value={Grupo} readOnly />
                    <input type='text' placeholder='Carrera:' value={Profesor && Profesor.usuario ? Profesor.usuario.programaEducativo : ''} readOnly />
                </div>
            </div>
        </>
    );
};

export default ControlAsistencias;