import Cabeza from '../Cabeza';
import { useState } from "react";
import Nav from '../Nav';
import MenuReg from './MenuReg';

function RegAdminis() {
    const [nombre, setNombre] = useState("");
    const [apellidoPaterno, setApellidoPaterno] = useState("");
    const [apellidoMaterno, setApellidoMaterno] = useState("");
    const [numeroEmpleado, setNumeroEmpleado] = useState("");
    const [correo, setCorreo] = useState("");
    const [cargo, setCargo] = useState("");
    const [numeroTelefono, setNumeroTelefono] = useState("");
    const [contrasena, setContrasena] = useState("");
    const [programaEducativo, setProgramaEducativo] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        const datos = {
            nombre,
            apellido_paterno: apellidoPaterno,
            apellido_materno: apellidoMaterno,
            correo,
            numeroTelefono,
            numeroEmpleado,
            contrasena,
            cargo,
            programaEducativo
        };

        try {
            const res = await fetch("http://localhost:8080/sga/registro/administrativo", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(datos)
            });

            const mensaje = await res.text();
            alert(mensaje);
        } catch (error) {
            console.error("Error al registrar administrativo:", error);
            alert("Ocurrió un error al registrar");
        }
    };

    return (
        <>
            <Nav />
            <MenuReg />
            <Cabeza />
            <div className="div-registro">
                <form className='formas' onSubmit={handleSubmit}>
                    <div className='regis'>
                        <input type='text' placeholder='Nombre' value={nombre} onChange={(e) => setNombre(e.target.value)} required />
                        <input type='text' placeholder='Apellido Paterno' value={apellidoPaterno} onChange={(e) => setApellidoPaterno(e.target.value)} required />
                        <input type='text' placeholder='Apellido Materno' value={apellidoMaterno} onChange={(e) => setApellidoMaterno(e.target.value)} required />
                        <input type='text' placeholder='Número de empleado' value={numeroEmpleado} onChange={(e) => setNumeroEmpleado(e.target.value)} required />
                        <input type='email' placeholder='Correo Electrónico' value={correo} onChange={(e) => setCorreo(e.target.value)} required />
                        <input type='text' placeholder='Cargo' value={cargo} onChange={(e) => setCargo(e.target.value)} />
                        <input type='text' placeholder='Teléfono' value={numeroTelefono} onChange={(e) => setNumeroTelefono(e.target.value)} />
                        <input type='text' placeholder='Programa Educativo' value={programaEducativo} onChange={(e) => setProgramaEducativo(e.target.value)} />
                        <input type='password' placeholder='Contraseña' value={contrasena} onChange={(e) => setContrasena(e.target.value)} required />
                    </div>

                    <div className="botonesre">
                        <button className="cancelButton" type="button" onClick={() => window.location.reload()}>Cancelar</button>
                        <button className="okButton" type="submit">Registrar</button>
                    </div>
                </form>
            </div>
        </>
    );
}

export default RegAdminis;
