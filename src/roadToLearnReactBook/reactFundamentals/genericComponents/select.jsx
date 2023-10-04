const Select = ({ value, options, label, onChange }) => {
  return (
    <>
      <label>
        {label}
        <select value={value} onChange={onChange}>
          {options.map((option) => (
            <option value={option.value}>{option.label}</option>
          ))}
        </select>
      </label>
    </>
  );
};

export default Select;
