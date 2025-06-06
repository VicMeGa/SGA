import { useState, useEffect } from "react";
import Cabeza from "../../Cabeza";
import Nav from "../../Nav";

const RegistrarHorario = () => {
    const [sala, setSala] = useState("");
    const [materia, setMateria] = useState("");
    const [dia, setDia] = useState("");
    const [horaInicio, setInicio] = useState("");
    const [horaFin, setFin] = useState("");
    const [numeroEmpleado, setEmpleado] = useState("");
    const [grupo, setGrupo] = useState("");
    const [semestre, setSemestre] = useState("");

    const [salas, setSalas] = useState([]);
    const [loadingSalas, setLoad] = useState(false);
    const [errorSalas, setErr] = useState(null);
    const [mensaje, setMensaje] = useState("");

    const dias = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"];
    const horas = [
        "08:00", "09:00", "10:00", "11:00", "12:00",
        "13:00", "14:00", "15:00", "16:00", "17:00",
        "18:00", "19:00", "20:00"
    ];

    useEffect(() => {
        const obtenerSalas = async () => {
            setLoad(true);
            setErr(null);
            try {
                const resp = await fetch("http://localhost:8080/sga/buscar/salas");
                if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
                const data = await resp.json();
                setSalas(data);
            } catch (err) {
                console.error("Error salas:", err);
                setErr("No se pudieron cargar las salas");
            } finally {
                setLoad(false);
            }
        };
        obtenerSalas();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMensaje("");

        const salaSeleccionada = salas.find(s => s.idSala === parseInt(sala));

        const body = {
            materia,
            dia,
            horaInicio,
            horaFin,
            nombreSala: salaSeleccionada?.nombreSala || "", // Asegúrate de que sea el nombre, no el ID
            numeroEmpleado, // Se espera como cadena, ejemplo "000002"
            grupo,
            semestre
        };

        try {
            const resp = await fetch("http://localhost:8080/sga/registro/horario", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(body)
            });

            if (!resp.ok) {
                throw new Error(`Error al registrar horario (HTTP ${resp.status})`);
            }

            setMensaje("✅ Horario registrado correctamente");
            // Opcional: limpiar formulario
            setMateria("");
            setDia("");
            setInicio("");
            setFin("");
            setSala("");
            setEmpleado("");
            setGrupo("");
            setSemestre("");
        } catch (err) {
            console.error("Error al registrar horario:", err);
            setMensaje("❌ Error al registrar el horario");
        }
    };

    return (
        <>
            <Cabeza />
            <Nav />

            <div className="divRegistrarHorario">
                <h1>Registrar Horario</h1>

                <form onSubmit={handleSubmit}>
                    {errorSalas && <p style={{ color: "red" }}>{errorSalas}</p>}
                    {mensaje && <p style={{ color: mensaje.startsWith("✅") ? "green" : "red" }}>{mensaje}</p>}

                    {/* Sala */}
                    <select
                        value={sala}
                        onChange={(e) => setSala(e.target.value)}
                        disabled={loadingSalas || salas.length === 0}
                        required
                    >
                        <option value="">Selecciona una sala</option>
                        {salas.map((s) => (
                            <option key={s.idSala} value={s.idSala}>
                                {s.nombreSala}
                            </option>
                        ))}
                    </select>

                    {/* Materia */}
                    <input type="text" placeholder="Nombre de la materia" value={materia} onChange={(e) => setMateria(e.target.value)} required/>

                    {/* Día */}
                    <select value={dia} onChange={(e) => setDia(e.target.value)} required>
                        <option value="">Selecciona un día</option>
                        {dias.map((d) => (
                            <option key={d} value={d}>{d}</option>
                        ))}
                    </select>

                    {/* Hora inicio */}
                    <select value={horaInicio} onChange={(e) => setInicio(e.target.value)} required>
                        <option value="">Hora de inicio</option>
                        {horas.map((h) => (
                            <option key={h} value={h}>{h}</option>
                        ))}
                    </select>

                    {/* Hora fin */}
                    <select value={horaFin} onChange={(e) => setFin(e.target.value)} required>
                        <option value="">Hora de fin</option>
                        {horas.map((h) => (
                            <option key={h} value={h}>{h}</option>
                        ))}
                    </select>

                    {/* Número de empleado */}
                    <input
                        type="text"
                        placeholder="Número de empleado"
                        value={numeroEmpleado}
                        onChange={(e) => setEmpleado(e.target.value)}
                        required
                    />

                    {/* Grupo */}
                    <input
                        type="text"
                        placeholder="Grupo (ej. A, B)"
                        value={grupo}
                        onChange={(e) => setGrupo(e.target.value)}
                        required
                    />

                    {/* Grupo */}
                    <input
                        type="text"
                        placeholder="Semestre (ej. 5, 6)"
                        value={semestre}
                        onChange={(e) => setSemestre(e.target.value)}
                        required
                    />

                    {/* Botones */}
                    <div className="botonesre">
                        <button
                            className="cancelButton"
                            type="button"
                            onClick={() => window.location.reload()}
                        >
                            Cancelar
                        </button>
                        <button className="okButton" type="submit">
                            Registrar
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default RegistrarHorario;