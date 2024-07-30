import React, { useState, useEffect } from "react";
import wildfiresData from "~/data/wildfires";

interface Props {
  country: string;
  onBack: () => void;
  onNext: (state: string) => void;
}

const StateStep: React.FC<Props> = ({ country, onBack, onNext }) => {
  const [selectedState, setSelectedState] = useState<string>("");
  const [states, setStates] = useState<string[]>([]);

  useEffect(() => {
    if (wildfiresData[country]) {
      setStates(Object.keys(wildfiresData[country]));
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
    <div>
      <h2>Select a State in {country}</h2>
      <div>
        {states.map((state) => (
          <p
            key={state}
            onClick={() => handleStateClick(state)}
            style={{
              cursor: "pointer",
              fontWeight: selectedState === state ? "bold" : "normal",
            }}
          >
            {state}
          </p>
        ))}
      </div>

      <button onClick={onBack}>Cancel</button>
      <button onClick={handleNext} disabled={!selectedState}>
        Ok
      </button>
    </div>
  );
};

export default StateStep;
