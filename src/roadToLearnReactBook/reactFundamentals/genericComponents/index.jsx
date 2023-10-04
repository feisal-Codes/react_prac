import { useState } from "react";
import RadioButton from "./radioButton";
import CheckBox from "./checkbox";
import Select from "./select";

const GenericComponents = () => {
  //   const [catPerson, setCatPerson] = useState(false);
  //   const [dogPerson, setDogPerson] = useState(false);
  const [favourite, setFavourite] = useState("dog");
  const [checked, setChecked] = useState(false);
  const [value, setValue] = useState("fruit");

  const options = [
    { label: "Fruit", value: "fruit" },
    { label: "Vegetable", value: "vegetable" },
    { label: "Meat", value: "meat" },
  ];

  const handleCatChange = () => {
    setFavourite("cat");
  };

  const handleDogChange = () => {
    setFavourite("dog");
  };

  const handleCowChange = () => {
    setFavourite("cow");
  };

  const handleLionChange = () => {
    setFavourite("lion");
  };

  const handleChange = () => {
    setChecked(!checked);
  };

  const handleSelectChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <>
      <div>
        <RadioButton
          label="Cat"
          value={favourite === "cat"}
          onChange={handleCatChange}
        />
        <RadioButton
          label="Dog"
          value={favourite === "dog"}
          onChange={handleDogChange}
        />
      </div>
      <div>
        <RadioButton
          label="Cow"
          value={favourite === "cow"}
          onChange={handleCowChange}
        />
        <RadioButton
          label="Lion"
          value={favourite === "lion"}
          onChange={handleLionChange}
        />
        <CheckBox label="complete" value={checked} onChange={handleChange} />
      </div>
      <div>
        <Select
          value={value}
          options={options}
          label="food"
          onChange={handleSelectChange}
        />
      </div>
    </>
  );
};

export default GenericComponents;
