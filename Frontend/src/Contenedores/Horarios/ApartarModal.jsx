import { useState } from "react";

const ApartarModal = ({ isOpen, onClose, onConfirm, day, hour }) => {
  const [numeroEmpleado, setNumeroEmpleado] = useState("");
  const [password, setPassword] = useState("");

  if (!isOpen) return null;

  return (
    <div className="apart">
      <div className="form-aprt">
      <br />
        <h2>
          Apartar sala para {day}, {hour}
        </h2>
        
        <div >
          <input
            type="text"
            placeholder="Número de empleado"
            value={numeroEmpleado}
            onChange={(e) => setNumeroEmpleado(e.target.value)}
          />
          
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        
        <div>
          <button
            onClick={onClose}
            className="cancelButton"
          >
            Cancelar
          </button>
          <button
            onClick={() =>
              onConfirm({ numeroEmpleado, password, day, hour })
            }
            className="okButton"
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ApartarModal;