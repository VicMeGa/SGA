import { useState } from "react";
import user from "../recursos/user.png";
import { useNavigate } from "react-router-dom";

import useSession  from "../hook/useSession";

import useSession from "../hook/useSession";
import { toast } from "react-toastify";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const { saveSession } = useSession();
  
    const back = import.meta.env.VITE_BACKEND_URL;
  
    const logeo = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`${back}/login`, {
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
            saveSession(data.numeroEmpleado);

            if (data.exito) {
                toast.success("✅ " + data.mensaje);
                navigate("/next");
            } else {
                toast.error("❌ " + data.mensaje);
            }
        } catch (err) {
            toast.warning("⚠️ Error en la conexión con el servidor: " + err.message);
        }
    };

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
            </form>
        </div>
    );
};

export default Login;