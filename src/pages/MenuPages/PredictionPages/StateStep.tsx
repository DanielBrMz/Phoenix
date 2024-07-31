import React, { useState, useEffect } from "react";
import { wildfiresDetails } from "~/data/wildfires";
import styles from "~/styles/NavbarStyles/PredictionSection.module.css";

interface Props {
  country: string;
  onBack: () => void;
  onNext: (state: string) => void;
}

const StateStep: React.FC<Props> = ({ country, onBack, onNext }) => {
  const [selectedState, setSelectedState] = useState<string>("");
  const [states, setStates] = useState<string[]>([]);

  useEffect(() => {
    const selectedCountry = wildfiresDetails.find(
      (data) => data.country === country,
    );
    if (selectedCountry) {
      setStates(selectedCountry.states.map((state) => state.name));
    }
  }, [country]);

  const handleNext = () => {
    if (selectedState) {
      onNext(selectedState);
    }
  };

  const handleStateClick = (state: string) => {
    setSelectedState(state);
  };

  return (
    <div className={styles.predictionStepContainer}>
      <h2 className={styles.predictionStepTitle}>SELECT STATE</h2>
      <div className={styles.line}></div>
      <div className={styles.predictionStepSelections}>
        {states.map((state) => (
          <p
            key={state}
            onClick={() => handleStateClick(state)}
            style={{
              cursor: "pointer",
              color: selectedState === state ? "#f57f61" : "white",
            }}
            className={styles.predictionStepSelctionsText}
          >
            {state}
          </p>
        ))}
      </div>
      <div className={styles.line}></div>
      <div className={styles.predictionStepButtonContainer}>
        <button onClick={onBack} className={styles.predictionStepButtonCancel}>
          Cancel
        </button>
        <button
          onClick={handleNext}
          disabled={!selectedState}
          className={styles.predictionStepButtonOk}
          style={{ backgroundColor: selectedState ? "#f57f61" : "black" }}
        >
          Ok
        </button>
      </div>
    </div>
  );
};

export default StateStep;
