const CheckBox = ({ label, value, onChange }) => {
  return (
    <>
      <label>
        <input
          label={label}
          type="checkbox"
          onChange={onChange}
          checked={value}
        />
        {label}
      </label>
    </>
  );
};

export default CheckBox;
