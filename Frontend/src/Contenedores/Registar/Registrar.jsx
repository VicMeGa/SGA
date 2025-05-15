import Cabeza from '../Cabeza'
import { useState } from "react"
import Nav from '../Nav'
import MenuReg from './MenuReg'

function Registrar() {
    const [nombre, setNombre] = useState("");
    const [apellidoPaterno, setApellidoPaterno] = useState("");
    const [apellidoMaterno, setApellidoMaterno] = useState("");
    const [matricula, setMatricula] = useState("");
    const [correo, setCorreo] = useState("");
    const [numeroTelefono, setNumeroTelefono] = useState("");
    const [semestre, setSemestre] = useState("");
    const [grupo, setGrupo] = useState("");
    const [programaEducativo, setProgramaEducativo] = useState("");
    const [id_horario, setIdHorario] = useState("");

    const opciones = [
        { value: 'Licenciatura en Ingeniería Mecánica', label: 'Licenciatura en Ingeniería Mecánica' },
        { value: 'Licenciatura en Ingeniería en Computación', label: 'Licenciatura en Ingeniería en Computación' },
        { value: 'Licenciatura en Matemáticas Aplicadas', label: 'Licenciatura en Matemáticas Aplicadas' },
        { value: 'Licenciatura en Ingeniería Química', label: 'Licenciatura en Ingeniería Química' },
        { value: 'Licenciatura en Química Industrial', label: 'Licenciatura en Química Industrial' },
        { value: 'Ingeniería en Sistemas Electrónicos', label: 'Ingeniería en Sistemas Electrónicos' },
        { value: 'Licenciatura en Ingeniería en Inteligencia Artificial', label: 'Licenciatura en Ingeniería en Inteligencia Artificial' },
    ];

    const handleSubmit = async (e) => {
        e.preventDefault();

        const datos = {
            nombre,
            apellido_paterno: apellidoPaterno,
            apellido_materno: apellidoMaterno,
            correo,
            numeroTelefono,
            matricula,
            semestre,
            grupo,
            programaEducativo,
            id_horario
        };

        try {
            const res = await fetch("http://localhost:8080/sga/registro/alumno", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(datos)
            });

            const mensaje = await res.text();
            alert(mensaje);
        } catch (error) {
            console.error("Error al registrar alumno:", error);
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
                        <input type='text' placeholder='Matricula' value={matricula} onChange={(e) => setMatricula(e.target.value)} required />
                        <input type='email' placeholder='Correo Electrónico' value={correo} onChange={(e) => setCorreo(e.target.value)} required />
                        <input type='text' placeholder='Grupo' value={grupo} onChange={(e) => setGrupo(e.target.value)} />
                        <input type='text' placeholder='Teléfono' value={numeroTelefono} onChange={(e) => setNumeroTelefono(e.target.value)} />
                        <input type='text' placeholder='Semestre' value={semestre} onChange={(e) => setSemestre(e.target.value)} />

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

                        <input type='text' placeholder='Id Horario' value={id_horario} onChange={(e) => setIdHorario(e.target.value)} />
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

export default Registrar;