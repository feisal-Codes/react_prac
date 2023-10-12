const Select = ({ label, name, value, onChange, options }) => {
  return (
    <label>
      <span style={{ marginRight: "5px" }}>{label}</span>
      <select name={name} value={value} onChange={onChange}>
        <option value="">Select an option</option>
        {options.map((option, idx) => (
          <option value={option} key={idx}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
};

export default Select;
