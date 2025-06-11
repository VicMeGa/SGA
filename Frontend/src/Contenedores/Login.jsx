import { useState } from "react";
import user from "../recursos/user.png";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const logeo = async (e) => {
        e.preventDefault();
    
        try {
            const response = await fetch("http://localhost:8080/sga/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    correo: email,
                    contrasena: password,
                }),
            });
    
            const data = await response.json();
    
            if (data.exito) {
                alert("✅ Éxito: " + data.mensaje);
                navigate("/next");
            } else {
                alert("❌ Error: " + data.mensaje);
            }
        } catch (err) {
            alert("⚠️ Error en la conexión con el servidor: " + err.message);
        }
    };    

    function testeo (){
        navigate("/next")
    }

    return (
        <div className="login">
            <form className="formulario" onSubmit={logeo}>
                <img className="icon-login" src={user} width="25%" alt="User Icon" />
                <br />
                <input
                    type="email"
                    placeholder="Correo"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
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
                {/*<h3 onClick={()=>navigate("/RegistrarCuenta")} style={{ cursor: "pointer" }}>Registrar Cuenta</h3>*/}
            </form>
        </div>
    );
};

export default Login;