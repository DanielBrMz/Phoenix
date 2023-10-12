import { Map } from "mapbox-gl";

const addCustomLayers = (map: Map) => {
  const layers = map.getStyle().layers as any;
      const labelLayerId = layers.find(
        (layer: any) => layer.type === "symbol" && layer.layout["text-field"],
      ).id;

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
    labelLayerId,
  );

}

export default addCustomLayers;