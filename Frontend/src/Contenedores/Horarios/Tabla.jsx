import { useState, useEffect } from "react";

const Tabla =()=>{
   const data = {
    lunes: {
      "8:00 - 9:00": "Matemáticas",
      "9:00 - 10:00": "Historia",
      "10:00 - 11:00": "Ciencias",
    },
    martes: {
      "8:00 - 9:00": "Física",
      "9:00 - 10:00": "Química",
      "10:00 - 11:00": "Geografía",
    },
    miércoles: {
      "8:00 - 9:00": "Inglés",
      "9:00 - 10:00": "Arte",
    },
    jueves: {
      "8:00 - 9:00": "Educación Física",
      "9:00 - 10:00": "Historia",
      "10:00 - 11:00": "Matemáticas",
    },
    viernes: {
      "8:00 - 9:00": "Programación",
      "9:00 - 10:00": "Filosofía",
      "10:00 - 11:00": "Biología",
    },
  };

  const [schedule, setSchedule] = useState({});
  const hours = [
    "8:00 - 9:00",
    "9:00 - 10:00",
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

  // Cargar los datos ficticios al inicio
  useEffect(() => {
    setSchedule(data);
  }, []);

    return (
        <>
        <div>
      <table border="1" style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>Hora</th>
            {days.map((day) => (
              <th key={day}>{day.charAt(0).toUpperCase() + day.slice(1)}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {hours.map((hour) => (
            <tr key={hour}>
              <td>{hour}</td>
              {days.map((day) => (
                <td key={day}>
                  {schedule[day] && schedule[day][hour] ? schedule[day][hour] : ""}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
        </>
    );
};

export default Tabla;