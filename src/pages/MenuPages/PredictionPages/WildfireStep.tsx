import React, { useState, useEffect } from "react";
import { wildfiresDetails } from "~/data/wildfires";
import styles from "~/styles/NavbarStyles/PredictionSection.module.css";

interface Props {
  country: string;
  state: string;
  onBack: () => void;
  onNext: (wildfire: string) => void;
}

const WildfireStep: React.FC<Props> = ({ country, state, onBack, onNext }) => {
  const [selectedWildfire, setSelectedWildfire] = useState<string>("");
  const [wildfires, setWildfires] = useState<string[]>([]);

  useEffect(() => {
    const selectedCountry = wildfiresDetails.find(
      (data) => data.country === country,
    );
    if (selectedCountry) {
      const selectedState = selectedCountry.states.find(
        (s) => s.name === state,
      );
      if (selectedState) {
        setWildfires(selectedState.wildfires.map((wildfire) => wildfire.name));
      }
    }
  }, [country, state]);

  const handleNext = () => {
    if (selectedWildfire) {
      onNext(selectedWildfire);
    }
  };

  const handleWildfireClick = (wildfire: string) => {
    setSelectedWildfire(wildfire);
  };

  return (
    <div className={styles.predictionStepContainer}>
      <h2 className={styles.predictionStepTitle}>SELECT WILDFIRE</h2>
      <div className={styles.line}></div>
      <div className={styles.predictionStepSelections}>
        {wildfires.map((wildfire) => (
          <p
            key={wildfire}
            onClick={() => handleWildfireClick(wildfire)}
            style={{
              cursor: "pointer",
              color: selectedWildfire === wildfire ? "#f57f61" : "white",
            }}
            className={styles.predictionStepSelctionsText}
          >
            {wildfire}
          </p>
        ))}
      </div>
      <div className={styles.line}></div>
      <div className={styles.predictionStepButtonContainer}>
        <button onClick={onBack} className={styles.predictionStepButtonCancel}>
          CANCEL
        </button>
        <button
          onClick={handleNext}
          disabled={!selectedWildfire}
          className={styles.predictionStepButtonOk}
          style={{ backgroundColor: selectedWildfire ? "#f57f61" : "black" }}
        >
          OK
        </button>
      </div>
    </div>
  );
};

export default WildfireStep;
