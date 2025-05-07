import React from 'react';

const DivIzquierdo = ({ selectedStudent }) => {
  if (!selectedStudent) {
    return <p>Selecciona un usuario para ver sus datos.</p>;
  }

  return (
    <div className="divIzquierdo">
      <form>
        <h3>Datos del Usuario</h3>
        <input type="text" readOnly value={selectedStudent.nombre || ''} placeholder="Nombre" />
        <input type="text" readOnly value={selectedStudent.apellidoPaterno || ''} placeholder="Apellido Paterno" />
        <input type="text" readOnly value={selectedStudent.apellidoMaterno || ''} placeholder="Apellido Materno" />
        <input type="text" readOnly value={selectedStudent.correo || ''} placeholder="Correo" />
        <input type="text" readOnly value={selectedStudent.numero_telefono || ''} placeholder="Número Teléfono" />
        <input type="text" readOnly value={selectedStudent.programa_educativo || ''} placeholder="Programa Educativo" />

        {selectedStudent.matricula && (
          <>
            <input type="text" readOnly value={selectedStudent.matricula} placeholder="Matrícula" />
            <input type="text" readOnly value={selectedStudent.semestre} placeholder="Semestre" />
            <input type="text" readOnly value={selectedStudent.grupo} placeholder="Grupo" />
            <input type="text" readOnly value={selectedStudent.id_horario} placeholder="ID Horario" />
          </>
        )}

        {selectedStudent.numeroEmpleado && (
          <>
            <input type="text" readOnly value={selectedStudent.numeroEmpleado} placeholder="N° Empleado" />
            <input type="text" readOnly value={selectedStudent.cargo} placeholder="Cargo" />
            <input type="text" readOnly value={selectedStudent.area} placeholder="Área" />
            <input type="password" readOnly value={selectedStudent.password} placeholder="Contraseña" />
          </>
        )}
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
    </div>
  );
};

export default DivIzquierdo;
