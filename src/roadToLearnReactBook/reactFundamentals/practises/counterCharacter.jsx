import React, { useState } from "react";

const CounterCharacter = () => {
  const [count, setCount] = useState(0);
  const [error, setError] = useState("");
  const handleChange = (e) => {
    console.log(e.target.value.length);
    if (e.target.value.length > 100) {
      setError("count should not exceed 100");
      return;
    }
    setError("");
    setCount(e.target.value);
  };
  return (
    <div>
      <input value={count} onChange={handleChange} type="text" />
      <div>Counter: {count}</div>
      {error && <h4>{error}</h4>}

      <button
        onClick={() => {
          setCount(0);
          setError("");
        }}
      >
        Reset
      </button>
    </div>
  );
};

export default CounterCharacter;
