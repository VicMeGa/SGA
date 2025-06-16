import Cabeza from '../Cabeza';
import { useState } from "react";
import Nav from '../Nav';
import MenuReg from './MenuReg';
import Notificaciones from '../Notificacioness/Notificaciones';
import * as Yup from "yup";

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

    const [notificacion, setNotificaciones] = useState(null);
    const [errores, setErrores] = useState({});

    const back = import.meta.env.VITE_BACKEND_URL;

    const opciones = [
        { value: 'Licenciatura en Ingeniería Mecánica', label: 'Licenciatura en Ingeniería Mecánica' },
        { value: 'Licenciatura en Ingeniería en Computación', label: 'Licenciatura en Ingeniería en Computación' },
        { value: 'Licenciatura en Matemáticas Aplicadas', label: 'Licenciatura en Matemáticas Aplicadas' },
        { value: 'Licenciatura en Ingeniería Química', label: 'Licenciatura en Ingeniería Química' },
        { value: 'Licenciatura en Química Industrial', label: 'Licenciatura en Química Industrial' },
        { value: 'Ingeniería en Sistemas Electrónicos', label: 'Ingeniería en Sistemas Electrónicos' },
        { value: 'Licenciatura en Ingeniería en Inteligencia Artificial', label: 'Licenciatura en Ingeniería en Inteligencia Artificial' },
    ];

    const esquemaValidacion = Yup.object().shape({
        nombre: Yup.string().required("El nombre es obligatorio").min(2, "Debe tener al menos 2 caracteres")
            .matches(/^([A-ZÁÉÍÓÚÑ][a-záéíóúñ]+)(\s[A-ZÁÉÍÓÚ][a-záéíóúñ]+)*$/,"Las primeras letras deben ser mayusculas, solo se admiten letras"),
        apellidoPaterno: Yup.string().required("El apellido paterno es obligatorio")
            .matches(/^([A-ZÁÉÍÓÚÑ][a-záéíóúñ]+)(\s[A-ZÁÉÍÓÚ][a-záéíóúñ]+)*$/,"Las primeras letras deben ser mayusculas, solo se admiten letras"),
        apellidoMaterno: Yup.string().required("El apellido materno es obligatorio")
            .matches(/^([A-ZÁÉÍÓÚÑ][a-záéíóúñ]+)(\s[A-ZÁÉÍÓÚ][a-záéíóúñ]+)*$/,"Las primeras letras deben ser mayusculas, solo se admiten letras"),
        numeroEmpleado : Yup.string().required("El numero de empleado es obligatoria")
            .matches(/^\d{6}$/, "Debe tener 6 dígitos"),
        correo: Yup.string().required("El correo es obligatorio").email("Debe ser un correo válido"),
        cargo: Yup.string().required("El cargo es requerido"),
        grupo: Yup.string().required("El grupo es obligario").matches(/^[ABC]$/, "Solo hay grupos A, B o C"),
        programaEducativo: Yup.string().required("El programa educativo es obligatorio"),
        contrasena: Yup.string().required("La contraseña es obligatoria"),
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
            numeroEmpleado,
            contrasena,
            cargo,
            programaEducativo
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
                numeroEmpleado,
                contrasena,
                cargo,
                programaEducativo
            };

            const res = await fetch(`${back}/registro/administrativo`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(datos)
            });

            const mensaje = await res.text();
            setNotificaciones({ mensaje, tipo: "exito" });
            setNombre("");
            setApellidoPaterno("");
            setApellidoMaterno("");
            setNumeroEmpleado("");
            setCorreo("");
            setCargo("");
            setNumeroTelefono("");
            setContrasena("");
            setProgramaEducativo("");
        } catch (error) {
            if (error.name === "ValidationError") {
                const nuevoErrores = {};
                error.inner.forEach((err) => {
                    nuevoErrores[err.path] = err.message;
                });
                setErrores(nuevoErrores);
            } else {
                console.error("Error al registrar administrativo:", error);
                setNotificaciones({ mensaje: "Error al registrar administrativo", tipo: "error" });
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
                <h1>Registrar Administrativo</h1>
                <form className='formas' onSubmit={handleSubmit}>
                    <div className='regis'>
                        <div className='regiSon'>
                            <input type='text' placeholder='Nombre' value={nombre} onChange={(e) => setNombre(e.target.value)}  />
                            {errores.nombre && <span className="error">{errores.nombre}</span>}
                            <input type='text' placeholder='Apellido Paterno' value={apellidoPaterno} onChange={(e) => setApellidoPaterno(e.target.value)}  />
                            {errores.apellidoPaterno && <span className="error">{errores.apellidoPaterno}</span>}
                            <input type='text' placeholder='Apellido Materno' value={apellidoMaterno} onChange={(e) => setApellidoMaterno(e.target.value)}  />
                            {errores.apellidoMaterno && <span className="error">{errores.apellidoMaterno}</span>}
                            <input type='text' placeholder='Número de empleado' value={numeroEmpleado} onChange={(e) => setNumeroEmpleado(e.target.value)}  />
                            {errores.numeroEmpleado && <span className="error">{errores.numeroEmpleado}</span>}
                            <input type='email' placeholder='Correo Electrónico' value={correo} onChange={(e) => setCorreo(e.target.value)}  />
                            {errores.correo && <span className="error">{errores.correo}</span>}
                            <input type='text' placeholder='Cargo' value={cargo} onChange={(e) => setCargo(e.target.value)} />
                            {errores.cargo && <span className="error">{errores.cargo}</span>}
                            <input type='text' placeholder='Teléfono' value={numeroTelefono} onChange={(e) => setNumeroTelefono(e.target.value)} />
                            {errores.numeroTelefono && <span className="error">{errores.numeroTelefono}</span>}
                            <select
                                value={programaEducativo}
                                onChange={(e) => setProgramaEducativo(e.target.value)}
                            >
                                <option value="" disabled>Selecciona un programa educativo</option>
                                {opciones.map((opcion) => (
                                    <option key={opcion.value} value={opcion.value}>
                                        {opcion.label}
                                    </option>
                                ))}
                            </select>
                            {errores.programaEducativo && <span className="error">{errores.programaEducativo}</span>}
                            <input type='password' placeholder='Contraseña' value={contrasena} onChange={(e) => setContrasena(e.target.value)}  />
                            {errores.contrasena && <span className="error">{errores.contrasena}</span>}
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
                />
            )}	
        </>
    );
}

export default RegAdminis;
