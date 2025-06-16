import Cabeza from "../../Cabeza";
import Nav from "../../Nav";
import { useState } from "react";
import { MonitorCog } from 'lucide-react';
import * as Yup from "yup";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function RegSala() {
    const [NombreS, setNombreS] = useState("");
    const [NoEquipos, setNoEquipos] = useState("");
    const [CapcidadMax, setCapacidadMax] = useState("");


    const back = import.meta.env.VITE_BACKEND_URL;

    const [errores, setErrores] = useState({});

    const esquemaValidacion = Yup.object().shape({
        NombreS: Yup.string().required("El nombre es obligatorio").min(2, "Debe tener al menos 2 caracteres")
            .matches(/^([A-Z][a-z]+)(\s[A-Z][a-z]*)*$/, "Las primeras letras deben ser mayúsculas, solo se admiten letras"),
        NoEquipos: Yup.string().required("El número de equipos es obligatorio")
            .matches(/^\d+$/, "Solo deben ser números"),
        CapcidadMax: Yup.string()
            .matches(/^\d+$/, "Deben ser dígitos")
            .required("Campo requerido"),
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        const datoss = { NombreS, CapcidadMax, NoEquipos };

        try {
            await esquemaValidacion.validate(datoss, { abortEarly: false });
            setErrores({});

            const datos = {
                nombreSala: NombreS,
                capacidadSala: parseInt(CapcidadMax),
                numeroEquipos: parseInt(NoEquipos),
            };

            const res = await fetch(`${back}/registro/sala`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(datos)
            });

            if (!res.ok) throw new Error(`Error HTTP ${res.status}`);

            const mensaje = await res.text();
            toast.success(`${mensaje}`, {
                closeButton: false,
            });
            setNombreS("");
            setNoEquipos("");
            setCapacidadMax("");
        } catch (error) {
            if (error.name === "ValidationError") {
                const nuevoErrores = {};
                error.inner.forEach((err) => {
                    nuevoErrores[err.path] = err.message;
                });
                setErrores(nuevoErrores);
            } else {
                console.error("Error al registrar sala:", error);
                toast.error("Ocurrió un error al registrar la sala", {
                    closeButton: false,
                });
            }
        }
    };

    return (
        <>
            <Cabeza />
            <Nav />
            <ToastContainer />
            <div className="divReSa">
                <br />
                <h1>Registrar Sala</h1>
                <form className='formas' onSubmit={handleSubmit}>
                    <div className="unoinput">
                        <input
                            type="text"
                            placeholder="Nombre de sala"
                            value={NombreS}
                            onChange={(e) => setNombreS(e.target.value)}
                        />
                        <br />{errores.NombreS && <span className="error">{errores.NombreS}</span>}
                    </div>
                    <div className="dowInput">
                        <input
                            type="text"
                            placeholder="Número de equipos"
                            value={NoEquipos}
                            onChange={(e) => setNoEquipos(e.target.value)}
                        />
                        <input
                            type="text"
                            placeholder="Capacidad máxima"
                            value={CapcidadMax}
                            onChange={(e) => setCapacidadMax(e.target.value)}
                        />
                    </div>
                    <div className="dowInput">
                        {errores.NoEquipos && <span className="error">{errores.NoEquipos}</span>}
                        {errores.CapcidadMax && <span className="error">{errores.CapcidadMax}</span>}
                    </div>
                    <br />
                    <MonitorCog size={100} />
                    <div className="botonesreS">
                        <button className="cancelButtonS" type="button" onClick={() => window.location.reload()}>
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
}

export default RegSala;
