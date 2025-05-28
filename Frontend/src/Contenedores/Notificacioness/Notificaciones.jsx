import { use } from "react";
import { useEffect, useState } from "react";

function Notificaciones({ mensaje, tipo, onClose }) {
  const colores ={
    error:"#e53935", //error 
    exito:"#43a047", //exito 
    info:"#1e88e5"  //info 
  };

 const[progreso, setProgreso] = useState(100);
  useEffect(() => {
    const intervalo = setInterval(() => {
      setProgreso(prev => {
        const nuevo = prev - 100 / (duracion / 1000);
        if (nuevo <= 0){
          clearInterval(intervalo);
          onClose();
        }
        return nuevo;
      });
      },100);

    return () => clearInterval(intervalo);
  }, [duracion, onClose]);


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

 const barraEstilo = {
    height: "5px",
    width: `${progreso}%`,
    backgroundColor: 'linear-gradient(to right, ${colores.info}, ${colores.exito}),${colores.error}, ',
    transition: "width 0.1s linear"
  };


  return (
    <div style={estilo}>
      <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
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
    <div style={barraEstilo}></div>
  </div>
  );
}

export default Notificaciones;
