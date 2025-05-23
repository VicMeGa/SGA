import { useState } from "react";
import Cabeza from "../Cabeza"
import Nav from "../Nav"
import Tabla from './Tabla'
import { useNavigate } from 'react-router-dom';
import RegistrarH from "./RegistrarH";

const Horario =()=>{
    const navigate = useNavigate();
    const salas =[
        "Sala A",
        "Sala B",
        "Sala C"
     ];
    const [Sala, setSala] = useState("");

    return (
        <>
        <Cabeza />
        <Nav />
        <RegistrarH />
        <div className="divHorario">
            <div className="botonesHorario">
                <select value={Sala} onChange={(e) => setSala(e.target.value)} >
                    <option value="" disabled>Selecciona una sala</option>
                    {salas.map((sala) => (
                        <option key={sala} value={sala}>
                            {sala}
                        </option>
                    ))}
                </select>
                <button type="button" >Aceptar</button>
            </div>
            <div className="divTabla">
                <Tabla />
            </div>
            <div className="botonesHorarioB">
                <button type="button" onClick={() => navigate('/RegistrarSala')}>Registrar Sala</button>
                <button type="button" onClick={() => navigate('/ControlAsistencias')}>Control Asistencias</button>
                <button type="button">Apartar</button>
            </div>
        </div>
        </>
    );
};

export default Horario;