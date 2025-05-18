import Cabeza from "../../Cabeza";
import Nav from "../../Nav";
import {useState} from "react"; 
import monitor from "../../../../public/monitor.png"

const RegistrarSala = () => {
    const [NombreS, setNombreS] = useState("");
    const [Responsable, setResponsable] = useState("");
    const [NoEquipos, setNoEquipos] = useState("");
    const [CapcidadMax, setCapacidadMax] = useState("");
    return (
        <>
        <Cabeza />
        <Nav />
        <div className="divReSa">
            <br />
            <h1>Registrar Sala</h1>
            <form >
                <div className="unoinput">
                    <input type="text" placeholder="Nombre de sala" value={NombreS} onChange={(e)=>setNombreS(e.target.value)} required/>
                    <input type="text" placeholder="Responsable" value={Responsable} onChange={(e)=>setResponsable(e.target.value)} required/>
                </div>
                <div className="dowInput">
                    <input type="text" placeholder="Numero de equipos" value={NoEquipos} onChange={(e)=>setNoEquipos(e.target.value)} required/>
                    <input type="text" placeholder="Capacidad maxima" value={CapcidadMax} onChange={(e)=>setCapacidadMax(e.target.value)} required/>
                </div>
                <br />
                <img src={monitor} />
                <div className="botonesreS">
                    <button className="cancelButtonS" type="button" onClick={() => window.location.reload()}>Cancelar</button>
                    <button className="okButtonS" type="submit">Registrar</button>
                </div>
            </form>
        </div>
        </>
    );
};

export default RegistrarSala;