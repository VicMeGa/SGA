import Cabeza from '../Cabeza'
import { useState } from "react"
import Nav from '../Nav'
import MenuReg from './MenuReg'
import Notificaciones from '../Notificacioness/Notificaciones';
import * as Yup from "yup";


function RegInvitado (){
    const [nombre, setNombre] = useState("");
    const [apellidoPaterno, setApellidoPaterno] = useState("");
    const [apellidoMaterno, setApellidoMaterno] = useState("");
    const [correo, setCorreo] = useState("");
    const [numeroTelefono, setNumeroTelefono] = useState("");
    const [notificacion, setNotificaciones] = useState(null);
    const [errores, setErrores] = useState({});

    const back = import.meta.env.VITE_BACKEND_URL;

    const esquemaValidacion = Yup.object().shape({
        nombre: Yup.string().required("El nombre es obligatorio").min(2, "Debe tener al menos 2 caracteres")
            .matches(/^([A-ZÁÉÍÓÚÑ][a-záéíóúñ]+)(\s[A-ZÁÉÍÓÚ][a-záéíóúñ]+)*$/,"Las primeras letras deben ser mayusculas, solo se admiten letras"),
        apellidoPaterno: Yup.string().required("El apellido paterno es obligatorio")
            .matches(/^([A-ZÁÉÍÓÚÑ][a-záéíóúñ]+)(\s[A-ZÁÉÍÓÚ][a-záéíóúñ]+)*$/,"Las primeras letras deben ser mayusculas, solo se admiten letras"),
        apellidoMaterno: Yup.string().required("El apellido materno es obligatorio")
            .matches(/^([A-ZÁÉÍÓÚÑ][a-záéíóúñ]+)(\s[A-ZÁÉÍÓÚ][a-záéíóúñ]+)*$/,"Las primeras letras deben ser mayusculas, solo se admiten letras"),
        correo: Yup.string().required("El correo es obligatorio").email("Debe ser un correo válido"),
        numeroTelefono: Yup.string()
            .matches(/^\d{10}$/, "Debe tener 10 dígitos")
            .notRequired(),
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        const datoss = {
            nombre,
            apellidoPaterno,
            apellidoMaterno,
            correo,
            numeroTelefono,
        };

        try {

            // Validar antes de enviar
            await esquemaValidacion.validate(datoss, { abortEarly: false });
            setErrores({}); // Limpiar errores si la validación pasa
            const datos = {
                nombre,
                apellido_paterno: apellidoPaterno,
                apellido_materno: apellidoMaterno,
                correo,
                numeroTelefono,
            };

            const res = await fetch(`${back}/registro/invitado`, {
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
            if (error.name === "ValidationError") {
                const nuevoErrores = {};
                error.inner.forEach((err) => {
                    nuevoErrores[err.path] = err.message;
                });
                setErrores(nuevoErrores);
            } else {
                console.error("Error al registrar invitado:", error);
                setNotificaciones({ mensaje: "Error al registrar invitado", tipo: "error" });
            }
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
                        <div className='regiSon'>
                            <input type='text' placeholder='Nombre' value={nombre} onChange={(e) => setNombre(e.target.value)}  />
                        {errores.nombre && <span className="error">{errores.nombre}</span>}
                        <input type='text' placeholder='Apellido Paterno' value={apellidoPaterno} onChange={(e) => setApellidoPaterno(e.target.value)}  />
                        {errores.apellidoPaterno && <span className="error">{errores.apellidoPaterno}</span>}
                        <input type='text' placeholder='Apellido Materno' value={apellidoMaterno} onChange={(e) => setApellidoMaterno(e.target.value)}  />
                        {errores.apellidoMaterno && <span className="error">{errores.apellidoMaterno}</span>}
                        <input type='text' placeholder='Correo Electrónico' value={correo} onChange={(e) => setCorreo(e.target.value)}  />
                        {errores.correo && <span className="error">{errores.correo}</span>}
                        <input type='text' placeholder='Teléfono' value={numeroTelefono} onChange={(e) => setNumeroTelefono(e.target.value)} />
                        {errores.numeroTelefono && <span className="error">{errores.numeroTelefono}</span>}
                        </div>
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
                    duracion={6000}
                />
            )}
        </>
    );
}

export default RegInvitado;