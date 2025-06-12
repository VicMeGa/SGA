import useSession from '../../hook/useSession';

function Logout (){
    const {clearSession} = useSession();
    const handleLogout = () => {
        clearSession();
        window.location.reload();
    };
    return(
        <>
        <div className="buRegresar">
            <button className="REgresar" onClick={handleLogout}>Cerrar sesión</button>
        </div>
        </>
    );
}

export default Logout;