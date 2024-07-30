import React from "react";
import Dropdown from "../../Components/Dropdown";

const LayersModal = () => {
  const options = ["Option 1", "Option 2", "Option 3"];

  return (
    <div className="App">
      <header className="App-header">
        <h1>LAYERS</h1>
        <Dropdown title="Select options" options={options} />
      </header>
    </div>
  );
};
export default LayersModal;
