import React, { useEffect } from "react";
import mapboxgl, { Map } from "mapbox-gl";
import { emergencyServices } from "../data/emergencyServices";

interface EmergencyServicesLayerProps {
  map: Map | null;
}

const EmergencyServicesLayer: React.FC<EmergencyServicesLayerProps> = ({
  map,
}) => {
  useEffect(() => {
    if (!map) return;

    emergencyServices.forEach((service) => {
      const el = document.createElement("div");
      el.className = "marker";
      el.style.backgroundImage = `url(${service.icon.src})`;
      el.style.width = "32px";
      el.style.height = "32px";
      el.style.backgroundSize = "100%";

      new mapboxgl.Marker(el)
        .setLngLat(service.coordinates as [number, number])
        .addTo(map);
    });
  }, [map]);

  return null;
};

export default EmergencyServicesLayer;
