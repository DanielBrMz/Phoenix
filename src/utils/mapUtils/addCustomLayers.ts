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

  // Añadir la capa de heatmap
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
        stops: [[1, 100], [3, 50], [22, 100]],  // Ajustar según sea necesario
      },
      "heatmap-intensity": [
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

// Agregar manejador de eventos de clic a la capa de heatmap
map.on('click', 'polygon', (e) => {
  const coordinates = e.lngLat;
  const fireData = {
    location: `${coordinates.lat.toFixed(2)}, ${coordinates.lng.toFixed(2)}`,
    intensity: "High", // Example, replace with real data
    detectedTime: "3:45 PM", // Example, replace with real data
    zoneImageUrl: "https://upload.wikimedia.org/wikipedia/commons/2/29/La_Pirinola_-_panoramio.jpg" // Reemplaza con la URL real de la imagen
  };

  const description = `
    <div class="bg-cream text-gray-800 font-sans text-base rounded-lg shadow-lg border-2 border-gray-800 custom-popup max-w-sm">
      <div class="bg-gray-700 p-2 rounded-t-lg text-center">
        <h3 class="font-bold text-white text-lg">Fire Detail</h3>
      </div>
      <div class="p-4">
        <p class="mb-2"><strong>Location:</strong> ${fireData.location}</p>
        <p class="mb-2"><strong>Intensity:</strong> ${fireData.intensity}</p>
        <p class="mb-2"><strong>Detection Time:</strong> ${fireData.detectedTime}</p>
        <div class="mb-2">
          <strong>Zone:</strong>
          <img src="${fireData.zoneImageUrl}" alt="Zone Image" class="mt-2 w-1/2 h-auto rounded-lg" />
        </div>
        <p>Additional information here.</p>
      </div>
    </div>
  `;

  new mapboxgl.Popup({ offset: 25, maxWidth: '400px' , className: 'p-0 bg-black'})
    .setLngLat(coordinates)
    .setHTML(description)
    .addTo(map);
});


  // Añadir capa de edificios 3D
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
