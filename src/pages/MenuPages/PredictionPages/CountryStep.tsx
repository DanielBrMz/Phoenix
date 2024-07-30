import React, { useState } from "react";
import wildfiresData from "~/data/wildfires";
import styles from "~/styles/NavbarStyles/PredictionSection/CountryStep.module.css";

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
        {Object.keys(wildfiresData).map((country) => (
          <p
            key={country}
            style={{
              cursor: "pointer",
              fontWeight: selectedCountry === country ? "bold" : "normal",
            }}
            onClick={() => handleCountryClick(country)}
          >
            {country}
          </p>
        ))}
      </div>
      <div className={styles.line}></div>
      <button onClick={handleNext} disabled={!selectedCountry}>
        Ok
      </button>
      <button onClick={handleCancel}>Cancel</button>
    </div>
  );
};

export default CountryStep;
