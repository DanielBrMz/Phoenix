import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import wildfiresData from "~/data/wildfires";

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
    if (wildfiresData[country] && wildfiresData[country][state]) {
      setWildfires(wildfiresData[country][state]);
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
    <div>
      <h2>
        Fires in {state}, {country}
      </h2>
      <div>
        {wildfires.map((wildfire) => (
          <p
            key={state}
            onClick={() => handleWildfireClick(wildfire)}
            style={{
              cursor: "pointer",
              fontWeight: selectedWildfire === wildfire ? "bold" : "normal",
            }}
          >
            {wildfire}
          </p>
        ))}
      </div>

      <button onClick={onBack}>Go Back</button>
      <button onClick={handleNext} disabled={!selectedWildfire}>
        Next
      </button>
    </div>
  );
};

export default WildfireStep;
