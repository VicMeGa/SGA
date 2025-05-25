
function Notificaciones({mensaje, tipo="info", onClose}) {
    const colores = {
        exito: "beg-green-500",
        error: "bg-red-500",
        info: "bg-blue-500",
        advertencia: "bg-yellow-500",
    }
    return (
        <div className={`fixed top-4 right-4 text-whote px-4 py-2 rounded shadow ${colores[tipo]}`}>
        <div className="flex justify-between items-center gap-4">
            <span>{mensaje}</span>
            <button onClick={onClose} className="font-bold text-lg">X</button>
        </div>
        </div>
    );
}
export default Notificaciones;