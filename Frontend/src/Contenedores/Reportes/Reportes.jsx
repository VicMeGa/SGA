import { useState } from "react";
import Cabeza from "../Cabeza";
import Nav from "../Nav";
import Reporte from "./Reporte";

const Reportes =()=>{
    const [Criterio,setCriterio] = useState("");
    const criterios =[
        "Fecha",
        "Materia",
        "Alguna otra chingada"
     ];


    return (
        <>
        <Cabeza />
        <Nav />
        <div className="divReportes">
            <div className="upRepor">
                <select value={Criterio} onChange={(e) => setCriterio(e.target.value)} >
                    <option value="" disabled>Criterios</option>
                    {criterios.map((criterioo) => (
                        <option key={criterioo} value={criterioo}>
                            {criterioo}
                        </option>
                    ))}
                </select>

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