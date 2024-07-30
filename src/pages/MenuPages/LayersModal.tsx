import React from "react";
import { servicesDetails } from "~/data/layers/servicesDetails";
import useLayersStore from "~/store/layersStore";
import { StaticImageData } from "next/image";
import { Category, Service } from "~/types/layerInterfaces";

const LayersModal = () => {
  const { toggleLayer } = useLayersStore();

  const handleCheckboxChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    service: Service,
  ) => {
    toggleLayer(service);
  };

  const renderCheckboxes = (services: Service[]) => {
    return services.map((service) => (
      <div key={service.name}>
        <input
          type="checkbox"
          id={service.name}
          onChange={(e) => handleCheckboxChange(e, service)}
        />
        <label htmlFor={service.name}>{service.name}</label>
      </div>
    ));
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Dropdown Example</h1>
        {servicesDetails.map((category: Category) => (
          <div key={category.type}>
            <h2>{category.type}</h2>
            {renderCheckboxes(category.services)}
          </div>
        ))}
      </header>
    </div>
  );
};

export default LayersModal;
