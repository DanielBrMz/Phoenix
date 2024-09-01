import type { Map } from "mapbox-gl";
import createGeoJSONCircles from "../createGeoJSONSurface";
import { wildfiresDetails } from "~/data/wildfires";

const addCustomSources = (map: Map) => {
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
};

export default addCustomSources;
