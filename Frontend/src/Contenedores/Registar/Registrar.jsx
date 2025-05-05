import Cabeza from '../Cabeza'
import { useState } from "react"
import Nav from '../Nav'
import MenuReg from './MenuReg'

function Registrar (){
    const [nombre,setNombre] = useState("");
    const [ap,setAP] = useState("");
    const [am,setAM] = useState("");
    const [matricula,setMatricula] = useState("");
    const [pe,setPE] = useState("");
    const [semestre,setSemestre] = useState("");
    const [grupo,setGrupo] = useState("");
    return(
        <>
        <Nav />
        <MenuReg />
        <Cabeza />
        <div className="div-registro">
            <form className='formas'>
                <div className='regis'>
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
                                placeholder='Matricula'
                                value={matricula}
                                onChange={(e) => setMatricula(e.target.value)}
                                />
                        <input
                                type='text'
                                placeholder='Programa Educativo'
                                value={pe}
                                onChange={(e) => setPE(e.target.value)}
                                />
                        <input
                                type='text'
                                placeholder='Semestre'
                                value={semestre}
                                onChange={(e) => setSemestre(e.target.value)}
                                />
                        <input
                                type='text'
                                placeholder='Grupo'
                                value={grupo}
                                onChange={(e) => setGrupo(e.target.value)}
                                />
                                <br />
                </div>
                <div className='botonesArt'>
                        <button className="cancelButton" type="submit">Cancelar</button>
                        <button className="okButton" type="submit">Registrar</button>
                </div>
                <br/>
            </form>
        </div>
        </>
    );
}

export default Registrar;