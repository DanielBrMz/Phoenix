import React from "react";
import Dropdown from "../../Components/Dropdown";
import {
  emergencyServicesList,
  infrastructureList,
} from "../../data/layers/layersList";

const LayersModal = () => {
  const layersList = [emergencyServicesList, infrastructureList];

  return (
    <div className="App">
      <header className="App-header">
        <h1>Dropdown Example</h1>
        {layersList.map((layer, index) => (
          <Dropdown key={index} title={layer.type} options={layer.services} />
        ))}
      </header>
    </div>
  );
};
export default LayersModal;
