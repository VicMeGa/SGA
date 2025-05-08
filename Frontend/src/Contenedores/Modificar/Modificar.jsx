import { useState, useEffect } from 'react';
import Cabeza from '../Cabeza';
import Nav from '../Nav';
import DivIzquierdo from './divIzquierdo';
import DivDerecho from './divDerecho';

function Modificar() {
  const [searchQuery, setSearchQuery] = useState('');
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);

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
