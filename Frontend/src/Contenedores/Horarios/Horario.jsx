import Cabeza from "../Cabeza"
import Nav from "../Nav"
import Tabla from './Tabla'

const Horario =()=>{

    
    return (
        <>
        <Cabeza />
        <Nav />
        <div className="divHorario">
            <div className="divTabla">
                <Tabla />
            </div>
        </div>
        </>
    );
};

export default Horario;