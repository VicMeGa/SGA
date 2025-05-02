import React, { useState } from 'react';

const divIzquierdo = () => {
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

    return(
        <>
        <form className="formMod">
            <div>
                <input 
                    type="text"
                    className='imputnorm'
                    placeholder="Nombre"
                    value={selectedStudent?.nombre || ''}
                    readOnly 
                />
            </div>
            <div>
                <input
                    type="text"
                    className='imputnorm'
                    placeholder="Apellido Paterno"  
                    value={selectedStudent?.apellidoPaterno || ''}
                    readOnly
                />
            </div>
            <div>
                <input
                    type="text"
                    className='imputnorm'
                    placeholder="Apellido Materno"
                    value={selectedStudent?.apellidoMaterno || ''}
                    readOnly
                />
            </div>
            <div>
                <input 
                    type="text"
                    className='imputnorm'
                    placeholder="Matricula"
                    value={selectedStudent?.matricula || ''}
                    readOnly
                />
            </div>
            <div className='demesgrup'>
                <div className='div2mod'>
                <input
                    type="text"
                    className='twoinput'
                    placeholder="Semestre"
                    value={selectedStudent?.semestre || ''}
                    readOnly
                />
                </div>
                <div className='div2mod'>
                <input
                    type="text"
                    className='twoinput'
                    placeholder="Grupo"
                    value={selectedStudent?.grupo || ''}
                    readOnly
                />
                </div>
            </div>
            <div>
            <input
                    type="text"
                    className='imputnorm'
                    placeholder="Programa Educativo"
                    value={selectedStudent?.programaEducativo || ''}
                    readOnly
                />
            </div>
            <div className="botonesMod"> 
                <button
                    type="button"
                    className='borrarButton'
                    >Eliminar</button>
                <button 
                    type="button"
                    className='cancelButton2'
                    >Cancelar</button>
                <button 
                    type="button"
                    className='modButton'
                    >Modificar</button>
            </div>

        </form>
        </>
    );
}

export default divIzquierdo;