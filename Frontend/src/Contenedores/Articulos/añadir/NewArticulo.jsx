import Cabeza from "../../Cabeza";
import Nav from "../../Nav";
import { useState } from "react";

import * as Yup from "yup";

const NewArticulo = () => {
    const [tipo, setTipo] = useState("");
    const [nombre, setNombre] = useState("");
    const [noSerie, setNoSerie] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [imagenFile, setImagenFile] = useState(null);
    const [errores, setErrores] = useState({});

    const tiposArticulos = [
        { value: 'Proyector', label: 'Proyector' },
        { value: 'Micrófono', label: 'Micrófono' },
        { value: 'Grabadora', label: 'Grabadora' },
        { value: 'Laptop', label: 'Laptop' },
        { value: 'Bocina', label: 'Bocina' },
        { value: 'Cable', label: 'Cable' },
        { value: 'Convertidor', label: 'Convertidor' }
    ];

    const esquemaValidacion = Yup.object().shape({
            nombre: Yup.string().required("El nombre es obligatorio").min(2, "Debe tener al menos 2 caracteres"),
            noSerie: Yup.string().required("El numero de serie es obligatorio"),
            descripcion: Yup.string().required("La descripción es obligatoria"),
            imagenFile: Yup.string().required("La imagen es obligatoria"),
            tipo: Yup.string().required("El tipo es obligatorio"),
        });

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

        const datoss = {
            nombre,
            noSerie,
            descripcion,
            imagenFile,
            tipo,
        }

        try {
            await esquemaValidacion.validate(datoss, { abortEarly: false });
            setErrores({}); 

             const response = await fetch("http://localhost:8080/sga/registro/articulo", {
            method: "POST",
            body: formData,
             });
            if (response.ok) {
                alert("Artículo registrado");
            }

            setNombre("");
            setTipo("");
            setDescripcion("");
            setImagenFile("");
            setNoSerie("");
        }catch(error){
            if (error.name === "ValidationError") {
                const nuevoErrores = {};
                error.inner.forEach((err) => {
                    nuevoErrores[err.path] = err.message;
                });
                setErrores(nuevoErrores);
            } else {
                console.error("Error al registrar invitado:", error);
                alert("Error al registrar artículo");
            }
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
                    <div className="regiSon">
                        <select value={tipo} onChange={(e) => setTipo(e.target.value)}>
                        <option value="" disabled>Selecciona un tipo de artículo</option>
                            {tiposArticulos.map((tipo) => (
                                <option key={tipo.value} value={tipo.value}>{tipo.label}</option>
                            ))}
                        </select>
                        {errores.tipo && <span className="error">{errores.tipo}</span>}
                        <br></br>
                        <input type="text" placeholder="Nombre del artículo" value={nombre} onChange={(e) => setNombre(e.target.value)} />
                        {errores.nombre && <span className="error">{errores.nombre}</span>}
                        <input type="text" placeholder="Número de serie" value={noSerie} onChange={(e) => setNoSerie(e.target.value)} />
                        {errores.noSerie && <span className="error">{errores.noSerie}</span>}
                        <input type="text" placeholder="Descripción" value={descripcion} onChange={(e) => setDescripcion(e.target.value)} />
                        {errores.descripcion && <span className="error">{errores.descripcion}</span>}
                        <input type="file" name="file" onChange={(e) => setImagenFile(e.target.files[0])} />
                        {errores.imagenFile && <span className="error">{errores.imagenFile}</span>}
                    </div>
                    <div className="botonesArt">
                        <button className="CanButton" type="button" onClick={() => {
                            // Reset
                            setTipo("");
                            setNombre("");
                            setNoSerie("");
                            setDescripcion("");
                            setImagenFile("");
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
