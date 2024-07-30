import React, { useState } from "react";
import { servicesDetails } from "~/data/layers/servicesDetails";
import useLayersStore from "~/store/layersStore";
import { Category, Service } from "~/types/layerInterfaces";
import styles from "~/styles/NavbarStyles/LayersModal.module.css";

const LayersModal = () => {
  const { toggleLayer } = useLayersStore();
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const handleCheckboxChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    service: Service,
  ) => {
    toggleLayer(service);
  };

  const toggleDropdown = (category: string) => {
    setActiveCategory(activeCategory === category ? null : category);
  };

  const renderCheckboxes = (services: Service[]) => {
    return services.map((service) => (
      <div key={service.name} className={styles.checkboxContainer}>
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
    <div className={styles.layersContainer}>
      {servicesDetails.map((category: Category) => (
        <div key={category.type} className={styles.categoryContainer}>
          <button
            className={styles.categoryButton}
            onClick={() => toggleDropdown(category.type)}
          >
            {category.type}
          </button>
          {activeCategory === category.type && (
            <div className={styles.dropdownContent}>
              {renderCheckboxes(category.services)}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default LayersModal;
