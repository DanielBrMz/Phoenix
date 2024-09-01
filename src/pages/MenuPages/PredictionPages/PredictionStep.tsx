import React, { useEffect } from "react";
import useStore from "~/store/useStore";
import { wildfiresDetails } from "~/data/wildfires";
import styles from "~/styles/NavbarStyles/WildfirePrediction.module.css";
import { wildfiresStore } from "~/store/wildfiresStore";
import mapboxgl from "mapbox-gl"; // Import mapbox-gl

interface Props {
  country: string;
  state: string;
  wildfire: string;
  onReset: () => void;
  map: mapboxgl.Map | null; // Pass the map instance as a prop
}

const PredictionStep: React.FC<Props> = ({
  country,
  state,
  wildfire,
  onReset,
  map,
}) => {
  const leavePredictionStep = useStore((state) => state.leavePredictionStep);
  const setSelectedWildfireId = wildfiresStore(
    (state) => state.setSelectedWildfireId,
  );

  const selectedCountry = wildfiresDetails.find(
    (data) => data.country === country,
  );
  const selectedState = selectedCountry?.states.find((s) => s.name === state);
  const selectedWildfire = selectedState?.wildfires.find(
    (w) => w.name === wildfire,
  );

  useEffect(() => {
    if (selectedWildfire) {
      setSelectedWildfireId(selectedWildfire.id, selectedWildfire.coordinates);

      // Fly to the selected wildfire's coordinates
      if (map) {
        map.flyTo({
          center: selectedWildfire.coordinates,
          zoom: 15,
          speed: 0.8,
          curve: 1,
          easing(t) {
            return t;
          },
        });
      }
    }

    return () => {
      setSelectedWildfireId(null, null);
    };
  }, [selectedWildfire, setSelectedWildfireId, map]);

  const handleReset = () => {
    leavePredictionStep();
    onReset();
  };

  // (rest of your component code...)
};

export default PredictionStep;
