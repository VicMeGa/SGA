import Cabeza from "../../Cabeza";
import Nav from "../../Nav";
import { useState } from "react";

const NewArticulo = () => {
    const [tipo, setTipo] = useState("");
    const [nombre, setNombre] = useState("");
    const [noSerie, setNoSerie] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [imagenFile, setImagenFile] = useState(null);

    const tiposArticulos = [
        { value: 'Proyector', label: 'Proyector' },
        { value: 'Micrófono', label: 'Micrófono' },
        { value: 'Grabadora', label: 'Grabadora' },
        { value: 'Laptop', label: 'Laptop' },
        { value: 'Bocina', label: 'Bocina' },
        { value: 'Cable', label: 'Cable' },
        { value: 'Convertidor', label: 'Convertidor' }
    ];

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevenir recarga

        const formData = new FormData();
        formData.append("datos", new Blob([JSON.stringify({
            tipoArticulo: tipo,
            nombre: nombre,
            numeroArticulo: noSerie,
            descripcion: descripcion,
        })], { type: 'application/json' }));
        formData.append("imagen", imagenFile);

        const response = await fetch("http://localhost:8080/sga/registro/articulo", {
            method: "POST",
            body: formData,
        });

        if (response.ok) {
            alert("Artículo registrado");
        } else {
            alert("Error al registrar artículo");
        }
    };



    return (
        <>
            <Cabeza />
            <Nav />
            <div className="regisArMain">
                <br />
                <h1>Registrar Artículo</h1>
                <form className="formArti" onSubmit={handleSubmit} encType="multipart/form-data">
                    <select value={tipo} onChange={(e) => setTipo(e.target.value)}>
                        <option value="" disabled>Selecciona un tipo de artículo</option>
                        {tiposArticulos.map((tipo) => (
                            <option key={tipo.value} value={tipo.value}>{tipo.label}</option>
                        ))}
                    </select>
                    <input type="text" placeholder="Nombre del artículo" value={nombre} onChange={(e) => setNombre(e.target.value)} />
                    <input type="text" placeholder="Número de serie" value={noSerie} onChange={(e) => setNoSerie(e.target.value)} />
                    <input type="text" placeholder="Descripción" value={descripcion} onChange={(e) => setDescripcion(e.target.value)} />
                    <input type="file" name="file" onChange={(e) => setImagenFile(e.target.files[0])} />

                    <div className="botonesArt">
                        <button className="CanButton" type="button" onClick={() => {
                            // Reset
                            setTipo("");
                            setNombre("");
                            setNoSerie("");
                            setDescripcion("");
                            setFoto("");
                        }}>Cancelar</button>
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
