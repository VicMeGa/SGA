import Cabeza from '../Cabeza'
import { useState } from "react"
import Nav from '../Nav'
import MenuReg from './MenuReg'

function RegAdminis (){
    const [nombre,setNombre] = useState("");
    const [ap,setAP] = useState("");
    const [am,setAM] = useState("");
    const [noempleado,setNoempleado] = useState("");
    const [correo,setCorreo] = useState("");
    const [cargo,setCargo] = useState("");
    const [telefono,setTelefono] = useState("");
    const [area,setArea] = useState("");
    return (
        <>
        <Nav />
        <MenuReg />
        <Cabeza />
        <div className="div-registro">
            <form className='regis'>
                <input
                        type='text'
                        placeholder='Nombre'
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        />
                <input
                        type='text'
                        placeholder='Apellido Paterno'
                        value={ap}
                        onChange={(e) => setAP(e.target.value)}
                        />
                <input
                        type='text'
                        placeholder='Apellido Materno'
                        value={am}
                        onChange={(e) => setAM(e.target.value)}
                        />
                 <input
                        type='int'
                        placeholder='Numero de empleado (Matricula)'
                        value={noempleado}
                        onChange={(e) => setNoempleado(e.target.value)}
                        />
                <input
                        type='email'
                        placeholder='Correo Electronico'
                        value={correo}
                        onChange={(e) => setCorreo(e.target.value)}
                        />
                <input
                        type='text'
                        placeholder='Cargo'
                        value={cargo}
                        onChange={(e) => setCargo(e.target.value)}
                        />
                <input
                        type='int'
                        placeholder='Telefono'
                        value={telefono}
                        onChange={(e) => setTelefono(e.target.value)}
                        />
                <input
                        type='int'
                        placeholder='Area'
                        value={area}
                        onChange={(e) => setArea(e.target.value)}
                        />
                        <br />
                <button className="cancelButton" type="submit">Cancelar</button>
                <button className="okButton" type="submit">Registrar</button>
            </form>
        </div>
        </>
    );
}

export default RegAdminis;