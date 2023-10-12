import React from "react";

const RadioButton = ({ name, checked, value, onChange, label }) => {
  return (
    <label>
      <input
        type="radio"
        checked={checked}
        name={name}
        value={value}
        onChange={onChange}
      />
      {label}
    </label>
  );
};

export default RadioButton;
