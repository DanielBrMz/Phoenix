import hotspotsData from "~/data/layers/hotspots.json";

export const getHotspotCoordinates = () => {
  return hotspotsData.map((hotspot) => [hotspot.longitude, hotspot.latitude]);
};

export const createHotspotGeoJSON = () => {
  const features = getHotspotCoordinates().map((coordinates) => ({
    type: "Feature" as const,
    geometry: {
      type: "Point" as const,
      coordinates: coordinates,
    },
    properties: {},
  }));

  return {
    type: "FeatureCollection" as const, // Return the FeatureCollection directly
    features: features,
  };
};
