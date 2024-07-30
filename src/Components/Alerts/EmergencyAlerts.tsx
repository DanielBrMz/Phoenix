import React, { useEffect } from "react";
import mapboxgl, { Map } from "mapbox-gl";
import { loraDevices } from "~/data/loraDevices";

interface EmergencyAlertsProps {
  map: Map | null;
}

const EmergencyAlerts: React.FC<EmergencyAlertsProps> = ({ map }) => {
  useEffect(() => {
    if (!map) return;

    loraDevices.forEach((alert) => {
      const el = document.createElement("div");
      el.className = "marker";
      el.style.backgroundColor = "green";
      el.style.width = "20px";
      el.style.height = "20px";
      el.style.backgroundSize = "100%";
      el.style.borderRadius = "50%";

      new mapboxgl.Marker(el)
        .setLngLat(alert.coordinates as [number, number])
        .addTo(map);
    });
  }, [map]);

  return null;
};

export default EmergencyAlerts;
