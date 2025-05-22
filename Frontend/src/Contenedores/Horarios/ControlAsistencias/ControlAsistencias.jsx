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
     const days = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"];
     const hours = [
    "8:00 - 9:00",
    "9:00 - 10:00",
    "10:00 - 11:00",
    "11:00 - 12:00",
    "12:00 - 13:00",
    "13:00 - 14:00",
    "14:00 - 15:00",
    "15:00 - 16:00",
    "16:00 - 17:00",
    "17:00 - 18:00",
    "18:00 - 19:00",
    "19:00 - 20:00",
  ];
  const [Sala, setSala] = useState("");
  const [Dia, setDia] = useState("");
  const [Hora, setHora] = useState("");
  
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

            <select value={Dia} onChange={(e) => setDia(e.target.value)} >
                    <option value="" disabled>Selecciona un d&iacute;a</option>
                    {days.map((day) => (
                        <option key={day} value={day}>
                            {day}
                        </option>
                    ))}
            </select>
            <select value={Hora} onChange={(e) => setHora(e.target.value)} >
                    <option value="" disabled>Selecciona una hora</option>
                    {hours.map((hour) => (
                        <option key={hour} value={hour}>
                            {hour}
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
                <input type='text' placeholder='Profesor:' value={Profesor} />
                <input type='text' placeholder='Materia:' value={Materia} />
                <input type='text' placeholder='Grupo:' value={Grupo} />
                <input type='text' placeholder='Carrera:' value={Carrera} />
            </div>
        </div>
        </>
    );
};

export default ControlAsistencias ;