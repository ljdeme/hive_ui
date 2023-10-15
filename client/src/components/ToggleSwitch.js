import React, { useState } from "react";
import "../css/ToggleSwitch.css";

const ToggleSwitch = ({ onToggle }) => {
  const [isChecked, setIsChecked] = useState(false);

  const toggleSwitch = () => {
    setIsChecked(!isChecked);
    // Call the onToggle function when the switch is toggled
    if (onToggle) {
      onToggle();
    }
  };
  return (
    <label className="toggle-switch">
      <input 
        type="checkbox" 
        checked={isChecked}
        onChange={toggleSwitch}
      />
      <span className="switch" />
    </label>
  );
};

export default ToggleSwitch;