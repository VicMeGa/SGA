import { useEffect, useState } from "react";
import * as Yup from "yup";
import useSession from "../../hook/useSession";

const ApartarModal = ({ isOpen, onClose, onConfirm, day, hour }) => {
  const [numeroEmpleado, setNumeroEmpleado] = useState("");
  const [password, setPassword] = useState("");
  const [errores, setErrores] = useState({});

  const {session} = useSession();

  useEffect(()=>{
    setNumeroEmpleado(session.token);
  });

  const esquemaValidacion = Yup.object().shape({
      numeroEmpleado : Yup.string().required("El numero de empleado es obligatorio")
          .matches(/^\d{6}$/, "Debe tener 6 dígitos"),
      password: Yup.string().required("La contraseña es obligatoria"),
  });

  if (!isOpen) return null;
  
  const Validar  = async () => {
    try{
      const datos = {
        numeroEmpleado,
        password,
      }
      await esquemaValidacion.validate(datos, { abortEarly: false });
      setErrores({}); // Limpiar errores si la validación pasa 
      onConfirm({ numeroEmpleado, password, day, hour })
    } catch (error){
      if (error.name === "ValidationError") {
                const nuevoErrores = {};
                error.inner.forEach((err) => {
                    nuevoErrores[err.path] = err.message;
                });
                setErrores(nuevoErrores);
            }
    }
  }
  return (
    <div className="apart">
      <div className="form-aprt">
      <br />
        <h2>
          Apartar sala para {day}, {hour}
        </h2>
        
        <div className="regiSon">
          <input
            type="text"
            placeholder="Número de empleado"
            value={numeroEmpleado}
            onChange={(e) => setNumeroEmpleado(e.target.value)}
            readOnly
          />
          {errores.numeroEmpleado && <span className="error">{errores.numeroEmpleado}</span>}
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errores.password && <span className="error">{errores.password}</span>}
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
              Validar()
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