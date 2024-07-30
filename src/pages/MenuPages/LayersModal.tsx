import React from "react";
import {
  emergencyServicesDetails,
  infrastructureDetails,
} from "~/data/layers/servicesDetails";
import useLayersStore from "~/store/layersStore";

const LayersModal = () => {
  const { addLayer, removeLayer } = useLayersStore();

  const handleCheckboxChange = (event, service) => {
    if (event.target.checked) {
      addLayer(service);
    } else {
      removeLayer(service.id);
    }
  };

  const renderCheckboxes = (details) => {
    return details.map((service) => (
      <div key={service.id}>
        <input
          type="checkbox"
          id={service.id}
          onChange={(e) => handleCheckboxChange(e, service)}
        />
        <label htmlFor={service.id}>{service.name}</label>
      </div>
    ));
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Dropdown Example</h1>
        <div>
          <h2>Emergency Services</h2>
          {renderCheckboxes(emergencyServicesDetails)}
        </div>
        <div>
          <h2>Infrastructure</h2>
          {renderCheckboxes(infrastructureDetails)}
        </div>
      </header>
    </div>
  );
};

export default LayersModal;
