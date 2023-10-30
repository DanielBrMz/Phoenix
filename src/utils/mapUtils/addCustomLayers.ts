import mapboxgl, { Map } from "mapbox-gl";

type SymbolLayout = mapboxgl.AnyLayout & {
  'text-field'?: string;
};

const addCustomLayers = (map: Map) => {
  const layers: mapboxgl.AnyLayer[] = map.getStyle().layers;
  const labelLayer = layers.find(
    (layer) => {
      const typedLayer = layer as mapboxgl.Layer & { layout?: SymbolLayout };
      return typedLayer.type === "symbol" && typedLayer.layout && typedLayer.layout["text-field"];
    }
  );


  map.addLayer({
    id: 'place-labels',
    source: 'composite',
    'source-layer': 'place_label',
    type: 'symbol',
    layout: {
      'text-field': ['get', 'name'],
      'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
      'text-size': 12,
    },
  });

  map.addLayer({
    id: "polygon",
    type: "heatmap",
    source: "polygon",
    layout: {},
    paint: {
      'heatmap-color': [
        'interpolate',
        ['linear'],
        ['heatmap-density'],
        0,
        'rgba(33,102,172,0)',
        0.2,
        'rgb(103,169,207)',
        0.4,
        'rgb(209,229,240)',
        0.6,
        'rgb(253,219,199)',
        0.8,
        'rgb(239,138,98)',
        1,
        'rgb(178,24,43)'
        ],
      "heatmap-opacity": 0.6,
      'heatmap-radius': {
        base: 5,
        stops: [[1, 100], [3, 50], [22, 100]],  // adjust as necessary to cover gaps
      },      "heatmap-intensity": [
      "interpolate",
      ["linear"],
      ["zoom"],
      15,
      20,
      22,
      1
    ],
    },
  });

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

}

export default addCustomLayers;
