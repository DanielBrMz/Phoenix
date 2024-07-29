import mapboxgl, { Map } from "mapbox-gl";

type SymbolLayout = mapboxgl.AnyLayout & {
  "text-field"?: string;
};

const addCustomLayers = (map: Map) => {
  const layers: mapboxgl.AnyLayer[] = map.getStyle().layers;
  const labelLayer = layers.find((layer) => {
    const typedLayer = layer as mapboxgl.Layer & { layout?: SymbolLayout };
    return (
      typedLayer.type === "symbol" &&
      typedLayer.layout &&
      typedLayer.layout["text-field"]
    );
  });

  // Añade capa de etiquetas de lugares
  map.addLayer({
    id: "place-labels",
    source: "composite",
    "source-layer": "place_label",
    type: "symbol",
    layout: {
      "text-field": ["get", "name"],
      "text-font": ["DIN Offc Pro Medium", "Arial Unicode MS Bold"],
      "text-size": 12,
    },
  });

  // Añade capa de calor
  map.addLayer({
    id: "polygon",
    type: "heatmap",
    source: "polygon",
    layout: {},
    paint: {
      "heatmap-color": [
        "interpolate",
        ["linear"],
        ["heatmap-density"],
        0,
        "rgba(33,102,172,0)",
        0.2,
        "rgb(103,169,207)",
        0.4,
        "rgb(209,229,240)",
        0.6,
        "rgb(253,219,199)",
        0.8,
        "rgb(239,138,98)",
        1,
        "rgb(178,24,43)",
      ],
      "heatmap-opacity": 0.6,
      "heatmap-radius": 10, // Valor fijo para mantener el tamaño
      "heatmap-intensity": 1, // Valor fijo para mantener la intensidad
    },
  });

  // Añade capa de edificios 3D
  map.addLayer(
    {
      id: "add-3d-buildings",
      source: "composite",
      "source-layer": "building",
      filter: ["==", "extrude", "true"],
      type: "fill-extrusion",
      minzoom: 15,
      paint: {
        "fill-extrusion-color": "#aaa",
        "fill-extrusion-height": [
          "interpolate",
          ["linear"],
          ["zoom"],
          15,
          0,
          15.05,
          ["get", "height"],
        ],
        "fill-extrusion-base": [
          "interpolate",
          ["linear"],
          ["zoom"],
          15,
          0,
          15.05,
          ["get", "min_height"],
        ],
        "fill-extrusion-opacity": 0.6,
      },
    },
    labelLayer?.id,
  );
};

// Función para ajustar el radio del heatmap manualmente
export function setHeatmapRadius(map: Map, radius: number) {
  map.setPaintProperty("polygon", "heatmap-radius", radius);
}

export default addCustomLayers;
