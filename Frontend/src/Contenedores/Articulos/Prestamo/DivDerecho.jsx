import { useState, useEffect } from "react";
import useSession from "../../../hook/useSession";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const DivDerecho = ({ itemId }) => {
  const [password, setPassword] = useState("");
  const [prestamoId, setPrestamoId] = useState(null);
  const [prestado, setPrestado] = useState(false);
  const {session} = useSession();

  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");
  
  const [numeroEm, setNE] = useState(session.token);
  
  const back = import.meta.env.VITE_BACKEND_URL;
  // Obtener el estado de préstamo desde el backend
  useEffect(() => {
    setNE(session.token);
    const verificarEstadoPrestamo = async () => {
      try {
        const response = await fetch(`${back}/buscar/articulos/${itemId}`);
        if (response.ok) {
          const data = await response.json();
          const estaPrestado = data.estaPrestado === 1;
          setPrestado(estaPrestado);

          if (estaPrestado) {
            const prestamoResp = await fetch(`${back}/prestamo/id-actual/${itemId}`);
            if (prestamoResp.ok) {
              const idPrestamo = await prestamoResp.text();
              setPrestamoId(idPrestamo);
            }
          }
        }
      } catch (err) {
        console.error("Error al verificar estado del artículo:", err);
        toast.error("❌ Error al verificar el estado del artículo", {
          closeButton: false,
        });
      }
    };

    verificarEstadoPrestamo();
  }, [itemId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMensaje("");
    setError("");

    if (!numeroEm || !password || !itemId) {
      setError("Por favor complete todos los campos requeridos");
      toast.error("⚠️ Por favor complete todos los campos requeridos", {
          closeButton: false,
        });
      return;
    }

    try {
      const response = await fetch(`${back}/prestamo/pedir`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          numeroEmpleado: numeroEm,
          password: password,
          idArticulo: itemId,
        }),
      });

      if (response.ok) {
        const result = await response.text();
        setMensaje("Préstamo registrado correctamente");
        toast.success("✅ Préstamo registrado correctamente");
        setPrestamoId(result);
        setPrestado(true);
      } else {
        const errorText = await response.text();
        setError(errorText || "Error al solicitar el préstamo");
        toast.error(errorText || "Error al solicitar el préstamo", {
          closeButton: false,
        });
      }
    } catch (error) {
      setError("Error de conexión: " + error.message);
      toast.error("Error de conexión: " + error.message, {
          closeButton: false,
        });
    }
  };

  const handleDevolver = async () => {
    setMensaje("");
    setError("");
    try {
      const response = await fetch(`${back}/prestamo/devolver/${prestamoId}`, {
        method: "PUT",
      });

      if (response.ok) {
        const result = await response.text();
        setMensaje(result);
        toast.success(result, {
          closeButton: false,
        });
        setPrestado(false);
        setPrestamoId(null);
        setNE("");
        setPassword("");
      } else {
        const errorText = await response.text();
        setError(errorText || "Error al devolver el préstamo");
        toast.error(errorText || "Error al devolver el préstamo", {
          closeButton: false,
        });
      }
    } catch (error) {
      setError("Error de conexión: " + error.message);
      toast.error("Error de conexión: " + error.message, {
          closeButton: false,
        });
    }
  };

const handleEliminar = async () => {
  setMensaje("");
  setError("");

  if (!itemId) {
    setError("No se encontró ID del artículo");
    return;
  }

  if (!confirm("¿Seguro que deseas desactivar este artículo? uwu")) {
    return;
  }

  try {
    const response = await fetch(`${back}/apii/articulos/desactivar/${itemId}`, {
      method: "PUT",
    });

    if (response.ok) {
      const result = await response.text();
      setMensaje(result);
    } else {
      const errorText = await response.text();
      setError(errorText || "Error al desactivar el artículo");
    }
  } catch (error) {
    setError("Error de conexión: " + error.message);
  }
};




  return (
    <>
      <ToastContainer />
      <div className="prestamo-container">
        <h1>Préstamo</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Número de empleado"
            value={session.token}
            onChange={(e) => setNE(e.target.value)}
            disabled={prestado}
            readOnly
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={prestado}
          />
          <br />
          <br />
          {!prestado ? (
            <button className="okButton" type="submit">
              Pedir Préstamo
            </button>
            
          ) : (
            <button className="okButton" type="button" onClick={handleDevolver}>
              Devolver
            </button>
          )}
          <button className="btn-eliminar" type="button" onClick={handleEliminar}>
              Eliminar Articulo
          </button>
          <br />
          <br />
          {mensaje && <div className="mensaje-exito">{mensaje}</div>}
          {error && <div className="mensaje-error">{error}</div>}
        </form>
      </div>
    </>
  );
};

export default DivDerecho;
