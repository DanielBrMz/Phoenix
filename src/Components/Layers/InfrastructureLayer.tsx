import React, { useEffect } from "react";
import mapboxgl, { Map } from "mapbox-gl";
import { infrastructure } from "../../data/infrastructure";

interface InfrastructureLayerProps {
  map: Map | null;
}

const InfrastructureLayer: React.FC<InfrastructureLayerProps> = ({ map }) => {
  useEffect(() => {
    if (!map) return;

    infrastructure.forEach((infrastructure) => {
      const el = document.createElement("div");
      el.className = "marker";
      el.style.backgroundImage = `url(${infrastructure.icon.src})`;
      el.style.width = "32px";
      el.style.height = "32px";
      el.style.backgroundSize = "100%";

      new mapboxgl.Marker(el)
        .setLngLat(infrastructure.coordinates as [number, number])
        .addTo(map);
    });
  }, [map]);

  return null;
};

export default InfrastructureLayer;
