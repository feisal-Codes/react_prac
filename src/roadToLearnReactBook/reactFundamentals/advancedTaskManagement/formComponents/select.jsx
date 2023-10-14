import React from "react";

const Select = ({ label, onChange, options, value }) => {
  return (
    <label>
      {label}
      <select onChange={onChange} value={value}>
        <option value="" disabled>
          Users
        </option>
        {options.map((user) => (
          <option key={user.id} value={user.id}>
            {user.name}
          </option>
        ))}
      </select>
    </label>
  );
};

export default Select;
