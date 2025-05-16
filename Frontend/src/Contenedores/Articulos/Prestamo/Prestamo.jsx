import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Nav from '../../Nav';
import Cabeza from '../../Cabeza';
import DivIzquierdo from './DIvIzquierdo';
import DivDerecho from './DivDerecho';

const Prestamo = () => {
    const { itemId } = useParams();
    const [item, setItem] = useState(null);

    // Simula la carga de datos desde la base de datos
    useEffect(() => {
        const fetchItem = async () => {
            try {
                const response = await fetch(`http://localhost:8080/sga/buscar/articulos/${itemId}`);
                if (response.ok) {
                    const data = await response.json();
                    const formattedItem = {
                        id: data.id,
                        name: data.nombre,
                        description: data.descripcion,
                        status: data.estado,
                        image: `http://localhost:8080${data.urlFotografia}` // Asegúrate de que `urlFotografia` esté bien
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
                    {/* Espacio derecho */}
                    <div className='itemDatos'>
                        <DivIzquierdo
                            key={item.id}
                            image={item.image}
                            name={item.name}
                            description={item.description}
                            status={item.status}
                        />
                    </div>
                    {/* Espacio izquierdo */}
                    <div className='itemPrestamo'>
                        <DivDerecho />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Prestamo;