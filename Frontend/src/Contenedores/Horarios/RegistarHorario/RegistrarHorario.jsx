import { useState, useEffect } from "react";
import Cabeza from "../../Cabeza";
import Nav from "../../Nav";
import * as Yup from "yup";
import { toast } from "react-toastify";

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

    const [errores, setErrores] = useState({});

    const dias = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"];
    const horas = [
        "08:00", "09:00", "10:00", "11:00", "12:00",
        "13:00", "14:00", "15:00", "16:00", "17:00",
        "18:00", "19:00", "20:00"
    ];

    const back = import.meta.env.VITE_BACKEND_URL;

    const esquemaValidacion = Yup.object().shape({
        nombreSala: Yup.string().required("La sala es obligatoria"),
        materia: Yup.string()
            .required("La materia es obligatoria")
            .min(2, "Debe tener al menos 2 caracteres")
            .matches(/^([A-Z][a-z]+)(\s[A-Z][a-z]+)*$/, "Las primeras letras deben ser mayúsculas, solo se admiten letras"),
        dia: Yup.string().required("El día es obligatorio"),
        horaInicio: Yup.string().required("La hora de inicio es obligatoria"),
        horaFin: Yup.string().required("La hora de fin es obligatoria"),
        numeroEmpleado: Yup.string()
            .required("El número de empleado es obligatorio")
            .matches(/^\d{6}$/, "Debe tener 6 dígitos"),
        grupo: Yup.string()
            .required("El grupo es obligatorio")
            .matches(/^[ABC]$/, "Solo hay grupos A, B o C"),
        semestre: Yup.string()
            .required("El semestre es obligatorio")
            .matches(/^\d{1}$/, "Debe tener 1 dígito"),
    });

    useEffect(() => {
        const obtenerSalas = async () => {
            setLoad(true);
            setErr(null);
            try {
                const resp = await fetch(`${back}/buscar/salas`);
                if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
                const data = await resp.json();
                setSalas(data);
            } catch (err) {
                console.error("Error salas:", err);
                setErr("No se pudieron cargar las salas");
                toast.error("❌ No se pudieron cargar las salas", {
                    closeButton: false,
                });
            } finally {
                setLoad(false);
            }
        };
        obtenerSalas();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const salaSeleccionada = salas.find(s => s.idSala === parseInt(sala));

        const datos = {
            materia,
            dia,
            horaInicio,
            horaFin,
            nombreSala: salaSeleccionada?.nombreSala || "",
            numeroEmpleado,
            grupo,
            semestre
        };

        try {
            await esquemaValidacion.validate(datos, { abortEarly: false });
            setErrores({});

            const body = {
                materia,
                dia,
                horaInicio,
                horaFin,
                nombreSala: salaSeleccionada?.nombreSala || "",
                numeroEmpleado,
                grupo,
                semestre
            };

            const resp = await fetch(`${back}/registro/horario`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            });

            if (!resp.ok) {
                throw new Error(`Error al registrar horario (HTTP ${resp.status})`);
            }

            toast.success("✅ Horario registrado correctamente", {
                closeButton: false,
            });

            // Limpiar formulario
            setMateria("");
            setDia("");
            setInicio("");
            setFin("");
            setSala("");
            setEmpleado("");
            setGrupo("");
            setSemestre("");
        } catch (err) {
            if (err.name === "ValidationError") {
                const nuevoErrores = {};
                err.inner.forEach((e) => {
                    nuevoErrores[e.path] = e.message;
                });
                setErrores(nuevoErrores);
            } else {
                console.error("Error al registrar horario:", err);
                toast.error("❌ Error al registrar el horario", {
                    closeButton: false,
                });
            }
        }
    };

    return (
        <>
            <Cabeza />
            <Nav />
            <div className="divRegistrarHorario">
                <h1>Registrar Horario</h1>
                <form onSubmit={handleSubmit}>
                    <div className="regiSon">
                        {/* Sala */}
                        <select
                            value={sala}
                            onChange={(e) => setSala(e.target.value)}
                            disabled={loadingSalas || salas.length === 0}
                        >
                            <option value="">Selecciona una sala</option>
                            {salas.map((s) => (
                                <option key={s.idSala} value={s.idSala}>{s.nombreSala}</option>
                            ))}
                        </select>
                        {errores.sala && <span className="error">{errores.sala}</span>}

                        {/* Materia */}
                        <input
                            type="text"
                            placeholder="Nombre de la materia"
                            value={materia}
                            onChange={(e) => setMateria(e.target.value)}
                        />
                        {errores.materia && <span className="error">{errores.materia}</span>}

                        {/* Día */}
                        <select value={dia} onChange={(e) => setDia(e.target.value)}>
                            <option value="">Selecciona un día</option>
                            {dias.map((d) => (
                                <option key={d} value={d}>{d}</option>
                            ))}
                        </select>
                        {errores.dia && <span className="error">{errores.dia}</span>}

                        {/* Hora inicio */}
                        <select value={horaInicio} onChange={(e) => setInicio(e.target.value)}>
                            <option value="">Hora de inicio</option>
                            {horas.map((h) => (
                                <option key={h} value={h}>{h}</option>
                            ))}
                        </select>
                        {errores.horaInicio && <span className="error">{errores.horaInicio}</span>}

                        {/* Hora fin */}
                        <select value={horaFin} onChange={(e) => setFin(e.target.value)}>
                            <option value="">Hora de fin</option>
                            {horas.map((h) => (
                                <option key={h} value={h}>{h}</option>
                            ))}
                        </select>
                        {errores.horaFin && <span className="error">{errores.horaFin}</span>}

                        {/* Número de empleado */}
                        <input
                            type="text"
                            placeholder="Número de empleado"
                            value={numeroEmpleado}
                            onChange={(e) => setEmpleado(e.target.value)}
                        />
                        {errores.numeroEmpleado && <span className="error">{errores.numeroEmpleado}</span>}

                        {/* Grupo */}
                        <input
                            type="text"
                            placeholder="Grupo (ej. A, B)"
                            value={grupo}
                            onChange={(e) => setGrupo(e.target.value)}
                        />
                        {errores.grupo && <span className="error">{errores.grupo}</span>}

                        {/* Semestre */}
                        <input
                            type="text"
                            placeholder="Semestre (ej. 5, 6)"
                            value={semestre}
                            onChange={(e) => setSemestre(e.target.value)}
                        />
                        {errores.semestre && <span className="error">{errores.semestre}</span>}
                    </div>

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
