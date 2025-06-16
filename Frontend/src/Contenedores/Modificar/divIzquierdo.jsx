import { useState, useEffect } from 'react';
import * as Yup from "yup";
import { toast } from 'react-toastify';


const DivIzquierdo = ({ selectedStudent }) => {
  const [formData, setFormData] = useState(null);

  const [errores, setErrores] = useState({});
  const [programaEducativo, setProgramaEducativo] = useState("");

  const opciones = [
    { value: 'Licenciatura en Ingeniería Mecánica', label: 'Licenciatura en Ingeniería Mecánica' },
    { value: 'Licenciatura en Ingeniería en Computación', label: 'Licenciatura en Ingeniería en Computación' },
    { value: 'Licenciatura en Matemáticas Aplicadas', label: 'Licenciatura en Matemáticas Aplicadas' },
    { value: 'Licenciatura en Ingeniería Química', label: 'Licenciatura en Ingeniería Química' },
    { value: 'Licenciatura en Química Industrial', label: 'Licenciatura en Química Industrial' },
    { value: 'Ingeniería en Sistemas Electrónicos', label: 'Ingeniería en Sistemas Electrónicos' },
    { value: 'Licenciatura en Ingeniería en Inteligencia Artificial', label: 'Licenciatura en Ingeniería en Inteligencia Artificial' },
  ];

  const back = import.meta.env.VITE_BACKEND_URL;

  const alumnoValidacion = Yup.object().shape({
    nombre: Yup.string().required("El nombre es obligatorio").min(2, "Debe tener al menos 2 caracteres")
      .matches(/^([A-Z][a-z]+)(\s[A-Z][a-z]+)*$/, "Las primeras letras deben ser mayusculas, solo se admiten letras"),
    apellidoPaterno: Yup.string().required("El apellido paterno es obligatorio")
      .matches(/^([A-Z][a-z]+)(\s[A-Z][a-z]+)*$/, "Las primeras letras deben ser mayusculas, solo se admiten letras"),
    apellidoMaterno: Yup.string().required("El apellido materno es obligatorio")
      .matches(/^([A-Z][a-z]+)(\s[A-Z][a-z]+)*$/, "Las primeras letras deben ser mayusculas, solo se admiten letras"),
    matricula: Yup.string().required("La matricula es obligatoria")
      .matches(/^\d{8}$/, "Debe tener 8 dígitos"),
    correo: Yup.string().required("El correo es obligatorio").email("Debe ser un correo válido"),
    semestre: Yup.string().required("El semestre es requerido").matches(/^\d{1}$/, "Debe tener 1 dígito"),
    grupo: Yup.string().required("El grupo es obligario").matches(/^[ABC]$/, "Solo hay grupos A, B o C"),
    programaEducativo: Yup.string().required("El programa educativo es obligatorio"),
    numeroTelefono: Yup.string()
      .matches(/^\d{10}$/, "Debe tener 10 dígitos")
      .notRequired(),
  });

  const adminValidacion = Yup.object().shape({
    nombre: Yup.string().required("El nombre es obligatorio").min(2, "Debe tener al menos 2 caracteres")
      .matches(/^([A-ZÁÉÍÓÚÑ][a-záéíóúñ]+)(\s[A-ZÁÉÍÓÚ][a-záéíóúñ]+)*$/, "Las primeras letras deben ser mayusculas, solo se admiten letras"),
    apellidoPaterno: Yup.string().required("El apellido paterno es obligatorio")
      .matches(/^([A-ZÁÉÍÓÚÑ][a-záéíóúñ]+)(\s[A-ZÁÉÍÓÚ][a-záéíóúñ]+)*$/, "Las primeras letras deben ser mayusculas, solo se admiten letras"),
    apellidoMaterno: Yup.string().required("El apellido materno es obligatorio")
      .matches(/^([A-ZÁÉÍÓÚÑ][a-záéíóúñ]+)(\s[A-ZÁÉÍÓÚ][a-záéíóúñ]+)*$/, "Las primeras letras deben ser mayusculas, solo se admiten letras"),
    numeroEmpleado: Yup.string().required("El numero de empleado es obligatoria")
      .matches(/^\d{6}$/, "Debe tener 6 dígitos"),
    correo: Yup.string().required("El correo es obligatorio").email("Debe ser un correo válido"),
    cargo: Yup.string().required("El cargo es requerido"),
    programaEducativo: Yup.string().required("El programa educativo es obligatorio"),
    contrasena: Yup.string().required("La contraseña es obligatoria"),
    numeroTelefono: Yup.string()
      .matches(/^\d{10}$/, "Debe tener 10 dígitos")
      .notRequired(),
  });


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
    const response = await fetch(`${back}/buscar/eliminar/usuarios/${identificador}`, {
      method: 'POST',
    });

      if (response.ok) {
        toast.success('Usuario eliminado correctamente', {
          closeButton: false,
        });
        setFormData(null);
      } else {
        toast.error('Error al eliminar el usuario', {
          closeButton: false,
        });
      }
    } catch (error) {
      console.error('Error al eliminar:', error);
      toast.error('Error de conexión con el servidor', {
        closeButton: false,
      });
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
    const es = formData.matricula ? 'alumno' : 'administrativo';
    try {

      if (es == 'alumno') {
        const datoss = {
          nombre: formData.usuario.nombre,
          apellidoPaterno: formData.usuario.apellido_paterno,
          apellidoMaterno: formData.usuario.apellido_materno,
          correo: formData.usuario.correo,
          numeroTelefono: formData.usuario.numeroTelefono,
          programaEducativo: formData.usuario.programaEducativo,
          matricula: formData.matricula,
          semestre: formData.semestre,
          grupo: formData.grupo,
        }
        await alumnoValidacion.validate(datoss, { abortEarly: false });
        setErrores({}); // Limpiar errores si la validación pasa
      }
      if (es == 'administrativo') {
        const datoss = {
          nombre: formData.usuario.nombre,
          apellidoPaterno: formData.usuario.apellido_paterno,
          apellidoMaterno: formData.usuario.apellido_materno,
          correo: formData.usuario.correo,
          numeroTelefono: formData.usuario.numeroTelefono,
          programaEducativo: formData.usuario.programaEducativo,
          numeroEmpleado: formData.numeroEmpleado,
          cargo: formData.cargo,
          contrasena: formData.contrasena,
        }
        await adminValidacion.validate(datoss, { abortEarly: false });
        setErrores({}); // Limpiar errores si la validación pasa
      }

      const response = await fetch(`${back}/editar/usuario`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        toast.success('Usuario actualizado correctamente', {
          closeButton: false,
        });
      } else {
        toast.error('Error al actualizar el usuario', {
          closeButton: false,
        });
      }

    } catch (error) {
      if (error.name === "ValidationError") {
        const nuevoErrores = {};
        error.inner.forEach((err) => {
          nuevoErrores[err.path] = err.message;
        });
        setErrores(nuevoErrores);
        toast.error('Hay errores en el formulario', {
          closeButton: false,
        });
      } else {
        console.error('Error al enviar:', error);
        toast.error('Error de conexión con el servidor', {
          closeButton: false,
        });
      }

    }
  };

  return (
    <div className="divIzquierdo">
      <form>
        <h1>Datos del Usuario</h1>
        <input type="text" className="imputnorm" name="usuario.nombre" value={formData.usuario.nombre || ''} onChange={handleChange} placeholder="Nombre" />
        {errores.nombre && <span className="error">{errores.nombre}</span>}
        <input type="text" className="imputnorm" name="usuario.apellido_paterno" value={formData.usuario.apellido_paterno || ''} onChange={handleChange} placeholder="Apellido Paterno" />
        {errores.apellidoPaterno && <span className="error">{errores.apellidoPaterno}</span>}
        <input type="text" className="imputnorm" name="usuario.apellido_materno" value={formData.usuario.apellido_materno || ''} onChange={handleChange} placeholder="Apellido Materno" />
        {errores.apellidoMaterno && <span className="error">{errores.apellidoMaterno}</span>}
        <input type="text" className="imputnorm" name="usuario.correo" value={formData.usuario.correo || ''} onChange={handleChange} placeholder="Correo" />
        {errores.correo && <span className="error">{errores.correo}</span>}
        <input type="text" className="imputnorm" name="usuario.numeroTelefono" value={formData.usuario.numeroTelefono || ''} onChange={handleChange} placeholder="Número Teléfono" />
        {errores.numeroTelefono && <span className="error">{errores.numeroTelefono}</span>}
        <select className="imputnorm"
          value={programaEducativo}
          onChange={(e) => setProgramaEducativo(e.target.value)}
        >
          <option value="" disabled>Selecciona un programa educativo</option>
          {opciones.map((opcion) => (
            <option key={opcion.value} value={opcion.value}>
              {opcion.label}
            </option>
          ))}
        </select>
        {formData.matricula && (
          <>
            <input type="text" className="imputnorm" name="matricula" value={formData.matricula} onChange={handleChange} placeholder="Matrícula" readOnly />
            {errores.matricula && <span className="error">{errores.matricula}</span>}
            <input type="text" className="imputnorm" name="semestre" value={formData.semestre} onChange={handleChange} placeholder="Semestre" />
            {errores.semestre && <span className="error">{errores.semestre}</span>}
            <input type="text" className="imputnorm" name="grupo" value={formData.grupo} onChange={handleChange} placeholder="Grupo" />
            {errores.grupo && <span className="error">{errores.grupo}</span>}
          </>
        )}

        {formData.numeroEmpleado && (
          <>
            <input type="text" className="imputnorm" name="numeroEmpleado" value={formData.numeroEmpleado} onChange={handleChange} placeholder="N° Empleado" readOnly />
            {errores.numeroEmpleado && <span className="error">{errores.numeroEmpleado}</span>}
            <input type="text" className="imputnorm" name="cargo" value={formData.cargo} onChange={handleChange} placeholder="Cargo" />
            {errores.cargo && <span className="error">{errores.cargo}</span>}
            <input type="password" className="imputnorm" name="contrasena" value={formData.contrasena} onChange={handleChange} placeholder="Contraseña" />
            {errores.contrasena && <span className="error">{errores.contrasena}</span>}
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