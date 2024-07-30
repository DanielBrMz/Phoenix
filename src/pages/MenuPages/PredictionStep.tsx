import React from "react";

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
  return (
    <div>
      <h1>Review your selection</h1>
      <p>Country: {country}</p>
      <p>State: {state}</p>
      <p>Wildfire: {wildfire}</p>
      <button onClick={onBack}>Go Back</button>
      <button onClick={onReset}>Start Over</button>
    </div>
  );
};

export default PredictionStep;
