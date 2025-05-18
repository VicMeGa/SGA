
const Tabla =()=> {
  const datos = [
    {
      alumno: "Alumno 1",
      fechasAsistidas: ["21/10/2024", "23/10/2024", "25/10/2024"],
    },
    {
      alumno: "Alumno 2",
      fechasAsistidas: ["22/10/2024", "24/10/2024", "29/10/2024"],
    },
    {
      alumno: "Alumno 3",
      fechasAsistidas: ["21/10/2024", "22/10/2024", "28/10/2024"],
    },
    {
      alumno: "Alumno 4",
      fechasAsistidas: ["23/10/2024", "25/10/2024", "30/10/2024"],
    },
  ];

    const fechas = [
        "21/10/2024",
        "22/10/2024",
        "23/10/2024",
        "24/10/2024",
        "25/10/2024",
        "28/10/2024",
        "29/10/2024",
        "30/10/2024",
        "31/10/2024",
    ];

    return (
        <>
        <table border="1" >
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
                  {dato.fechasAsistidas.includes(fecha) ? "*" : "NA"}
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