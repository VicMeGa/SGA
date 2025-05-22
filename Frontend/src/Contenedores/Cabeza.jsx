import { useNavigate } from "react-router-dom";
import vantus from "../recursos/vantus.png"

function Cabeza (){
    const navigate = useNavigate();

    return(
        <>
        <header className='arriba'>
            <img className="logo" src={vantus}  alt="Logo de Vantus"  onClick={() => navigate("/next")}
                style={{ cursor: "pointer" }}
/>
        </header>
        <br/>
        <br />
        </>
    );
}

export default Cabeza;