import React, { useEffect, useState } from "react";

const Tabla = ({ nombresAlumnos, asistencias }) => {
  const [fechas, setFechas] = useState([]);

  // Devuelve la fecha actual en formato dd/mm/yyyy
  const obtenerFechaActual = () => {
    const hoy = new Date();
    const dia = String(hoy.getDate()).padStart(2, "0");
    const mes = String(hoy.getMonth() + 1).padStart(2, "0");
    const anio = hoy.getFullYear();
    return `${dia}/${mes}/${anio}`;
  };
  const back = import.meta.env.VITE_BACKEND_URL;
  useEffect(() => {
    const fechaActual = obtenerFechaActual();

    fetch(`${back}/buscar/anteriores?fecha=${fechaActual}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("📅 Fechas recibidas:", data);
        setFechas(data);
      })
      .catch((err) => console.error("❌ Error al obtener fechas:", err));
  }, []); // Solo ejecuta una vez al montar

  const verificarAsistencia = (nombre, fechaBuscada) => {
    console.log(`\n🧍 Verificando asistencia para: ${nombre}`);
    console.log(`📅 Fecha buscada: ${fechaBuscada}`);
    
    const alumno = asistencias.find((a) => a.alumno === nombre);
    if (!alumno) {
      console.log(`❌ No se encontró el alumno: ${nombre}`);
      return "@";
    }

    // ✅ Convertir fecha "dd/mm/yyyy" a "yyyy-mm-dd" para coincidir con el formato de asistencias
    const [dia, mes, anio] = fechaBuscada.split("/");
    const fechaFormateada = `${anio}-${mes}-${dia}`;

    console.log(`📅 Fecha formateada para búsqueda: ${fechaFormateada}`);
    console.log("📋 Fechas asistidas por el alumno:");
    alumno.fechasAsistidas.forEach((f, index) => {
      console.log(`   ${index + 1}. ${f}`);
    });

    // ✅ Ahora ambas fechas están en formato yyyy-mm-dd
    const asistio = alumno.fechasAsistidas.includes(fechaFormateada);

    console.log(`✅ Resultado: ${asistio ? "✔️ ASISTIÓ" : "@ NO ASISTIÓ"}`);

    return asistio ? "✔️" : "-";
  };

  return (
    <table style={{ borderCollapse: "collapse", width: "100%" }} border="1">
      <thead>
        <tr>
          <th>Alumnos</th>
          {fechas.map((fecha, i) => (
            <th key={`${fecha}-${i}`}>{fecha}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {nombresAlumnos.map((nombre) => (
          <tr key={nombre}>
            <td>{nombre}</td>
            {fechas.map((fecha, i) => (
              <td key={`${nombre}-${fecha}-${i}`}>
                {verificarAsistencia(nombre, fecha)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Tabla;