import { useState } from "react";
import Cabeza from "../Cabeza";
import Nav from "../Nav";
import Reporte from "./Reporte";

const Reportes =()=>{
    const [FechaInicio, setFechaInicio] = useState("");
    const [FechaFin, setFechaFin] = useState("");


    return (
        <>
        <Cabeza />
        <Nav />
        <div className="divReportes">
            <div className="upRepor">
                <label>Fecha Inicio</label>
                <input type='date' placeholder='Fecha Inicio' value={FechaInicio} onChange={(e) => setFechaInicio(e.target.value)} required />
                <label>Fecha Fin</label>
                <input type='date' placeholder='Fecha Fin' value={FechaFin} onChange={(e) => setFechaFin(e.target.value)} required />
                <button type="button" >Generar Reporte</button>
                <button type="button" >Exportar Reporte</button>
            </div>
            <div className="reportee">
                <Reporte />
            </div>
        </div>
        </>
    );
};

export default Reportes;