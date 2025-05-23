import Cabeza from "../../Cabeza"
import Nav from "../../Nav"
import { useState } from "react";

const RegistrarHorario =()=>{
    const [Materia, setMateria] = useState("");
    const [HoraInicio, setHoraInicio] = useState("");
    const [HoraFin, setHoraFin] = useState("");
    const [Dia, setDia] = useState("");
    const Days =[
        "Lunes","Martes","Miercoles","Jueves","Viernes"
     ];
     const salas =[
        "Sala A",
        "Sala B",
        "Sala C"
     ];
     const [Sala, setSala] = useState("");
     const hours = [
    "8:00",
    "9:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
    "19:00",
    "20:00"
  ];
    return (
        <>
        <Cabeza />
        <Nav />
        <div className="divRegistrarHorario">
            <h1>Registrar Horario</h1>
            <form>
            <select value={Sala} onChange={(e) => setSala(e.target.value)} >
                    <option value="" disabled>Selecciona una sala</option>
                    {salas.map((sala) => (
                        <option key={sala} value={sala}>
                            {sala}
                        </option>
                    ))}
                </select>
            <input type='text' placeholder='Nombre de la Materia' value={Materia} onChange={(e) => setMateria(e.target.value)} required />
             <select value={Dia} onChange={(e) => setDia(e.target.value)} >
                    <option value="" disabled>Selecciona un dia</option>
                    {Days.map((sala) => (
                        <option key={sala} value={sala}>
                            {sala}
                        </option>
                    ))}
            </select>
            <select value={HoraInicio} onChange={(e) => setHoraInicio(e.target.value)} >
                    <option value="" disabled>Selecciona Hora de Inicio</option>
                    {hours.map((sala) => (
                        <option key={sala} value={sala}>
                            {sala}
                        </option>
                    ))}
            </select>
            <select value={HoraFin} onChange={(e) => setHoraFin(e.target.value)} >
                    <option value="" disabled>Selecciona Hora de Fin</option>
                    {hours.map((sala) => (
                        <option key={sala} value={sala}>
                            {sala}
                        </option>
                    ))}
            </select>
            <div className="botonesre">
                <button className="cancelButton" type="button" onClick={() => window.location.reload()}>Cancelar</button>
                <button className="okButton" type="submit">Registrar</button>
            </div>
            </form>
        </div>
        </>
    )
}

export default RegistrarHorario;