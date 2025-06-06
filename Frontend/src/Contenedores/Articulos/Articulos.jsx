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
      try {
        const response = await fetch("http://localhost:8080/sga/buscar/articulos");
        if (response.ok) {
          const data = await response.json();

          // Mapea los datos al formato esperado
          const formattedItems = data.map((articulo) => ({
            id: articulo.idArticulo,
            name: articulo.nombre,
            description: articulo.descripcion,
            status: articulo.estaPrestado === 0 ? "Disponible" : "Ocupado",
            image: `http://localhost:8080/sga/buscar/articulo/${articulo.idArticulo}/imagen?${Date.now()}`
          }));
          setItems(formattedItems);
        } else {
          console.error("Error al obtener los artículos");
        }
      } catch (error) {
        console.error("Error de red:", error);
      }
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
        <ItemList items={items} onSelect={handleSelectItem} />
      </div>
    </>
  );
}

export default Articulos;