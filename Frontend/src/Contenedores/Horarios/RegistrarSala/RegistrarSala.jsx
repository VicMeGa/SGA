import Cabeza from "../../Cabeza";
import Nav from "../../Nav";
import { useState } from "react";
import { MonitorCog } from 'lucide-react';

function RegSala() {
    const [NombreS, setNombreS] = useState("");
    const [NoEquipos, setNoEquipos] = useState("");
    const [CapcidadMax, setCapacidadMax] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        const datos = {
            nombreSala: NombreS,
            capacidadSala: parseInt(CapcidadMax),
            numeroEquipos: parseInt(NoEquipos),
        };

        try {
            const res = await fetch("http://localhost:8080/sga/registro/sala", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(datos)
            });

            const mensaje = await res.text();
            alert(mensaje);
        } catch (error) {
            console.error("Error al registrar sala:", error);
            alert("Ocurrió un error al registrar");
        }
    };

    return (
        <>
            <Cabeza />
            <Nav />
            <div className="divReSa">
                <br />
                <h1>Registrar Sala</h1>
                <form className='formas' onSubmit={handleSubmit}>
                    <div className="unoinput">
                        <input type="text" placeholder="Nombre de sala" value={NombreS} onChange={(e) => setNombreS(e.target.value)} required />
                    </div>
                    <div className="dowInput">
                        <input type="text" placeholder="Numero de equipos" value={NoEquipos} onChange={(e) => setNoEquipos(e.target.value)} required />
                        <input type="text" placeholder="Capacidad maxima" value={CapcidadMax} onChange={(e) => setCapacidadMax(e.target.value)} required />
                    </div>
                    <br />
                    <MonitorCog size={100} />
                    <div className="botonesreS">
                        <button className="cancelButtonS" type="button" onClick={() => window.location.reload()}>Cancelar</button>
                        <button className="okButton" type="submit">Registrar</button>
                    </div>
                </form>
            </div>
        </>
    );
}

export default RegSala;