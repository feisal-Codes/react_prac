import React, { useState } from "react";
import useClickOutSide from "./hooks/useClickOutside";

const Count = () => {
  const [count, setCount] = useState(20);
  const handleClickOutside = () => {
    setCount(0);
    console.log("here");
  };
  const ref = useClickOutSide(handleClickOutside);
  const handleButtonClick = () => {
    setCount((prev) => prev + 1);
  };
  return (
    <div>
      <div style={{ border: "solid 2px black", padding: "20px" }}>
        <button ref={ref} onClick={handleButtonClick}>
          {count}
        </button>
      </div>
    </div>
  );
};

export default Count;
