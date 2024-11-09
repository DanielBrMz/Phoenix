// PredictComponent.tsx
import { useEffect, useState } from "react";
import styles from "../styles/PredictionStyles/Prediction.module.css";

const PredictComponent: React.FC = () => {
  const [requestData, setRequestData] = useState(null);
  const [responseData, setResponseData] = useState(null); // Estado para guardar la respuesta de la API
  const [error, setError] = useState<string | null>(null);

  // Cargar los datos del archivo request_data.json
  useEffect(() => {
    const loadJSON = async () => {
      try {
        const response = await fetch("/request_data.json");
        if (!response.ok) throw new Error("Error al cargar el archivo JSON");
        const data = await response.json();
        setRequestData(data); // Almacenar el JSON completo en el estado
      } catch (err) {
        setError("Error al cargar el archivo de entrada.");
      }
    };
    loadJSON();
  }, []);

  const handlePredict = async () => {
    try {
      const response = await fetch("/api/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestData),
      });

      if (response.ok) {
        const data = await response.json();
        setResponseData(data); // Guardar la respuesta en el estado
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
      {responseData && <pre>{JSON.stringify(responseData, null, 2)}</pre>}{" "}
      {/* Mostrar la respuesta en formato JSON */}
      {error && <p>{error}</p>}
    </div>
  );
};

export default PredictComponent;
