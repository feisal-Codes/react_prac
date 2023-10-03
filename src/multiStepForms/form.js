import { useState } from "react";

const MultiStepForms = () => {
  const [steps, setStep] = useState(1);
  let arr = ["personal details", "Address ", "Billing ", "Review"];
  const [formData, setFormData] = useState({
    1: {
      name: "",
      email: ""
    },
    2: {
      address: "",
      location: ""
    },
    3: {
      card: "",
      cvv: ""
    }
  });
  console.log(formData);
  const handleChange = (e) => {
    console.log(formData);
    let { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [steps]: { ...prev[steps], [name]: value }
    }));
  };
  return (
    <div>
      <div>
        {[...Array(4)].map((step, idx) => (
          <div> {arr[idx]}</div>
        ))}
      </div>
      {steps === 1 && (
        <div>
          <h3>Personal Details</h3>
          <input
            type="text"
            name="name"
            value={formData?.step1?.name}
            onChange={handleChange}
          />
          <input
            type="text"
            name="email"
            value={formData?.step1?.email}
            onChange={handleChange}
          />
        </div>
      )}
      {steps === 2 && (
        <div>
          <h3>Address</h3>
          <input
            type="text"
            name="address"
            value={formData?.step2?.address}
            onChange={handleChange}
          />
          <input
            type="text"
            name="location"
            value={formData?.step2?.location}
            onChange={handleChange}
          />
        </div>
      )}
      {steps === 3 && (
        <div>
          <h3>Address</h3>
          <input
            type="number"
            name="card"
            value={formData?.step3?.card}
            onChange={handleChange}
          />
          <input
            type="text"
            name="cvv"
            value={formData?.step3?.cvv}
            onChange={handleChange}
          />
        </div>
      )}
      {steps === 4 && <h3>Review and Submit</h3>}

      <button
        onClick={() => {
          setStep((prev) => (prev !== 1 ? prev - 1 : prev));
        }}
      >
        Previous
      </button>
      <button
        onClick={() => {
          setStep((prev) => (prev !== 4 ? prev + 1 : prev));
        }}
      >
        Next
      </button>
    </div>
  );
};

export default MultiStepForms;
