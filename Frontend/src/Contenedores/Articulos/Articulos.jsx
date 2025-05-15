import Cabeza from '../Cabeza';
import Nav from '../Nav';
import { useEffect, useState } from 'react';
import ItemList from './ItemList';
import { useNavigate } from 'react-router-dom';
import RegisArti from './RegisArti'

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
          image: "http://localhost:8080/uploads/be6ceb2f-1d56-463b-8e80-366411f3bb34_Proyector1.jpg"
        },
        {
          id: 3,
          name: "Bocina_01",
          description: "Descripción de la bocina 01",
          status: "Ocupado",
          image: "http://localhost:8080/uploads/f63a52f7-9b38-4183-9287-6b0a1e54272c_bocina1.jpg",
        },
        {
          id: 4,
          name: "Bocina_02",
          description: "Descripción de la bocina 02",
          status: "Disponible",
          image: "https://images6.alphacoders.com/138/1386707.png",
        },
      ];
      setItems(data);
    };

    fetchItems();
  }, []);

    const navigate = useNavigate();
    
    const handleSelectItem = (id) => {
      console.log(`Seleccionaste el ítem con ID: ${id}`); // Depurar el clic
      navigate(`/prestamo/${id}`); // Redirige a la pantalla de préstamo
    };

    return (
        <>
        <Cabeza />
        <Nav />
        <RegisArti />
        <div className="ArticulosContenedor">
            <ItemList items={items} onSelect={handleSelectItem}/>
        </div>
        </>
    );
}

export default Articulos;