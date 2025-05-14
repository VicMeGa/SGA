import React from 'react';

const DivIzquierdo = ({ selectedStudent }) => {
  if (!selectedStudent) {
    return <p>Selecciona un usuario para ver sus datos.</p>;
  }

  return (
    <div className="divIzquierdo">
      <form>
        <h3>Datos del Usuario</h3>
        <input type="text"  value={selectedStudent.usuario.nombre || ''} placeholder="Nombre" />
        <input type="text"  value={selectedStudent.usuario.apellido_paterno || ''} placeholder="Apellido Paterno" />
        <input type="text"  value={selectedStudent.usuario.apellido_materno || ''} placeholder="Apellido Materno" />
        <input type="text"  value={selectedStudent.usuario.correo || ''} placeholder="Correo" />
        <input type="text"  value={selectedStudent.usuario.numeroTelefono || ''} placeholder="Número Teléfono" />
        <input type="text"  value={selectedStudent.usuario.programaEducativo || ''} placeholder="Programa Educativo" />

        {selectedStudent.matricula && (
          <>
            <input type="text"  value={selectedStudent.matricula} placeholder="Matrícula" />
            <input type="text"  value={selectedStudent.semestre} placeholder="Semestre" />
            <input type="text"  value={selectedStudent.grupo} placeholder="Grupo" />
            <input type="text"  value={selectedStudent.horario.idHorario} placeholder="ID Horario" />
          </>
        )}

        {selectedStudent.numeroEmpleado && (
          <>
            <input type="text"  value={selectedStudent.numeroEmpleado} placeholder="N° Empleado" />
            <input type="text"  value={selectedStudent.cargo} placeholder="Cargo" />
            <input type="password"  value={selectedStudent.contrasena} placeholder="Contraseña" />
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
