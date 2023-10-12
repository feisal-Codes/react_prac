const RadioButton = ({ label, name, onChange, value }) => {
  return (
    <label>
      {label}
      <input type="radio" value={value} name={name} onChange={onChange} />
    </label>
  );
};

export default RadioButton;
