import { useState } from "react";
import user from '../../recursos/addUser.png';
import { useNavigate } from "react-router-dom";

const RegistrarCuenta =()=>{
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmarPassword, setConfirmarPassword] = useState("");
    const navigate = useNavigate();

    return (
        <>
        <div className="signin">
                    <form className="formulario" >
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
                            type="text"
                            placeholder="Contraseña"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <br />
                        <input
                            type="password"
                            placeholder="Confirmar Contraseña"
                            value={confirmarPassword}
                            onChange={(e) => setConfirmarPassword(e.target.value)}
                            required
                        />
                        <br />
                        <button type="submit">Crear Cuenta</button>
                    </form>
                </div>
        </>
    )
}

export default RegistrarCuenta;