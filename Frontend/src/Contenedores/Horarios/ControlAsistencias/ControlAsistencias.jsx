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

    const Materias = ["Algebra Superior 6B", "Sistemas Operativos 3A", "Programación Orientada a Objetos 2B"];
    const grupos = ["A", "B", "C"];
    const [Materiaa, setMateriaa] = useState("");

    const [Profesor, setProfesor] = useState("");
    const [Materia, setMateria] = useState("");
    const [Grupo, setGrupo] = useState("");
    const [Carrera, setCarrera] = useState("");


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

                    <select value={Grupo} onChange={(e) => setGrupo(e.target.value)} >
                        <option value="" disabled>Selecciona un grupo</option>
                        {grupos.map((grp) => (
                            <option key={grp} value={grp}>
                                {grp}
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