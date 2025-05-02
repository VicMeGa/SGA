
const Item = ({image, name, description, status}) => {

    const isAvailable = status === "Disponible";

    return (
        <>
        <div className="tarjetaArticulo">
            <img src={image} alt={image}/>
            <div className="descrip">
                <h3>{name}</h3>
                <p>{description}</p>
            </div>
            <div className="status-indicator">
                <span className={isAvailable ? "available" : "unavailable"}>
                {status}
                </span>
                <div className={`status-dot ${isAvailable ? "available" : "unavailable"}`} />
            </div>
        </div>

        </>
    );
}
export default Item;