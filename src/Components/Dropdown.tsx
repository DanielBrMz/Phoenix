// src/Dropdown.tsx
import React, { useState } from "react";
import styles from "~/styles/Dropdown.module.css";

interface DropdownProps {
  title: string;
  options: string[];
}

const Dropdown: React.FC<DropdownProps> = ({ title, options }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionChange = (option: string) => {
    if (selectedOptions.includes(option)) {
      setSelectedOptions(selectedOptions.filter((item) => item !== option));
    } else {
      setSelectedOptions([...selectedOptions, option]);
    }
  };

  const isOptionSelected = (option: string) => selectedOptions.includes(option);

  return (
    <div className="dropdown">
      <div className="dropdown-header" onClick={toggleDropdown}>
        {title}
        <span className={`dropdown-arrow ${isOpen ? "open" : ""}`}>▼</span>
      </div>
      {isOpen && (
        <ul className="dropdown-list">
          {options.map((option) => (
            <li key={option}>
              <label>
                <input
                  type="checkbox"
                  checked={isOptionSelected(option)}
                  onChange={() => handleOptionChange(option)}
                />
                {option}
              </label>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
