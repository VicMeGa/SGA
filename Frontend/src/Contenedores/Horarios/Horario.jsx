import Cabeza from "../Cabeza"
import Nav from "../Nav"
import Tabla from './Tabla'
import { useNavigate } from 'react-router-dom';

const Horario =()=>{
    const navigate = useNavigate();
    
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
                <button type="button" onClick={() => navigate('/RegistrarSala')}>Registrar Sala</button>
                <button type="button">Apartar</button>
            </div>
        </div>
        </>
    );
};

export default Horario;