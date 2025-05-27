import { useState } from "react";
import Cabeza from "../../Cabeza";
import Nav from "../../Nav";
import Tabla from "./Tabla";

const ControlAsistencias =()=>{
    const salas =[
        "Sala A",
        "Sala B",
        "Sala C"
     ];
    const Materias = ["Algebra Superior 6B", "Sistemas Operativos 3A", "Programación Orientada a Objetos 2B"];

    const [Sala, setSala] = useState("");
    const [Materiaa, setMateriaa] = useState("");
    
    const [Profesor, setProfesor] =useState("");
    const [Materia, setMateria] =useState("");
    const [Grupo, setGrupo] =useState("");
    const [Carrera, setCarrera] =useState("");
    
    return(
        <>
        <Cabeza />
        <Nav />
        <div className="controlMain">
            <div className="upControl" >
            <select value={Sala} onChange={(e) => setSala(e.target.value)} >
                    <option value="" disabled>Selecciona una sala</option>
                    {salas.map((sala) => (
                        <option key={sala} value={sala}>
                            {sala}
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
            <button>
                Aceptar
            </button>
            </div>
            <div className="controlTab" >
                <Tabla />
            </div>
            <div className="downControl" >
                <input type='text' placeholder='Profesor:' value={Profesor} readOnly/>
                <input type='text' placeholder='Materia:' value={Materia}   readOnly/>
                <input type='text' placeholder='Grupo:' value={Grupo}       readOnly/>
                <input type='text' placeholder='Carrera:' value={Carrera}   readOnly/>
            </div>
        </div>
        </>
    );
};

export default ControlAsistencias ;