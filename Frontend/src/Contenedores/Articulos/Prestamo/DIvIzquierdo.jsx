
const DivIzquierdo = ({ image, name, description,status }) => {
    const isAvailable = status === "Disponible";

    return(
        <>
        <img src={image} alt={name}/>
        <div className="descrip">
            <h3>{name}</h3>
            <p>{description}</p>
            <div className="status-indicator">
                <h2 className={isAvailable ? "available" : "unavailable"}>
                {status}
                </h2>
            </div>
        </div>
        </>
    );
};

export default DivIzquierdo;