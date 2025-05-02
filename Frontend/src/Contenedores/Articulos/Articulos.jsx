import Cabeza from '../Cabeza';
import Nav from '../Nav';
import { useEffect, useState } from 'react';
import ItemList from './ItemList';

const Articulos = () => {
    const [items, setItems] = useState([]);

     // Simulación de datos desde la base de datos
  useEffect(() => {
    const fetchItems = async () => {
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
          image: "https://images.gamebanana.com/img/ss/mods/6706dcb04b57a.jpg",
        },
        {
          id: 4,
          name: "Bocina_02",
          description: "Descripción de la bocina 02",
          status: "Disponible",
          image: "https://images.gamebanana.com/img/ss/mods/6706dcb04b57a.jpg",
        },
      ];
      setItems(data);
    };

    fetchItems();
  }, []);

    return (
        <>
        <Cabeza />
        <Nav />
        <div className="ArticulosContenedor">
            <ItemList items={items}/>
        </div>
        </>
    );
}

export default Articulos;