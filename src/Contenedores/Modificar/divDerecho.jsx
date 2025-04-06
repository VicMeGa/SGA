import React, { useState } from 'react';
import { Search } from 'lucide-react';

const divDerecho = () => {
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
        <div className='busqueda'>
            <input type="text" placeholder ="Buscar" 
            className="inputBuscar" value={searchQuery} onChange={handleSearch} />
            <Search className = "iconBuscar" />
        </div>
        <div className="tabladiv">
            <table className="tabla">
                <thead>
                    <tr className="trr">
                        <th className="tht" >Matricula</th>
                        <th className="tht" >Nombre</th>
                    </tr>
                </thead>
                <tbody>
                {students.map((student) => (
                  <tr 
                    key={student.matricula}
                    onClick={() => handleSelectStudent(student)}
                    className="keyey"
                  >
                    <td className="tdd">{student.matricula}</td>
                    <td className="tdd">{student.nombre}</td>
                  </tr>
                ))}
                </tbody>
            </table>
        </div>
        </>
    );
}

export default divDerecho;