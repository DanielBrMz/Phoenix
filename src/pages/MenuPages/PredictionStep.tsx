import React from "react";
import useStore from "~/store/useStore";

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

  return (
    <div>
      <h1>Review your selection</h1>
      <p>Country: {country}</p>
      <p>State: {state}</p>
      <p>Wildfire: {wildfire}</p>
      <button onClick={onBack}>Go Back</button>
      <button onClick={handleReset}>Start Over</button>
    </div>
  );
};

export default PredictionStep;
