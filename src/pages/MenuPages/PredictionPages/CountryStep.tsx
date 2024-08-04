import React, { useState } from "react";
import { wildfiresDetails } from "~/data/wildfires";
import styles from "~/styles/NavbarStyles/PredictionSection.module.css";

interface Props {
  onNext: (country: string) => void;
}

const CountryStep: React.FC<Props> = ({ onNext }) => {
  const [selectedCountry, setSelectedCountry] = useState("");

  const handleNext = () => {
    if (selectedCountry) {
      onNext(selectedCountry);
    }
  };

  const handleCancel = () => {
    setSelectedCountry("");
  };

  const handleCountryClick = (country: string) => {
    setSelectedCountry(country);
  };

  return (
    <div className={styles.predictionStepContainer}>
      <h2 className={styles.predictionStepTitle}>SELECT COUNTRY</h2>
      <div className={styles.line}></div>
      <div className={styles.predictionStepSelections}>
        {wildfiresDetails.map((data) => (
          <p
            key={data.country}
            style={{
              cursor: "pointer",
              color: selectedCountry === data.country ? "#f57f61" : "white",
            }}
            onClick={() => handleCountryClick(data.country)}
            className={styles.predictionStepSelctionsText}
          >
            {data.country}
          </p>
        ))}
      </div>
      <div className={styles.line}></div>
      <div className={styles.predictionStepButtonContainer}>
        <button
          onClick={handleCancel}
          className={styles.predictionStepButtonCancel}
        >
          Cancel
        </button>
        <button
          onClick={handleNext}
          disabled={!selectedCountry}
          className={styles.predictionStepButtonOk}
          style={{ backgroundColor: selectedCountry ? "#f57f61" : "black" }}
        >
          Ok
        </button>
      </div>
    </div>
  );
};

export default CountryStep;
