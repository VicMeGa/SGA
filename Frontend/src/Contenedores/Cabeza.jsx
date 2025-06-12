import { useNavigate } from "react-router-dom";
import vantus from "../recursos/vantus.png"
import useSession from "../hook/useSession";

function Cabeza (){
    const navigate = useNavigate();
    const {session} = useSession();
    return(
        <>
        <header className='arriba'>
            <img className="logo" src={vantus}  alt="Logo de Vantus"  onClick={() => navigate("/next")}
                style={{ cursor: "pointer" }}
        />
        <h1>{session.token}</h1>
        </header>
        <br/>
        <br />
        </>
    );
}

export default Cabeza;