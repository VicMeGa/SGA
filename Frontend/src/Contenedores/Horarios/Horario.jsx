import Cabeza from "../Cabeza"
import Nav from "../Nav"
import Tabla from './Tabla'

const Horario =()=>{

    
    return (
        <>
        <Cabeza />
        <Nav />
        <div className="divHorario">
            <div className="botonesHorario">
                <button type="button" >Sala A</button>
          <button type="button" >Sala B</button>
          <button type="button" >Sala C</button>
            </div>
            <div className="divTabla">
                <Tabla />
            </div>
            <div className="botonesHorarioB">
                <button type="button" >Registrar Sala</button>
                <button type="button">Apartar</button>
            </div>
        </div>
        </>
    );
};

export default Horario;