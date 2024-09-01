import React, { useEffect } from "react";
import useStore from "~/store/useStore";
import { wildfiresDetails } from "~/data/wildfires";
import styles from "~/styles/NavbarStyles/WildfirePrediction.module.css";
import { wildfiresStore } from "~/store/wildfiresStore";

interface Props {
  country: string;
  state: string;
  wildfire: string;
  onReset: () => void;
}

const PredictionStep: React.FC<Props> = ({
  country,
  state,
  wildfire,
  onReset,
}) => {
  const leavePredictionStep = useStore((state) => state.leavePredictionStep);
  const setSelectedWildfireId = wildfiresStore(
    (state) => state.setSelectedWildfireId,
  );

  // Aquí definimos selectedWildfire para que esté disponible en el alcance correcto.
  const selectedCountry = wildfiresDetails.find(
    (data) => data.country === country,
  );
  const selectedState = selectedCountry?.states.find((s) => s.name === state);
  const selectedWildfire = selectedState?.wildfires.find(
    (w) => w.name === wildfire,
  );

  useEffect(() => {
    if (selectedWildfire) {
      setSelectedWildfireId(selectedWildfire.id);
    }

    return () => {
      setSelectedWildfireId(null);
    };
  }, [selectedWildfire, setSelectedWildfireId]);

  const handleReset = () => {
    leavePredictionStep();
    onReset();
  };

  const wildfireInfo = [
    {
      sectionTitle: "ACTUAL DATA",
      data: [
        { label: "Start Time", value: selectedWildfire?.actualData.startTime },
        { label: "Sheltering", value: selectedWildfire?.actualData.sheltering },
        { label: "Live Moist", value: selectedWildfire?.actualData.liveMoist },
        {
          label: "Elev. Difference",
          value: selectedWildfire?.actualData.elevDifference,
        },
        { label: "Aspect", value: selectedWildfire?.actualData.aspect },
        { label: "Size", value: selectedWildfire?.actualData.size },
        { label: "Fuel", value: selectedWildfire?.actualData.fuel },
        { label: "Slope", value: selectedWildfire?.actualData.slope },
        { label: "Frp", value: selectedWildfire?.actualData.frp },
      ],
    },
    {
      sectionTitle: "WEATHER CONDITIONS",
      data: [
        {
          label: "Wind Direction",
          value: selectedWildfire?.weatherConditions.windDirection,
        },
        {
          label: "Wind Eye-Level",
          value: selectedWildfire?.weatherConditions.windEyeLevel,
        },
        {
          label: "Air Temp.",
          value: selectedWildfire?.weatherConditions.airTemp,
        },
        {
          label: "Rel. Humidity",
          value: selectedWildfire?.weatherConditions.relHumidity,
        },
        {
          label: "Precipitation",
          value: selectedWildfire?.weatherConditions.precipitation,
        },
        {
          label: "Shading",
          value: selectedWildfire?.weatherConditions.shading,
        },
        { label: "Clouds", value: selectedWildfire?.weatherConditions.clouds },
        {
          label: "Solar Radiation",
          value: selectedWildfire?.weatherConditions.solarRadiation,
        },
        {
          label: "Heat Index",
          value: selectedWildfire?.weatherConditions.heatIndex,
        },
        {
          label: "Brightness",
          value: selectedWildfire?.weatherConditions.brightness,
        },
      ],
    },
  ];

  return (
    <div className={styles.wildfirePredictionContainer}>
      {selectedWildfire && (
        <>
          <h2 className={styles.wildfirePredictionTitle}>
            {selectedWildfire.name}
          </h2>
          {wildfireInfo.map((section, index) => (
            <div key={index}>
              <div className={styles.wildfireSections}>
                <h1>{section.sectionTitle}</h1>
              </div>
              {section.data.map((item, idx) => (
                <div className={styles.wildfireDataLabelsContainer} key={idx}>
                  <p className={styles.labelTitle}>{item.label}</p>
                  <p className={styles.labelDescription}>{item.value}</p>
                </div>
              ))}
            </div>
          ))}
        </>
      )}
      <button onClick={handleReset} className={styles.predictionExitButton}>
        EXIT
      </button>
    </div>
  );
};

export default PredictionStep;
