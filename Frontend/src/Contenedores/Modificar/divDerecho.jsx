import React from 'react';
import { Search } from 'lucide-react';


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

  const buscarEstudiantes = async () => {
    try {
      const res = await fetch(`http://localhost:8080/sga/buscar/usuarios?query=${searchQuery}`);
      const data = await res.json();

      if (!res.ok || !data || (Array.isArray(data) && data.length === 0)) {
        alert("No se encontraron resultados.");
        setStudents([]);
        return;
      }

      const normalizados = Array.isArray(data) ? data : [data];
      setStudents(normalizados);
    } catch (error) {
      console.error("Error al buscar estudiantes:", error);
      alert("Error de conexión o formato inválido.");
      setStudents([]);
    }
  };

  const obtenerDetalleUsuario = async (identificador) => {
    try {
      const res = await fetch(`http://localhost:8080/sga/buscar/usuario/detalle/${identificador}`);
      if (!res.ok) throw new Error("No se encontró el usuario.");
      
      const data = await res.json();
      setSelectedStudent(data);  // ← Aquí se actualiza el estado con todos los datos
    } catch (error) {
      console.error("Error al obtener detalles:", error);
      alert("No se pudo obtener la información completa del usuario.");
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
              <th className="tht" >Identificador</th>
              <th className="tht" >Nombre</th>
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