// PredictComponent.tsx
import { useEffect, useState } from "react";
import styles from "../styles/PredictionStyles/Prediction.module.css";

interface PredictionData {
  lat: number;
  lon: number;
  value: number;
}

const PredictComponent: React.FC = () => {
  const [requestData, setRequestData] = useState(null);
  const [responseData, setResponseData] = useState<PredictionData[][] | null>(
    null,
  );
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadJSON = async () => {
      try {
        const response = await fetch("/request_data4.json");
        if (!response.ok) throw new Error("Error al cargar el archivo JSON");
        const data = await response.json();
        setRequestData(data);
      } catch (err) {
        setError("Error al cargar el archivo de entrada.");
      }
    };
    loadJSON();
  }, []);

  const handlePredict = async () => {
    if (!requestData) {
      setError("No hay datos de solicitud disponibles.");
      return;
    }

    try {
      const response = await fetch("/api/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestData),
      });

      if (response.ok) {
        const data: PredictionData[][] = await response.json();
        setResponseData(data);
        console.log("Respuesta de la API:", data);
      } else {
        const errorText = await response.text();
        setError(`Error: ${errorText}`);
      }
    } catch (err) {
      setError("Error al enviar la solicitud de predicción.");
    }
  };

  return (
    <div className={styles.hola}>
      <button onClick={handlePredict}>Enviar solicitud de predicción</button>

      {responseData && (
        <div>
          {responseData.map((frame, frameIndex) => (
            <div key={frameIndex}>
              <h3>Frame {frameIndex + 1}</h3>
              <ul>
                {frame.map((point, pointIndex) => (
                  <li key={pointIndex}>
                    Latitud: {point.lat}, Longitud: {point.lon}, Valor:{" "}
                    {point.value}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}

      {error && <p>{error}</p>}
    </div>
  );
};

export default PredictComponent;
