// addHotspotsPrediction.ts

// Update getPredictionCoordinates to handle cases where predictionData might be null or undefined
export const getPredictionCoordinates = (
  predictionData: any,
): { coordinates: [number, number]; value: number }[] => {
  // Ensure predictionData is valid before using .flat() and .filter()
  if (!predictionData || !Array.isArray(predictionData)) {
    console.warn("predictionData is null or not an array.");
    return []; // Return an empty array if predictionData is not available
  }

  // Flatten the nested array structure and extract latitude, longitude, and value
  return predictionData
    .flat()
    .filter(
      (point: { value: number }) =>
        point.value >= 0.000000001 && point.value <= 1,
    ) // Filter relevant values
    .map((point: { lat: number; lon: number; value: number }) => ({
      coordinates: [point.lon, point.lat],
      value: point.value,
    }));
};

// Create the function createPredictionGeoJSON using the rangeSlider data
export const createPredictionGeoJSON = (predictionData: any) => {
  const coordinatesWithValues = getPredictionCoordinates(predictionData);

  const features = coordinatesWithValues.map((point) => ({
    type: "Feature" as const,
    geometry: {
      type: "Point" as const,
      coordinates: point.coordinates,
    },
    properties: {
      value: point.value, // Add value as a property
    },
  }));

  return {
    type: "FeatureCollection" as const,
    features: features,
  };
};
