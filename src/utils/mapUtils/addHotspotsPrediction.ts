// addHotspotsPrediction.ts

export const getPredictionCoordinates = async (): Promise<
  { coordinates: [number, number]; value: number }[]
> => {
  const response = await fetch("/prediction_data.json");
  const nestedPredictionData = await response.json();

  // Aplanar la estructura de arrays anidados y extraer latitud, longitud y valor
  return nestedPredictionData
    .flat()
    .map((point: { lat: number; lon: number; value: number }) => ({
      coordinates: [point.lon, point.lat],
      value: point.value,
    }));
};

export const createPredictionGeoJSON = async () => {
  const coordinatesWithValues = await getPredictionCoordinates();

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
