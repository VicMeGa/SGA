import { Search } from 'lucide-react';
import { toast } from 'react-toastify'; // ← Importar toast

const DivDerecho = ({
  searchQuery,
  setSearchQuery,
  students,
  setStudents,
  setSelectedStudent,
}) => {
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };
  
  const back = import.meta.env.VITE_BACKEND_URL;
  const buscarEstudiantes = async () => {
    try {
      const res = await fetch(`${back}/buscar/usuarios?query=${searchQuery}`);
      const data = await res.json();

      if (!res.ok || !data || (Array.isArray(data) && data.length === 0)) {
        toast.warn("No se encontraron resultados.", {
          closeButton: false,
        });
        setStudents([]);
        return;
      }

      const normalizados = Array.isArray(data) ? data : [data];
      setStudents(normalizados);
      toast.success("Búsqueda completada correctamente", {
        closeButton: false,
      });
    } catch (error) {
      console.error("Error al buscar estudiantes:", error);
      toast.error("Error de conexión o formato inválido.", {
        closeButton: false,
      });
      setStudents([]);
    }
  };

  const obtenerDetalleUsuario = async (identificador) => {
    try {
      const res = await fetch(`${back}/buscar/usuario/detalle/${identificador}`);
      if (!res.ok) throw new Error("No se encontró el usuario.");

      const data = await res.json();
      setSelectedStudent(data);
      toast.info("Usuario seleccionado con éxito", {
        closeButton: false,
      });
    } catch (error) {
      console.error("Error al obtener detalles:", error);
      toast.error("No se pudo obtener la información del usuario.", {
        closeButton: false,
      });
    }
  };

  return (
    <div className="divDerecho">
      <div className="busqueda">
        <input
          type="text"
          placeholder="Buscar por nombre o matrícula"
          className="inputBuscar"
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <button className="botonBuscar" onClick={buscarEstudiantes}>
          <Search size={20} />
        </button>
      </div>

      <div className="tabladiv">
        <table className="tabla">
          <thead>
            <tr>
              <th className="tht">Identificador</th>
              <th className="tht">Nombre</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student, index) => (
              <tr key={index} onClick={() => obtenerDetalleUsuario(student.identificador)}>
                <td className="tdd">{student.identificador || student.matricula || student.numeroEmpleado}</td>
                <td className="tdd">{student.nombre}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DivDerecho;
