import { useState, useEffect } from "react";

const Tabla = ({ salaSeleccionada, selectedCell, setSelectedCell, schedule, setSchedule }) => {

  const back = import.meta.env.VITE_BACKEND_URL;
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

    const obtenerHora = (campoHoraFormateada, campoFecha) => {
      if (campoHoraFormateada) {
        return parseInt(campoHoraFormateada.split(":")[0]);
      } else if (campoFecha) {
        return new Date(campoFecha).getHours();
      }
      return null;
    };

    const fetchSchedule = async () => {
      try {
        const [horariosRes, apartadosRes] = await Promise.all([
          fetch(`${back}/buscar/horarios`),
          fetch(`${back}/buscar/horarios/apartados`)
        ]);

        const horariosData = await horariosRes.json();
        const apartadosData = await apartadosRes.json();

        // Filtrar por sala
        const horariosFiltrados = salaSeleccionada
          ? horariosData.filter(item => item.sala.nombreSala === salaSeleccionada)
          : [];

        const apartadosFiltrados = salaSeleccionada
          ? apartadosData.filter(item => item.sala.nombreSala === salaSeleccionada)
          : [];

        const newSchedule = {};

        // Procesar HORARIOS (clases)
        horariosFiltrados.forEach((item) => {
          const dia = item.dia.toLowerCase();
          const start = item.horaInicioFormateada;
          const end = item.horaFinFormateada;
          const maestro = item.administrativo.usuario.nombre + ' ' + item.administrativo.usuario.apellido_paterno;
          const info = `${item.materia}\nProf. ${maestro}\n${item.semestre}"${item.grupo}"`;

          const startHour = parseInt(start.split(":")[0]);
          const endHour = parseInt(end.split(":")[0]);

          console.log("Apartado con problema:", item);

          for (let h = startHour; h < endHour; h++) {
            const block = `${h.toString().padStart(2, "0")}:00 - ${(h + 1).toString().padStart(2, "0")}:00`;
            if (!newSchedule[dia]) newSchedule[dia] = {};
            newSchedule[dia][block] = info;
          }
        });

        // Procesar APARTADOS
        apartadosFiltrados.forEach((item) => {
          const dia = item.dia?.toLowerCase();
          const administrativo = item.administrativo?.usuario?.nombre + ' ' + item.administrativo?.usuario?.apellido_paterno;

          const startHour = obtenerHora(item.horaInicioFormateada, item.fechaHoraInicio);
          const endHour = obtenerHora(item.horaFinFormateada, item.fechaHoraFin);

          if (startHour != null && endHour != null) {
            for (let h = startHour; h < endHour; h++) {
              const block = `${h.toString().padStart(2, "0")}:00 - ${(h + 1).toString().padStart(2, "0")}:00`;
              if (!newSchedule[dia]) newSchedule[dia] = {};
              if (newSchedule[dia][block]) {
                newSchedule[dia][block] += `\nApartado por \nProf.${administrativo}`;
              } else {
                newSchedule[dia][block] = `Apartado por \nProf.${administrativo}`;
              }
            }
          }
        });


        setSchedule(newSchedule);
      } catch (error) {
        console.error("Error al obtener horarios o apartados:", error);
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
