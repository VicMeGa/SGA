import { useState, useEffect } from 'react';

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

  const identificador = formData.matricula ? formData.matricula : formData.numeroEmpleado;
  try {
    const response = await fetch(`http://localhost:8080/sga/buscar/eliminar/usuarios/${identificador}`, {
      method: 'POST',
    });

    if (response.ok) {
      alert('Usuario eliminado correctamente');
      setFormData(null); // Limpia el formulario
      // Aquí puedes agregar lógica adicional como notificar al componente padre que recargue la lista
    } else {
      alert('Error al eliminar el usuario');
      console.log(formData.usuario.idUsuario)
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
        <h1>Datos del Usuario</h1>
        <input type="text" className="imputnorm" name="usuario.nombre" value={formData.usuario.nombre || ''} onChange={handleChange} placeholder="Nombre"/>
        <input type="text" className="imputnorm" name="usuario.apellido_paterno" value={formData.usuario.apellido_paterno || ''} onChange={handleChange} placeholder="Apellido Paterno"/>
        <input type="text" className="imputnorm" name="usuario.apellido_materno" value={formData.usuario.apellido_materno || ''} onChange={handleChange} placeholder="Apellido Materno"/>
        <input type="text" className="imputnorm" name="usuario.correo" value={formData.usuario.correo || ''} onChange={handleChange} placeholder="Correo"/>
        <input type="text" className="imputnorm" name="usuario.numeroTelefono" value={formData.usuario.numeroTelefono || ''} onChange={handleChange} placeholder="Número Teléfono"/>
        <input type="text" className="imputnorm" name="usuario.programaEducativo" value={formData.usuario.programaEducativo || ''} onChange={handleChange} placeholder="Programa Educativo"/>

        {formData.matricula && (
          <>
            <input type="text" className="imputnorm" name="matricula" value={formData.matricula} onChange={handleChange} placeholder="Matrícula"/>
            <input type="text" className="imputnorm" name="semestre" value={formData.semestre} onChange={handleChange} placeholder="Semestre"/>
            <input type="text" className="imputnorm" name="grupo" value={formData.grupo} onChange={handleChange} placeholder="Grupo"/>

          </>
        )}

        {formData.numeroEmpleado && (
          <>
            <input type="text"     className="imputnorm" name="numeroEmpleado" value={formData.numeroEmpleado} onChange={handleChange} placeholder="N° Empleado"/>
            <input type="text"     className="imputnorm" name="cargo" value={formData.cargo} onChange={handleChange} placeholder="Cargo"/>
            <input type="password" className="imputnorm" name="contrasena" value={formData.contrasena} onChange={handleChange} placeholder="Contraseña"/>
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