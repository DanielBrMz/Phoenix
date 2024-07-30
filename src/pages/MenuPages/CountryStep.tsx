import React, { useState } from "react";
import wildfiresData from "~/data/wildfires";

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
    <div>
      <h2>Select a Country</h2>
      <div>
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
      <br />
      <button onClick={handleNext} disabled={!selectedCountry}>
        Ok
      </button>
      <button onClick={handleCancel}>Cancel</button>
    </div>
  );
};

export default CountryStep;
