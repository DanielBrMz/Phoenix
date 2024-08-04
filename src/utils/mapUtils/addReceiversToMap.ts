import type { Receiver } from "~/utils/receivers";
import type { Map, MapMouseEvent } from "mapbox-gl";

const addReceiversToMap = (
  map: Map,
  receivers: Receiver[],
  onReceiverClick: (e: MapMouseEvent, receiver: Receiver) => void,
) => {
  receivers.forEach((receiver) => {
    const sourceId = `circle-source-${receiver.id}`;
    map.addSource(sourceId, {
      type: "geojson",
      data: {
        type: "FeatureCollection",
        features: [
          {
            geometry: {
              type: "Point",
              coordinates: receiver.coords,
            },
            type: "Feature",
            properties: {},
          },
        ],
      },
    });

    const layerId = `circle-layer-${receiver.id}`;

    map.addLayer({
      id: layerId,
      type: "circle",
      source: sourceId,
      paint: {
        "circle-radius": 7,
        "circle-color": "#00FF00",
      },
    });

    map.on("click", layerId, function (e) {
      onReceiverClick(e, receiver);
    });
  });
};

export default addReceiversToMap;
