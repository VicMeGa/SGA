import { useState, useEffect } from "react";
import Cabeza from "../Cabeza";
import Nav from "../Nav";
import Tabla from './Tabla';
import { useNavigate } from 'react-router-dom';
import RegistrarH from "./RegistrarH";

const Horario = () => {
    const navigate = useNavigate();

    const [salas, setSalas] = useState([]);
    const [Sala, setSala] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [selectedCell, setSelectedCell] = useState({ day: "", hour: "" });
    const [schedule, setSchedule] = useState({});


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
            <RegistrarH />
            <div className="divHorario">
                <div className="botonesHorario">
                    {error && <p style={{ color: "red" }}>{error}</p>}
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
                    <button type="button">Aceptar</button>
                </div>
                <div className="divTabla">
                    <Tabla
                        salaSeleccionada={Sala}
                        selectedCell={selectedCell}
                        setSelectedCell={setSelectedCell}
                        schedule={schedule}
                        setSchedule={setSchedule}
                    />

                </div>
                <div className="botonesHorarioB">
                    <button type="button" onClick={() => navigate('/RegistrarSala')}>Registrar Sala</button>
                    <button type="button" onClick={() => navigate('/ControlAsistencias')}>Control Asistencias</button>
                    <button
                        type="button"
                        onClick={() => {
                            const { day, hour } = selectedCell;
                            if (day && hour && !schedule[day]?.[hour]) {
                                setSchedule((prev) => ({
                                    ...prev,
                                    [day]: {
                                        ...prev[day],
                                        [hour]: "APARTADA",
                                    },
                                }));
                            }
                        }}
                    >
                        Apartar
                    </button>

                </div>
            </div>
        </>
    );
};

export default Horario;