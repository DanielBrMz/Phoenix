// addHotspotsPrediction.ts

// Cambiamos getPredictionCoordinates para aceptar datos de predicción como parámetro
export const getPredictionCoordinates = (
  predictionData: any,
): { coordinates: [number, number]; value: number }[] => {
  // Aplanar la estructura de arrays anidados y extraer latitud, longitud y valor
  return predictionData
    .flat()
    .filter(
      (point: { value: number }) =>
        point.value >= 0.000000001 && point.value <= 1,
    ) // Filtrar valores relevantes
    .map((point: { lat: number; lon: number; value: number }) => ({
      coordinates: [point.lon, point.lat],
      value: point.value,
    }));
};

// Creamos la función createPredictionGeoJSON que usa los datos del rangeSlider
export const createPredictionGeoJSON = (predictionData: any) => {
  const coordinatesWithValues = getPredictionCoordinates(predictionData);

  const features = coordinatesWithValues.map((point) => ({
    type: "Feature" as const,
    geometry: {
      type: "Point" as const,
      coordinates: point.coordinates,
    },
    properties: {
      value: point.value, // Agregar el valor como propiedad
    },
  }));

  return {
    type: "FeatureCollection" as const,
    features: features,
  };
};
