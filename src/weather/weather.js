import { useState, useEffect } from "react";

const DisplayWeather = () => {
  const [temperature, setTemperature] = useState({
    temp: "",
    mode: "celcius"
  });
  const [clicked, setClicked] = useState(false);
  const [previousMode, setPreviousMode] = useState("celcius");
  const [initialTemp, setInitialTemp] = useState();

  const handleClick = (e) => {
    e.preventDefault();
    setClicked((prev) => !prev);
  };

  const handleChange = (e) => {
    let { name, value, id } = e.target;
    let newValue = id || value;
    setTemperature((prev) => {
      setPreviousMode(prev.mode);
      return { ...prev, [name]: newValue };
    });

    if (id) {
      setClicked((prev) => !prev);
    }
  };

  function convertTemperature(temperature) {
    let prevTemp = { ...temperature };
    if (prevTemp.mode === "celcius") {
      let calculatedTemp = ((Number(prevTemp.temp) - 32) * 5) / 9;
      return { ...prevTemp, temp: Math.trunc(calculatedTemp) };
    } else if (prevTemp.mode === "fahrenheit") {
      let calculatedTemp = (Number(prevTemp.temp) * 9) / 5 + 32;
      return { ...prevTemp, temp: Math.trunc(calculatedTemp) };
    }
  }

  useEffect(() => {
    if (temperature) {
      if (temperature.mode && temperature.temp) {
        //copy object
        if (initialTemp === undefined) {
          setInitialTemp(temperature);
        }
        setTemperature((prevTemp) => {
          if (temperature.mode !== previousMode) {
            setPreviousMode(temperature.mode);
            return convertTemperature(temperature);
          }
          return prevTemp;
        });
      }
    }
  }, [clicked]);

  return (
    <div style={{ marginTop: "50px", textAlign: "center" }}>
      <div>
        <input
          value={temperature.temp}
          onChange={handleChange}
          type="number"
          name="temp"
          placeholder="input initial temperature"
        />
        <div>
          <div
            style={{ display: "flex", gap: "5px", justifyContent: "center" }}
          >
            <input
              type="radio"
              name="mode"
              id="celcius"
              checked={temperature.mode === "celcius" ? true : false}
              value={temperature.mode}
              onChange={handleChange}
            />
            <h4>Celcius</h4>
          </div>
          <div
            style={{ display: "flex", gap: "5px", justifyContent: "center" }}
          >
            <input
              type="radio"
              name="mode"
              id="fahrenheit"
              value={temperature.mode}
              onChange={handleChange}
            />
            <h4>fahrenheit</h4>
          </div>
        </div>
      </div>

      <div>
        {temperature.mode && temperature.temp && (
          <h2>
            The weather Today is
            {previousMode === "celcius" && <span> {temperature.temp}°C</span>}
            {previousMode === "fahrenheit" && (
              <span> {temperature.temp}°F</span>
            )}
          </h2>
        )}

        <button
          disabled={temperature.temp === "" ? true : false}
          onClick={handleClick}
        >
          Toggle{" "}
        </button>
        <button
          disabled={!initialTemp ? true : false}
          onClick={() => {
            setTemperature((prev) => {
              return { ...initialTemp, mode: "celcius" };
            });
          }}
          style={{ marginLeft: "10px" }}
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default DisplayWeather;
