import { useState } from "react";
import user from "../recursos/user.png";
import { useNavigate } from "react-router-dom";

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
                saveSession(data.numeroEmpleado)
                navigate("/next");
            } else {
                toast.error("❌ " + data.mensaje);
            }
        } catch (err) {
            toast.warning("⚠️ Error en la conexión con el servidor: " + err.message);
        }
    };

    return (
        <div className="login" data-testid="login-container">
            <form className="formulario" onSubmit={logeo} data-testid="login-form">
                <img className="icon-login" src={user} width="25%" alt="User Icon" />
                <br />
                <input
                    id="email"
                    type="email"
                    placeholder="Correo"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    data-testid="email-input"
                />
                <br />
                <input
                    id="password"
                    type="password"
                    placeholder="Contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    data-testid="password-input"
                />
                <br />
                <button type="submit" id="btn-login" data-testid="login-button">Iniciar Sesión</button>
            </form>
        </div>
    );
};

export default Login;