import { Link } from 'react-router-dom';

function Regresar (){
    return(
        <>
        <div className="buRegresar">
            <Link to="/next">
                <span className="REgresar" >Regresar</span>
            </Link>
        </div>
        </>
    );
}

export default Regresar;