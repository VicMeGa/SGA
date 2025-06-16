// Prestamo.jsx
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Nav from '../../Nav';
import Cabeza from '../../Cabeza';
import DivIzquierdo from './DIvIzquierdo';
import DivDerecho from './DivDerecho';

const Prestamo = () => {
    const { itemId } = useParams();
    const [item, setItem] = useState(null);

    const back = import.meta.env.VITE_BACKEND_URL;

    // Simula la carga de datos desde la base de datos
    useEffect(() => {
        const fetchItem = async () => {
            try {
                const response = await fetch(`${back}/buscar/articulos/${itemId}`);
                if (response.ok) {
                    const data = await response.json();
                    const formattedItem = {
                        id: data.id,
                        name: data.nombre,
                        description: data.descripcion,
                        status: data.estaPrestado === 0 ? "Disponible" : "Ocupado",
                        image: `${back}/buscar/articulo/${data.idArticulo}/imagen?${Date.now()}`
                    };
                    setItem(formattedItem);
                } else {
                    console.error("Artículo no encontrado");
                }
            } catch (error) {
                console.error("Error de red:", error);
            }
        };
        fetchItem();
    }, [itemId]);

    if (!item) {
        return <p>Cargando...</p>;
    }

    return (
        <>
            <Cabeza />
            <Nav />
            <div className="presMain">
                <div className='contenedor' >
                    {/* Espacio izquierdo */}
                    <div className='itemDatos'>
                        <DivIzquierdo
                            key={item.id}
                            image={item.image}
                            name={item.name}
                            description={item.description}
                            status={item.status}
                        />
                    </div>
                    {/* Espacio derecho */}
                    <DivDerecho
                        itemId={parseInt(itemId)}
                        status={item.status}
                    />
                </div>
            </div>
        </>
    );
};

export default Prestamo;