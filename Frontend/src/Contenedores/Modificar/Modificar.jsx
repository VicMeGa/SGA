import { useState, useEffect } from 'react';
import Cabeza from '../Cabeza';
import Nav from '../Nav';
import DivIzquierdo from './divIzquierdo';
import DivDerecho from './divDerecho';

function Modificar() {
  const [searchQuery, setSearchQuery] = useState('');
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);

  // Cargar los primeros 5 usuarios al cargar el componente
  useEffect(() => {
    const fetchInitialUsers = async () => {
      try {
        const res = await fetch('http://localhost:8080/sga/buscar/usuarios5?limit=5'); // Ajusta el endpoint si es necesario
        const data = await res.json();
        if (Array.isArray(data)) {
          setStudents(data);
        } else {
          setStudents([]);
        }
      } catch (error) {
        console.error('Error al obtener los usuarios iniciales:', error);
        setStudents([]);
      }
    };

    fetchInitialUsers();
  }, []);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSelectStudent = (student) => {
    setSelectedStudent(student);
  };

  return (
    <>
      <Cabeza />
      <Nav />
      <div className='divmod'>
        {/* Espacio derecho */}
        <div className='busquedatab'>
          <DivDerecho
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            students={students}
            setStudents={setStudents}
            setSelectedStudent={setSelectedStudent}
          />
        </div>

        {/* Espacio izquierdo */}
        <div className='datostab'>
          <DivIzquierdo selectedStudent={selectedStudent} />
        </div>
      </div>
    </>
  );
}

export default Modificar;
