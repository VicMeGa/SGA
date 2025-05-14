import React, { useState, useEffect } from 'react';

const DivIzquierdo = ({ selectedStudent }) => {
  const [formData, setFormData] = useState(null);

  useEffect(() => {
    setFormData(selectedStudent);
  }, [selectedStudent]);

  if (!formData) {
    return <p>Selecciona un usuario para ver sus datos.</p>;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith('usuario.')) {
      setFormData((prev) => ({
        ...prev,
        usuario: {
          ...prev.usuario,
          [name.split('.')[1]]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleEliminar = async () => {
  const confirm = window.confirm('¿Estás seguro de que deseas eliminar este usuario?');

  if (!confirm) return;

  try {
    const response = await fetch(`http://localhost:8080/sga/eliminar/usuario/${formData.usuario.idUsuario}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      alert('Usuario eliminado correctamente');
      setFormData(null); // Limpia el formulario
      // Aquí puedes agregar lógica adicional como notificar al componente padre que recargue la lista
    } else {
      alert('Error al eliminar el usuario');
    }
  } catch (error) {
    console.error('Error al eliminar:', error);
    alert('Error de conexión con el servidor');
  }
};


  const handleModificar = async () => {
    const payload = {
      tipo: formData.matricula ? 'alumno' : 'administrativo',
      usuario: {
        idUsuario: formData.usuario.idUsuario,
        nombre: formData.usuario.nombre,
        apellido_paterno: formData.usuario.apellido_paterno,
        apellido_materno: formData.usuario.apellido_materno,
        correo: formData.usuario.correo,
        numeroTelefono: formData.usuario.numeroTelefono,
        programaEducativo: formData.usuario.programaEducativo,
      },
      ...(formData.matricula
        ? {
            matricula: formData.matricula,
            semestre: formData.semestre,
            grupo: formData.grupo,
            horario: formData.horario?.idHorario,
          }
        : {
            numeroEmpleado: formData.numeroEmpleado,
            cargo: formData.cargo,
            contrasena: formData.contrasena,
          }),
    };

    try {
      const response = await fetch('http://localhost:8080/sga/editar/usuario', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        alert('Usuario actualizado correctamente');
      } else {
        alert('Error al actualizar el usuario');
      }
    } catch (error) {
      console.error('Error al enviar:', error);
      alert('Error de conexión con el servidor');
    }
  };

  return (
    <div className="divIzquierdo">
      <form>
        <h3>Datos del Usuario</h3>
        <input type="text" name="usuario.nombre" value={formData.usuario.nombre || ''} onChange={handleChange} placeholder="Nombre"/>
        <input type="text" name="usuario.apellido_paterno" value={formData.usuario.apellido_paterno || ''} onChange={handleChange} placeholder="Apellido Paterno"/>
        <input type="text" name="usuario.apellido_materno" value={formData.usuario.apellido_materno || ''} onChange={handleChange} placeholder="Apellido Materno"/>
        <input type="text" name="usuario.correo" value={formData.usuario.correo || ''} onChange={handleChange} placeholder="Correo"/>
        <input type="text" name="usuario.numeroTelefono" value={formData.usuario.numeroTelefono || ''} onChange={handleChange} placeholder="Número Teléfono"/>
        <input type="text" name="usuario.programaEducativo" value={formData.usuario.programaEducativo || ''} onChange={handleChange} placeholder="Programa Educativo"/>

        {formData.matricula && (
          <>
            <input type="text" name="matricula" value={formData.matricula} onChange={handleChange} placeholder="Matrícula"/>
            <input type="text" name="semestre" value={formData.semestre} onChange={handleChange} placeholder="Semestre"/>
            <input type="text" name="grupo" value={formData.grupo} onChange={handleChange} placeholder="Grupo"/>
            <input type="text" name="horario.idHorario" value={formData.horario?.idHorario || ''}
              onChange={(e) => setFormData((prev) => ({
                  ...prev,
                  horario: {
                    ...prev.horario,
                    idHorario: e.target.value,
                  },
                }))
              }
              placeholder="ID Horario"/>
          </>
        )}

        {formData.numeroEmpleado && (
          <>
            <input type="text" name="numeroEmpleado" value={formData.numeroEmpleado} onChange={handleChange} placeholder="N° Empleado"/>
            <input type="text" name="cargo" value={formData.cargo} onChange={handleChange} placeholder="Cargo"/>
            <input type="password" name="contrasena" value={formData.contrasena} onChange={handleChange} placeholder="Contraseña"/>
          </>
        )}

        <div className="botonesMod">
          <button type="button" className="borrarButton" onClick={handleEliminar}>Eliminar</button>
          <button type="button" className="cancelButton2">Cancelar</button>
          <button type="button" className="modButton" onClick={handleModificar}>Modificar</button>
        </div>
      </form>
    </div>
  );
};
export default DivIzquierdo;