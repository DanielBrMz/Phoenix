import React from "react";
import useStore from "~/store/useStore";
import { wildfiresDetails } from "~/data/wildfires";

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

  return (
    <div>
      <h1>Review your selection</h1>
      <p>Country: {country}</p>
      <p>State: {state}</p>
      <p>Wildfire: {wildfire}</p>
      <h2>WILDFIRE INFO</h2>
      {selectedWildfire && (
        <div>
          <p>Start Time: {selectedWildfire.actualData.startTime}</p>
          <p>End Time: {selectedWildfire.actualData.endTime}</p>
          <p>
            Wind Direction: {selectedWildfire.weatherConditions.windDirection}
          </p>
          <p>
            Wind Eye-Level: {selectedWildfire.weatherConditions.windEyeLevel}
          </p>
        </div>
      )}

      <button onClick={handleReset}>EXIT</button>
    </div>
  );
};

export default PredictionStep;
