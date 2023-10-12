const Input = ({ value, name, id, label, onChange }) => {
  return (
    <label>
      <input
        type="text"
        placeholder={label}
        value={value}
        name={name}
        id={id}
        onChange={onChange}
      />
    </label>
  );
};

export default Input;
