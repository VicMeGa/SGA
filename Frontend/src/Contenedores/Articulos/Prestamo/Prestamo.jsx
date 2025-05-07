import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Nav from '../../Nav';
import Cabeza from '../../Cabeza';
import DivIzquierdo from './DIvIzquierdo';
import DivDerecho from './DivDerecho';

const Prestamo =()=> {
    const { itemId } = useParams();
    const [item, setItem] = useState(null);

    // Simula la carga de datos desde la base de datos
  useEffect(() => {
    const fetchItem = async () => {
        const data = [
            {
            id: 1,
            name: "Proyector_01",
            description: "Descripción del proyector 01",
            status: "Disponible",
            image: '../../public/test2.jpg',
            },
            {
            id: 2,
            name: "Proyector_02",
            description: "Descripción del proyector 02",
            status: "Ocupado",
            image: "https://images.gamebanana.com/img/ss/mods/6706dcb04b57a.jpg",
            },
            {
            id: 3,
            name: "Bocina_01",
            description: "Descripción de la bocina 01",
            status: "Ocupado",
            image: "https://www.pockettactics.com/wp-content/sites/pockettactics/2024/06/genshin-impact-memes-header.jpeg",
            },
            {
            id: 4,
            name: "Bocina_02",
            description: "Descripción de la bocina 02",
            status: "Disponible",
            image: "https://images6.alphacoders.com/138/1386707.png",
            },
        ];
        const selectedItem = data.find((i) => i.id === parseInt(itemId));
        setItem(selectedItem);
        };

        fetchItem();
    }, [itemId]);

    if (!item) {
        return <p>Cargando...</p>;
    }


    return(
        <>
        <Cabeza />
        <Nav />
        <div className="presMain">
            <div className='contenedor' >
                {/* Espacio derecho */}
                <div className='itemDatos'>
                <DivIzquierdo 
                    key = {item.id}
                    image = {item.image}
                    name = {item.name}
                    description = {item.description}
                    status = {item.status}
                />
                </div>
                {/* Espacio izquierdo */}
                <div className='itemPrestamo'>
                    <DivDerecho/>
                </div>
            </div>
        </div>
        </>
    );
};

export default Prestamo;