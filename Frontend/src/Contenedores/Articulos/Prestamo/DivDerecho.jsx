import { useState } from "react"

const DivDerecho =()=>{

    const [nombre,setNombre] = useState("");
    const [numeroEm,setNE] = useState("");
    const [fecha,setFe] = useState("");
    return(
        <>
        <h1>Prestamo</h1>
        <input
            type='text'
            placeholder='Nombre Administrativo'
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
        />
        <input
            type='text'
            placeholder='Numero de empleado'
            value={numeroEm}
            onChange={(e) => setNE(e.target.value)}
        />
        <input
            type='text'
            placeholder='Fecha'
            value={fecha}
            onChange={(e) => setFe(e.target.value)}
        />
        <br />
        <br />

        <button className="okButton" type="submit">Pedir Prestamo</button>
        <br />
        <br />
        </>
    );
};

export default DivDerecho;