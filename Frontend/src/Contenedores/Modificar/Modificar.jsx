import { useState } from 'react'
import Cabeza from '../Cabeza'
import Nav from '../Nav'
import DivIzquierdo from './divIzquierdo'
import DivDerecho from  './divDerecho'
function Modificar() {
  const [searchQuery, setSearchQuery] = useState('');
  const [students, setStudents] = useState([
  { matricula: '001', nombre: 'Juan Pérez', apellidoPaterno: 'Pérez', apellidoMaterno: 'García', semestre: '3', grupo: 'A', programaEducativo: 'Ingeniería' }
]);
  const [selectedStudent, setSelectedStudent] = useState(null);

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
    <div className='divmod' >
        {/* Espacio derecho */}
        <div className='busquedatab'>
            <DivDerecho />
        </div>
        {/* Espacio izquierdo */}
        <div className='datostab'>
          <DivIzquierdo />
        </div>
    </div>
    </>
  )
}

export default Modificar
