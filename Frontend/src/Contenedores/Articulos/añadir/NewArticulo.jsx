import Cabeza from "../../Cabeza";
import Nav from "../../Nav";
import { useState } from "react";

const NewArticulo = () => {
    const [tipo, setTipo] = useState("");
    const [nombre, setNombre] = useState("");
    const [noSerie, setNoSerie] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [foto, setFoto] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Aquí puedes validar los datos si quieres

        const data = {
            nombre: nombre,
            numeroArticulo: noSerie,
            descripcion: descripcion,
            urlFotografia: foto
            // El tipo puede ir también si lo aceptas en el backend
            // tipoArticulo: tipo 
        };

        try {
            const response = await fetch("http://localhost:8080/sga/registro/articulo", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                alert("Artículo registrado exitosamente");
                // Limpia el formulario
                setTipo("");
                setNombre("");
                setNoSerie("");
                setDescripcion("");
                setFoto("");
            } else {
                const errorData = await response.json();
                console.error("Error:", errorData);
                alert("Error al registrar artículo");
            }
        } catch (error) {
            console.error("Error en la solicitud:", error);
            alert("Error de conexión al servidor");
        }
    };

    return (
        <>
            <Cabeza />
            <Nav />
            <div className="regisArMain">
                <br />
                <h1>Registrar Artículo</h1>
                <form className="formArti" onSubmit={handleSubmit}>
                    <input type="text" placeholder="Tipo artículo" value={tipo} onChange={(e) => setTipo(e.target.value)} />
                    <input type="text" placeholder="Nombre del artículo" value={nombre} onChange={(e) => setNombre(e.target.value)}/>
                    <input type="text" placeholder="Número de serie" value={noSerie} onChange={(e) => setNoSerie(e.target.value)}/>
                    <input type="text" placeholder="Descripción" value={descripcion} onChange={(e) => setDescripcion(e.target.value)}/>
                    <input type="text" placeholder="URL de la fotografía" value={foto} onChange={(e) => setFoto(e.target.value)}/>
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
