import Cabeza from '../Cabeza'
import { useState } from "react"
import Nav from '../Nav'
import MenuReg from './MenuReg'
import Notificaciones from '../Notificacioness/notificaciones';


function RegInvitado (){
    const [nombre, setNombre] = useState("");
    const [apellidoPaterno, setApellidoPaterno] = useState("");
    const [apellidoMaterno, setApellidoMaterno] = useState("");
    const [correo, setCorreo] = useState("");
    const [numeroTelefono, setNumeroTelefono] = useState("");

    const [notificacion, setNotificaciones] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const datos = {
            nombre,
            apellido_paterno: apellidoPaterno,
            apellido_materno: apellidoMaterno,
            correo,
            numeroTelefono,
        };

        try {
            const res = await fetch("http://localhost:8080/sga/registro/invitado", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(datos)
            });

            const mensaje = await res.text();
            setNotificaciones({mensaje,tipo:"exito"});
            
            setNombre("");
            setApellidoPaterno("");
            setApellidoMaterno("");
            setCorreo("");
            setNumeroTelefono("");

        } catch (error) {
            console.error("Error al registrar invitado:", error);
            setNotificaciones({mensaje:"Error al registrar invitado", tipo:"error"});
        }
        setTimeout(() => setNotificaciones(null), 6000);
    };

    return (
        <>
            <Nav />
            <MenuReg />
            <Cabeza />
            <div className="div-registro">
                <h1>Registrar Invitado</h1>
                <form className='formas' onSubmit={handleSubmit}>
                    <div className='regis'>
                        <input type='text' placeholder='Nombre' value={nombre} onChange={(e) => setNombre(e.target.value)} required />
                        <input type='text' placeholder='Apellido Paterno' value={apellidoPaterno} onChange={(e) => setApellidoPaterno(e.target.value)} required />
                        <input type='text' placeholder='Apellido Materno' value={apellidoMaterno} onChange={(e) => setApellidoMaterno(e.target.value)} required />
                        <input type='email' placeholder='Correo Electrónico' value={correo} onChange={(e) => setCorreo(e.target.value)} required />
                        <input type='text' placeholder='Teléfono' value={numeroTelefono} onChange={(e) => setNumeroTelefono(e.target.value)} />
                    </div>

                    <div className="botonesre">
                        <button className="cancelButton" type="button" onClick={() => window.location.reload()}>Cancelar</button>
                        <button className="okButton" type="submit">Registrar</button>
                    </div>
                </form>
            </div>
            {notificacion && (
                <Notificaciones
                    mensaje={notificacion.mensaje}
                    tipo={notificacion.tipo}
                    onClose={() => setNotificaciones(null)}
                />
            )}
        </>
    );
}

export default RegInvitado;