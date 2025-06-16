import { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const DivDerecho = ({ itemId }) => {
  const [numeroEm, setNE] = useState("");
  const [password, setPassword] = useState("");
  const [prestamoId, setPrestamoId] = useState(null);
  const [prestado, setPrestado] = useState(false);

  // Obtener el estado de préstamo desde el backend
  useEffect(() => {
    const verificarEstadoPrestamo = async () => {
      try {
        const response = await fetch(`http://localhost:8080/sga/buscar/articulos/${itemId}`);
        if (response.ok) {
          const data = await response.json();
          const estaPrestado = data.estaPrestado === 1;
          setPrestado(estaPrestado);

          if (estaPrestado) {
            const prestamoResp = await fetch(`http://localhost:8080/sga/prestamo/id-actual/${itemId}`);
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

    if (!numeroEm || !password || !itemId) {
      toast.error("⚠️ Por favor complete todos los campos requeridos", {
          closeButton: false,
        });
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/sga/prestamo/pedir", {
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
        toast.success("✅ Préstamo registrado correctamente");
        setPrestamoId(result);
        setPrestado(true);
      } else {
        const errorText = await response.text();
        toast.error(errorText || "Error al solicitar el préstamo", {
          closeButton: false,
        });
      }
    } catch (error) {
      toast.error("Error de conexión: " + error.message, {
          closeButton: false,
        });
    }
  };

  const handleDevolver = async () => {
    try {
      const response = await fetch(`http://localhost:8080/sga/prestamo/devolver/${prestamoId}`, {
        method: "PUT",
      });

      if (response.ok) {
        const result = await response.text();
        toast.success(result, {
          closeButton: false,
        });
        setPrestado(false);
        setPrestamoId(null);
        setNE("");
        setPassword("");
      } else {
        const errorText = await response.text();
        toast.error(errorText || "Error al devolver el préstamo", {
          closeButton: false,
        });
      }
    } catch (error) {
      toast.error("Error de conexión: " + error.message, {
          closeButton: false,
        });
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
            value={numeroEm}
            onChange={(e) => setNE(e.target.value)}
            disabled={prestado}
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
          <br /><br />
        </form>
      </div>
    </>
  );
};

export default DivDerecho;
