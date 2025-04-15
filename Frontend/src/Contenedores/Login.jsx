import { useState } from "react"
import user from "../recursos/user.png"
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const logeo = (e) => {
        e.preventDefault();
            if (email === "correo@gmail.com" && password === "123"){
                alert("Exito");
                navigate("/next");
            }else{
            alert("Error: " + e.message);
        }
    };


    return (
        <>  
            <div className='login'>
                <form className="formulario" onSubmit={logeo}>
                    <img className='icon-login' src={user} width="25%" />
                <br/>
                <input
                    type='email'
                    placeholder='Correo'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    />
                <br />
                <input
                    type="password"
                    placeholder="Contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <br />
                <button type="submit">Iniciar Sesión</button>
                </form>
            </div>
        </>
    );
};
export default Login;