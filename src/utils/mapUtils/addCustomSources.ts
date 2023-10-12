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
    createGeoJSONCircles([-110.934463, 29.160402], 0.5),
  );
}

export default addCustomSources;