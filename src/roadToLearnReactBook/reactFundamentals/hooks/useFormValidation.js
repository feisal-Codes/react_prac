import { useState } from "react";
let validEmail = /^\S+@\S+\.\S+$/;

const useFormValidation = (initialFields, initialerrors) => {
  const [values, setValues] = useState(initialFields);
  const [errors, setErrors] = useState(initialerrors);

  const validate = () => {
    let newErrors = {
      firstName: "",
      lastName: "",
      email: "",
    };

    if (!values.firstName) {
      newErrors.firstName = "First name is required";
    }

    if (!values.lastName) {
      newErrors.lastName = "Last name is required";
    }

    if (!values.email) {
      newErrors.email = "Email is required";
    } else if (!values.email.match(/^\S+@\S+\.\S+$/)) {
      newErrors.email = "Email is not valid";
    }

    setErrors(newErrors);

    // Check if there are any errors
    return Object.values(newErrors).every((error) => error === "");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let isValid = validate();
    if (isValid) {
      console.log("we submit the form here");
    } else {
      console.log("not valid");
    }
  };

  const handleChange = (e) => {
    let { name, value } = e.target;
    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));
    validate();
  };
  return [values, errors, handleChange, handleSubmit];
};

export default useFormValidation;
