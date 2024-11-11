// createPredictionGeoJSON.ts
import createGeoJSONCircles from "../createGeoJSONSurface";

export const createPredictionGeoJSON = async () => {
  const response = await fetch("/prediction_data.json");
  const nestedPredictionData = await response.json();

  console.log("Datos de predicción obtenidos:", nestedPredictionData);

  // Aplanar la estructura de arrays anidados y generar círculos
  const features = nestedPredictionData
    .flat()
    .map((point: { lat: number; lon: number; value: number }) => {
      const radius = point.value * 10; // Reduce el factor de escala a 100 para un tamaño de círculo menor
      return createGeoJSONCircles([point.lon, point.lat], radius);
    });

  // Combinar todas las características en una sola colección FeatureCollection
  return {
    type: "FeatureCollection" as const,
    features: features.flatMap((feature) => feature.data.features),
  };
};
