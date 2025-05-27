
function Notificaciones({ mensaje, tipo, onClose }) {
  const colores ={
    error:"#e53935", //error 
    exito:"43a047", //exito 
    info:"1e88e5"  //info 
  };
  const estilo = {
    position: "fixed",
    top: "20px",
    left: "50%",
    transform: "translateX(-50%)",
    backgroundColor: colores[tipo] || colores.info, 
    color: "white",
    padding: "12px 24px",
    borderRadius: "10px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.3)",
    zIndex: 1000,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    minWidth: "300px"
  };

  return (
    <div style={estilo}>
      <span>{mensaje}</span>
      <button onClick={onClose} style={{
        background: "transparent",
        border: "none",
        color: "white",
        fontWeight: "bold",
        fontSize: "16px",
        cursor: "pointer",
        marginLeft: "20px"
      }}>
        X
      </button>
    </div>
  );
}

export default Notificaciones;
