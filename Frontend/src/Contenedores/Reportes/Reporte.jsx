const Reporte = ({ urlPDF }) => {
    return (
        <>
            {urlPDF && (
                <iframe
                    src={urlPDF}
                    title="Reporte PDF"
                    width="100%"
                    height="600px"
                    style={{ border: "1px solid black" }}
                ></iframe>
            )}
        </>
    );
};

export default Reporte;
