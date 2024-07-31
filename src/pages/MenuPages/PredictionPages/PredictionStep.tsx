import React from "react";
import useStore from "~/store/useStore";
import { wildfiresDetails } from "~/data/wildfires";
import styles from "~/styles/NavbarStyles/WildfirePrediction.module.css";

interface Props {
  country: string;
  state: string;
  wildfire: string;
  onBack: () => void;
  onReset: () => void;
}

const PredictionStep: React.FC<Props> = ({
  country,
  state,
  wildfire,
  onBack,
  onReset,
}) => {
  const leavePredictionStep = useStore((state) => state.leavePredictionStep);

  const handleReset = () => {
    leavePredictionStep();
    onReset();
  };

  const selectedCountry = wildfiresDetails.find(
    (data) => data.country === country,
  );
  const selectedState = selectedCountry?.states.find((s) => s.name === state);
  const selectedWildfire = selectedState?.wildfires.find(
    (w) => w.name === wildfire,
  );

  const wildfireInfo = [
    {
      sectionTitle: "ACTUAL DATA",
      data: [
        { label: "Start Time", value: selectedWildfire?.actualData.startTime },
        { label: "End Time", value: selectedWildfire?.actualData.endTime },
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
            {selectedWildfire.name} WILDFIRE
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
      <button onClick={handleReset}>EXIT</button>
    </div>
  );
};

export default PredictionStep;
