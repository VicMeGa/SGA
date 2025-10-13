import huellaIcon from "../../../recursos/huella-dactilar.png";
import { useState } from 'react';
import { X } from 'lucide-react';

function Huella (){
  const [loading, setLoading] = useState(false);
  const [fingerprintData, setFingerprintData] = useState(null);
  const [message, setMessage] = useState('');


  const clearCapture = () => {
    setFingerprintData(null);
    setMessage('');
  };

    const captureFingerprintSimulated = async () => {
    setLoading(true);
    setMessage('Coloca tu dedo en el lector...');
    try {
      /*await new Promise(resolve => setTimeout(resolve, 2000));*/
      
      // Leer archivo BMP
      const response = await fetch('/Huellas/huella1.BMP');
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
      };
      reader.readAsDataURL(blob);
    } catch (error) {
      setMessage(`✗ Error: ${error.message}`);
      setLoading(false);
    }
  };

  const registerFingerprint = async () => {
    if (!fingerprintData) {
      setMessage('Por favor captura una huella primero');
      return;
    }


    setLoading(true);

    try {
      const response = await fetch('http://localhost:8080/api/fingerprint/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId,
          fingerprintImage: fingerprintData.image,
          fingerprintId: fingerprintData.id
        })
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(`✓ ${data.message}`);
        setFingerprintData(null);
        setUserId('');
      } else {
        setMessage(`✗ Error: ${data.message}`);
      }
    } catch (error) {
      setMessage(`✗ Error de conexión: ${error.message}`);
    } finally {
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
      <button onClick={captureFingerprintSimulated} disabled={loading}>
        {loading ? 'Capturando...' : 'Capturar Huella'}
      </button> 
      <p>{message}</p>
    </div>
  );
}

export default Huella;
