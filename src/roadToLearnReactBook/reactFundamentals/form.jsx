import useFormValidation from "./hooks/useFormValidation";

const Form = () => {
  const initialFields = {
    firstName: "",
    lastName: "",
    email: "",
  };

  const initialErrors = {
    fisrtName: "",
    lastName: "",
    email: "",
  };
  const [fields, errors, handleChange, handleSubmit] = useFormValidation(
    initialFields,
    initialErrors
  );

  return (
    <div style={{ display: "flex", gap: "20px", flexDirection: "column" }}>
      <div>
        <input
          type="text"
          placeholder="enter first name"
          value={fields.firstName}
          onChange={handleChange}
          name="firstName"
        />
        {errors.firstName && <p>{errors.firstName}</p>}
      </div>
      <div>
        <input
          type="text"
          placeholder="enter last name"
          value={fields.lastName}
          onChange={handleChange}
          name="lastName"
        />
        {errors.lastName && <p>{errors.lastName}</p>}
      </div>
      <div>
        <input
          type="email"
          placeholder="enter email"
          value={fields.email}
          onChange={handleChange}
          name="email"
        />
        {errors.email && <p>{errors.email}</p>}
      </div>
      <button onClick={handleSubmit}>Submit the form </button>
    </div>
  );
};

export default Form;
