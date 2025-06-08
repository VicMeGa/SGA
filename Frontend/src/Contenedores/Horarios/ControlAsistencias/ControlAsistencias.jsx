import { useState, useEffect } from "react";
import Cabeza from "../../Cabeza";
import Nav from "../../Nav";
import Tabla from "./Tabla";

const ControlAsistencias = () => {

    const [salas, setSalas] = useState([]);
    const [Sala, setSala] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [selectedCell, setSelectedCell] = useState({ day: "", hour: "" });
    const [schedule, setSchedule] = useState({});

    const Materias = ["Algebra Superior", "Sistemas Operativos", "POO"];
    const grupos = ["A", "B", "C"];
    const semestres = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const [Materiaa, setMateriaa] = useState("");

    const [Profesor, setProfesor] = useState("");
    const [Materia, setMateria] = useState("");
    const [Grupo, setGrupo] = useState("");
    const [Carrera, setCarrera] = useState("");
    const [Semestre, setSemestre] = useState("");


    const obtenerSalas = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch('http://localhost:8080/sga/buscar/salas');
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

    const obtenerGrupos = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch('http://localhost:8080/sga/buscar/grupos');
            if (!response.ok) {
                throw new Error(`Error: ${response.status} ${response.statusText}`);
            }

            const data = await response.json();
            setSalas(data);
        } catch (err) {
            console.error('Error al obtener los grupos:', err);
            setError('Error al cargar los grupos. Por favor, intenta de nuevo.');
        } finally {
            setLoading(false);
        }
    };

    // Ejecutar al montar el componente
    useEffect(() => {
        obtenerSalas();
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

                    <select value={Materiaa} onChange={(e) => setMateriaa(e.target.value)} >
                        <option value="" disabled>Selecciona una Materia</option>
                        {Materias.map((mate) => (
                            <option key={mate} value={mate}>
                                {mate}
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

                    <select value={Semestre} onChange={(e) => setSemestre(e.target.value)} >
                        <option value="" disabled>Selecciona un semestre</option>
                        {semestres.map((smtr) => (
                            <option key={smtr} value={smtr}>
                                {smtr}
                            </option>
                        ))}
                    </select>
                    <button>
                        Aceptar
                    </button>
                </div>
                <div className="controlTab" >
                    <Tabla />
                </div>
                <div className="downControl" >
                    <input type='text' placeholder='Profesor:' value={Profesor} readOnly />
                    <input type='text' placeholder='Materia:' value={Materia} readOnly />
                    <input type='text' placeholder='Grupo:' value={Grupo} readOnly />
                    <input type='text' placeholder='Carrera:' value={Carrera} readOnly />
                </div>
            </div>
        </>
    );
};

export default ControlAsistencias;