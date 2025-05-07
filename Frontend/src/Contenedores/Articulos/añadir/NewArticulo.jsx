import Cabeza from "../../Cabeza";
import Nav from "../../Nav";
import { useState } from "react"

const NewArticulo =()=> {
    const [tipo, setTipo] = useState("");
    const [nombre, setNombre] =("");
    const [noSerie, setNoSerie] = ("");
    const [descripcion, setDescripcion] = ("");
    const [foto, setFoto] = ("");

    return (
        <>
        <Cabeza />
        <Nav />
        <div className="regisArMain">
            <br/>
            <h1>Registrar Articulo</h1>
            <form className="formArti">
                <input
                    type='text'
                    placeholder='Tipo articulo'
                    value={tipo}
                    onChange={(e) => setTipo(e.target.value)}
                />
                <input
                    type='text'
                    placeholder='Nombre del articulo'
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                />
                <input
                    type='text'
                    placeholder='Numero de serie'
                    value={noSerie}
                    onChange={(e) => setNoSerie(e.target.value)}
                />
                <input
                    type='text'
                    placeholder='Descripción'
                    value={descripcion}
                    onChange={(e) => setDescripcion(e.target.value)}
                />
                <input
                    type='text'
                    placeholder='Foto'
                    value={foto}
                    onChange={(e) => setFoto(e.target.value)}
                />
                <div className='botonesArt'>
                        <button className="CanButton" type="submit">Cancelar</button>
                        <button className="regisButton" type="submit">Registrar</button>
                </div>
                <br />
            <br />
            </form>
        </div>
        </>
    );
};

export default NewArticulo;