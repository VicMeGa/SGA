import React, { useState } from "react";

const ApartarModal = ({ isOpen, onClose, onConfirm, day, hour }) => {
  const [numeroEmpleado, setNumeroEmpleado] = useState("");
  const [password, setPassword] = useState("");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" style={{ zIndex: 9999 }}>
        
      <div className="bg-white rounded-lg p-6 w-96 max-w-md mx-4 shadow-xl">
        <h3 className="text-lg font-semibold mb-4 text-gray-800">
          Apartar sala para {day}, {hour}
        </h3>
        
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Número de empleado"
            value={numeroEmpleado}
            onChange={(e) => setNumeroEmpleado(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <div className="flex justify-end space-x-3 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={() =>
              onConfirm({ numeroEmpleado, password, day, hour })
            }
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ApartarModal;