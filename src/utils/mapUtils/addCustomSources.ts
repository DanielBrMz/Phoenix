import type {Map} from "mapbox-gl";
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
    createGeoJSONCircles([-110.8968082457804, 31.26933620026809], 0.5),
  );
}

export default addCustomSources;
