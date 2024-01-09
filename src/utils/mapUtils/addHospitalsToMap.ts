// addHospitalsToMap.ts
import type { Hospital } from "~/utils/hospitals"; 
import { Map, Marker, Popup } from "mapbox-gl";

const addHospitalsToMap = (map: Map, hospitals: Hospital[]) => {
  hospitals.forEach(hospital => {
    new Marker({ color: 'red' })
      .setLngLat(hospital.coords)
      .setPopup(new Popup({ offset: 25 }).setText(hospital.name))
      .addTo(map);
  });
};

export default addHospitalsToMap;
