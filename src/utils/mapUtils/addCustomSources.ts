// addCustomSources.ts
import type { Map } from "mapbox-gl";
import createGeoJSONCircles from "../createGeoJSONSurface";
import { wildfiresDetails } from "~/data/wildfires";
import { createPredictionGeoJSON } from "./addHotspotsPrediction";

const addCustomSources = async (map: Map) => {
  map.addSource("mapbox-dem", {
    type: "raster-dem",
    url: "mapbox://mapbox.mapbox-terrain-dem-v1",
    tileSize: 512,
    maxzoom: 14,
  });

  wildfiresDetails.forEach((country) => {
    country.states.forEach((state) => {
      state.wildfires.forEach((wildfire) => {
        const sourceId = `wildfire-${wildfire.id}`;
        const geoJSONSource = createGeoJSONCircles(wildfire.coordinates, 0.5);
        map.addSource(sourceId, geoJSONSource);
      });
    });
  });

  const predictionData = await createPredictionGeoJSON();
  map.addSource("prediction-circles-source", {
    type: "geojson",
    data: predictionData,
  });

  console.log("Fuente 'prediction-circles-source' agregada al mapa");
};

export default addCustomSources;
