import { Map } from "mapbox-gl";
import createGeoJSONCircles from "../createGeoJSONSurface";

const addCustomSources = (map: Map) => {

  map.addSource("mapbox-dem", {
    type: "raster-dem",
    url: "mapbox://mapbox.mapbox-terrain-dem-v1",
    tileSize: 512,
    maxzoom: 14,
  });

  map.addSource(
    "polygon",
    createGeoJSONCircles([-109.705057, 30.392632,], 0.5),
  );
}

export default addCustomSources;