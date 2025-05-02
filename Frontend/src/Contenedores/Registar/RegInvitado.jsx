import Cabeza from '../Cabeza'
import { useState } from "react"
import Nav from '../Nav'
import MenuReg from './MenuReg'

function RegInvitado (){
    const [nombre,setNombre] = useState("");
    const [ap,setAP] = useState("");
    const [am,setAM] = useState("");
    const [telefono, setTelefono] = useState("");
    const [correo,setCorreo] = useState("");

    return(
        <>
        <Nav />
        <MenuReg />
        <Cabeza />
        <div className="div-registro">
            <form className='formas'>
                <div className="regis">
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
                            placeholder='Telefono'
                            value={telefono}
                            onChange={(e) => setTelefono(e.target.value)}
                            />
                    <input
                            type='text'
                            placeholder='Correo Electronico'
                            value={correo}
                            onChange={(e) => setCorreo(e.target.value)}
                            />
                            <br />
                </div>
                <div className="botonesre">
                    <button className="cancelButton" type="submit">Cancelar</button>
                    <button className="okButton" type="submit">Registrar</button>
                </div>
                <br />
            </form>
        </div>
        </>
    );
}

export default RegInvitado;