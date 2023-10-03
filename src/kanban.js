import { useState } from "react";

function Assembly({ list }) {
  const [task, setTask] = useState("");
  const [items, setItems] = useState(list.map((element) => []));

  const handleChange = (e) => {
    setTask(e.target.value);
  };

  const handleClick = (e, _idx, idx) => {
    e.preventDefault();
    let leftClick = e.button === 0;
    let rightClick = e.button === 2;
    let lastElement;
    let firstElement;

    setItems((prev) => {
      const newArray = prev.map((subarray, index) => {
        if (index === idx) {
          if (_idx < subarray.length - 1 && rightClick) {
            // Swap elements within the subarray
            const updatedSubarray = [...subarray];
            updatedSubarray[_idx] = subarray[_idx + 1];
            updatedSubarray[_idx + 1] = subarray[_idx];
            return updatedSubarray;
          } else if (rightClick && _idx === subarray.length - 1) {
            // Move the last element to the next array
            lastElement = subarray[subarray.length - 1];
            return subarray.slice(0, -1);
          } else if (leftClick && _idx === 0 && index !== 0) {
            // Left-click on the first element in the array
            console.log("here weare the first elemnt and the last one");
            firstElement = subarray[_idx];

            console.log(firstElement);
            return subarray.slice(1);
          }
        } else if (index === idx + 1 && lastElement !== undefined) {
          // Add the last element to the next array
          return [lastElement, ...subarray];
        } else if (index === idx - 1 && firstElement !== undefined) {
          // Add the last element to the next array
          return [...subarray, firstElement];
        }
        return subarray;
      });
      console.log(newArray);
      return newArray;
    });
  };

  const submit = (e) => {
    e.preventDefault();
    setItems((prev) => {
      return prev.map((subarray, index) => {
        if (index === 0) {
          return [task, ...subarray];
        } else {
          return subarray;
        }
      });
    });
  };
  return (
    <div>
      <h2>assembly line</h2>
      <form onSubmit={submit}>
        <input
          type="text"
          placeholder="enter task"
          value={task}
          onChange={handleChange}
        />
        <button type="submit">Add Task</button>
      </form>

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
          marginTop: "30px"
        }}
      >
        {list.map((element, idx) => (
          <div
            key={idx}
            style={{
              display: "flex",
              flexDirection: "column"
            }}
          >
            <h4>{element}</h4>
            <div style={{ display: "flex", flexDirection: "column" }}>
              {items[idx].map((element, _idx) => (
                <button
                  onContextMenu={(event) => {
                    handleClick(event, _idx, idx);
                  }}
                  onClick={(event) => {
                    handleClick(event, _idx, idx);
                  }}
                  key={_idx}
                >
                  {element}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Assembly;
