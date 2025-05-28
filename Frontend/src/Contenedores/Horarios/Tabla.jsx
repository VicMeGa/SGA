import { useState, useEffect } from "react";

const Tabla = ({ salaSeleccionada, selectedCell, setSelectedCell, schedule, setSchedule }) => {

  const hours = [
    "08:00 - 09:00",
    "09:00 - 10:00",
    "10:00 - 11:00",
    "11:00 - 12:00",
    "12:00 - 13:00",
    "13:00 - 14:00",
    "14:00 - 15:00",
    "15:00 - 16:00",
    "16:00 - 17:00",
    "17:00 - 18:00",
    "18:00 - 19:00",
    "19:00 - 20:00",
  ];
  const days = ["lunes", "martes", "miércoles", "jueves", "viernes"];

  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        const response = await fetch("http://localhost:8080/sga/buscar/horarios");
        const rawData = await response.json();

        // Filtrar por nombre de sala si hay una sala seleccionada
        const filtrados = salaSeleccionada
          ? rawData.filter(item => item.sala.nombreSala === salaSeleccionada)
          : [];

        const newSchedule = {};

        filtrados.forEach((item) => {
          const dia = item.dia.toLowerCase();
          const materia = item.materia;
          const start = item.horaInicioFormateada;
          const end = item.horaFinFormateada;
          const maestro = item.administrativo.usuario.nombre + ' ' + item.administrativo.usuario.apellido_paterno;
          const semestre = item.semestre;
          const grupo = item.grupo;

          const startHour = parseInt(start.split(":")[0]);
          const endHour = parseInt(end.split(":")[0]);

          for (let h = startHour; h < endHour; h++) {
            const block = `${h.toString().padStart(2, "0")}:00 - ${(h + 1).toString().padStart(2, "0")}:00`;
            if (!newSchedule[dia]) newSchedule[dia] = {};
            newSchedule[dia][block] = `${materia}\nProf. ${maestro}\n${semestre}"${grupo}"`;
          }
        });


        setSchedule(newSchedule);
      } catch (error) {
        console.error("Error al obtener horarios:", error);
      }
    };

    // Solo cargar si hay una sala seleccionada
    if (salaSeleccionada) {
      fetchSchedule();
    }
  }, [salaSeleccionada]);

  return (
    <div style={{ overflowX: "auto" }}>
      <table border="1" style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ backgroundColor: "#f2f2f2" }}>
            <th>Hora</th>
            {days.map((day) => (
              <th key={day}>{day.charAt(0).toUpperCase() + day.slice(1)}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {hours.map((hour) => (
            <tr key={hour}>
              <td style={{ fontWeight: "bold", backgroundColor: "#f9f9f9" }}>{hour}</td>
              {days.map((day) => (
                <td
                  key={`${day}-${hour}`}
                  onClick={() => setSelectedCell({ day, hour })}
                  style={{
                    textAlign: "center",
                    padding: "8px",
                    whiteSpace: "pre-line",
                    backgroundColor:
                      selectedCell.day === day && selectedCell.hour === hour
                        ? "#ffe082"
                        : schedule[day]?.[hour]
                          ? "#e0f7fa"
                          : "",
                    cursor: "pointer",
                  }}
                >
                  {schedule[day]?.[hour] || ""}
                </td>


              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Tabla;
