import React, { useEffect, useState } from "react";

const Tabla = () => {
  const [fechas, setFechas] = useState([]);

  const datos = [
    {
      alumno: "Raul",
      fechasAsistidas: ["21/10/2024", "23/10/2024", "25/10/2024"],
    },
    {
      alumno: "Alumno 2",
      fechasAsistidas: ["22/10/2024", "24/10/2024", "29/10/2024"],
    },
    {
      alumno: "Alumno 3",
      fechasAsistidas: ["21/10/2024", "29/05/2025", "28/10/2024"],
    },
    {
      alumno: "Alumno 4",
      fechasAsistidas: ["23/10/2024", "25/10/2024", "30/10/2024"],
    },
  ];

  // Función para obtener la fecha actual en formato dd/MM/yyyy
  const obtenerFechaActual = () => {
    const hoy = new Date();
    const dia = String(hoy.getDate()).padStart(2, "0");
    const mes = String(hoy.getMonth() + 1).padStart(2, "0");
    const anio = hoy.getFullYear();
    return `${dia}/${mes}/${anio}`;
  };

  useEffect(() => {
    const fechaActual = obtenerFechaActual();

    fetch(`http://localhost:8080/sga/buscar/anteriores?fecha=${fechaActual}`)
      .then((res) => res.json())
      .then((data) => setFechas(data))
      .catch((err) => console.error("❌ Error al obtener fechas:", err));
  }, []);

  return (
    <>
      <table border="1">
        <thead>
          <tr>
            <th>Alumnos</th>
            {fechas.map((fecha) => (
              <th key={fecha}>{fecha}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {datos.map((dato) => (
            <tr key={dato.alumno}>
              <td>{dato.alumno}</td>
              {fechas.map((fecha) => (
                <td key={fecha}>
                  {dato.fechasAsistidas.includes(fecha) ? "*" : "N/A"}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Tabla;
