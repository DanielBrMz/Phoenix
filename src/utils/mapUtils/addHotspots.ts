import hotspotsData from "~/data/layers/hotspots.json";

export const getHotspotCoordinates = () => {
  return hotspotsData.map((hotspot) => [hotspot.longitude, hotspot.latitude]);
};

export const createHotspotGeoJSON = () => {
  const features = getHotspotCoordinates().map((coordinates) => ({
    type: "Feature" as const, // Explicitly set type as 'Feature'
    geometry: {
      type: "Point" as const, // Explicitly set type as 'Point'
      coordinates: coordinates,
    },
    properties: {},
  }));

  return {
    type: "geojson" as const, // Explicitly set type as 'geojson'
    data: {
      type: "FeatureCollection" as const, // Explicitly set type as 'FeatureCollection'
      features: features,
    },
  };
};
