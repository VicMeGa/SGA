import { useState, useEffect } from "react";
import Cabeza from "../Cabeza";
import Nav from "../Nav";
import Tabla from './Tabla';
import { useNavigate } from 'react-router-dom';
import RegistrarH from "./RegistrarH";
import ApartarModal from "./ApartarModal";

const Horario = () => {
    const navigate = useNavigate();

    const [salas, setSalas] = useState([]);
    const [Sala, setSala] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [selectedCell, setSelectedCell] = useState({ day: "", hour: "" });
    const [schedule, setSchedule] = useState({});
    const [showModal, setShowModal] = useState(false);
    const [password, setPassword] = useState("");

    const back = import.meta.env.VITE_BACKEND_URL;

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

    const handleApartarConfirm = async ({ numeroEmpleado, password, day, hour }) => {
        console.log({ numeroEmpleado, password, day, hour, Sala });

        try {
            const response = await fetch(`${back}/registro/apartado`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    numeroEmpleado,
                    password: password,
                    dia: day,
                    horaInicio: hour.split(" - ")[0],
                    nombreSala: Sala,
                }),
            });

            if (!response.ok) {
                const errorText = await response.text();
                alert("Error: " + errorText);
            } else {
                alert("Apartado realizado con éxito");
                setSchedule((prev) => ({
                    ...prev,
                    [day]: {
                        ...prev[day],
                        [hour]: `Apartado por empleado ${numeroEmpleado}`,
                    },
                }));
            }
        } catch (error) {
            console.error("Error al apartar sala:", error);
        } finally {
            setShowModal(false);
        }
    };

    const handleApartarClick = () => {
        const { day, hour } = selectedCell;
        if (!day || !hour) {
            alert("Por favor, selecciona una celda del horario primero.");
            return;
        }
        if (schedule[day]?.[hour]) {
            alert("Esta hora ya está ocupada.");
            return;
        }
        if (!Sala) {
            alert("Por favor, selecciona una sala primero.");
            return;
        }
        setShowModal(true);
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
                    <button type="button" onClick={handleApartarClick}>
                        Apartar
                    </button>
                </div>
            </div>

            {/* Modal fuera de cualquier contenedor con restricciones */}
            <ApartarModal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                onConfirm={handleApartarConfirm}
                day={selectedCell.day}
                hour={selectedCell.hour}
            />
        </>
    );
};

export default Horario;