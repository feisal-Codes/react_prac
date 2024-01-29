// App.js
import React, { useState } from "react";

const FormField = ({ onAdd }) => {
  const [field, setField] = useState({ type: "", label: "" });

  const handleAdd = () => {
    const type = prompt(
      "Enter field type (text, textarea, select, radio, checkbox):"
    );
    const label = prompt("Enter field label:");

    if (type && label) {
      onAdd({ type, label });
      setField({ type: "", label: "" });
    } else {
      alert("Type and label are required.");
    }
  };

  return (
    <div>
      <label>Type:</label>
      <input
        type="text"
        value={field.type}
        onChange={(e) => setField({ ...field, type: e.target.value })}
      />
      <label>Label:</label>
      <input
        type="text"
        value={field.label}
        onChange={(e) => setField({ ...field, label: e.target.value })}
      />
      <button onClick={handleAdd}>Add Field</button>
    </div>
  );
};

const FormRenderer = ({ formFields }) => {
  return (
    <form>
      {formFields.map((field, index) => (
        <div key={index}>
          <label>{field.label}:</label>
          {field.type === "text" && <input type="text" />}
          {field.type === "textarea" && <textarea />}
          {field.type === "select" && (
            <select>
              <option value="option1">Option 1</option>
              <option value="option2">Option 2</option>
              <option value="option3">Option 3</option>
            </select>
          )}
          {field.type === "radio" && (
            <div>
              <input type="radio" name={field.label} value="option1" /> Option 1
              <input type="radio" name={field.label} value="option2" /> Option 2
            </div>
          )}
          {field.type === "checkbox" && (
            <div>
              <input type="checkbox" name={field.label} value="option1" />{" "}
              Option 1
              <input type="checkbox" name={field.label} value="option2" />{" "}
              Option 2
            </div>
          )}
        </div>
      ))}
    </form>
  );
};

const App = () => {
  const [formFields, setFormFields] = useState([]);

  const addFormField = (field) => {
    setFormFields((prevFields) => [...prevFields, field]);
  };

  return (
    <div>
      <h1>Dynamic Form Builder</h1>
      <FormField onAdd={addFormField} />
      <FormRenderer formFields={formFields} />
    </div>
  );
};

export default App;
