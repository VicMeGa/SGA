import huellaIcon from "../../../recursos/huella-dactilar.png";
import { useState } from 'react';
import { X } from 'lucide-react';

function Huella ({ onHuellaCapturada = () => {} }){
  const [loading, setLoading] = useState(false);
  const [fingerprintData, setFingerprintData] = useState(null);
  const [message, setMessage] = useState('');


  const clearCapture = () => {
    setFingerprintData(null);
    setMessage('');

    if (onHuellaCapturada) {
      onHuellaCapturada(null);
    }
  };

    const captureFingerprintSimulated = async () => {
    setLoading(true);
    setMessage('Coloca tu dedo en el lector...');
    try {
      /*await new Promise(resolve => setTimeout(resolve, 2000));*/
      
      // Leer archivo BMP
      const response = await fetch('/Huellas/TonoH.BMP');
      const blob = await response.blob();
      
      const reader = new FileReader();
      reader.onload = () => {
        const fingerprintId = `fp_${Date.now()}`;
        setFingerprintData({
          id: fingerprintId,
          image: reader.result,
          timestamp: new Date().toISOString()
        });
        setMessage('✓ Huella capturada exitosamente');
        setLoading(false);
        if (onHuellaCapturada) {
            console.log('Enviando huella:', reader.result);
            onHuellaCapturada(reader.result);
          }
      };
      reader.readAsDataURL(blob);
    } catch (error) {
      setMessage(`✗ Error: ${error.message}`);
      setLoading(false);
    }
  };

  const captureFingerprint = async () => {
    setLoading(true);
    setMessage('Coloca tu dedo en el lector...');

    try {
      // Llamamos al backend que captura la huella real uwu
      const response = await fetch('http://localhost:5000/capturar');
      if (!response.ok) throw new Error("Error al capturar huella");

      const data = await response.json();  // { image_b64: "..." }

      const fingerprintId = `fp_${Date.now()}`;
      const imageBase64 = `data:image/png;base64,${data.image_b64}`;

      setFingerprintData({
        id: fingerprintId,
        image: imageBase64,
        timestamp: new Date().toISOString()
      });

      setMessage('✓ Huella capturada exitosamente');
      setLoading(false);

      if (onHuellaCapturada) {
        console.log("Enviando huella real:", imageBase64);
        onHuellaCapturada(imageBase64);
      }

    } catch (error) {
      setMessage(`✗ Error: ${error.message}`);
      setLoading(false);
    }
  };


  return(
    <div className="huella">
      {fingerprintData && (
        <div className="mostrarHuella">
          <div>
            <span>Huella Capturada</span>
            <br />
            <button
                onClick={clearCapture}
              >
                <X className="equis" />
              </button>
          </div>
          <img src={fingerprintData.image} alt="Huella capturada"/>
          <p>{new Date(fingerprintData.timestamp).toLocaleString()}</p>
        </div>
      )}
      <button onClick={captureFingerprint} disabled={loading}>
        {loading ? 'Capturando...' : 'Capturar Huella'}
      </button> 
      <p>{message}</p>
    </div>
  );
}

export default Huella;
