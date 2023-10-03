import { useState } from "react";
const Task = ({ tasks }) => {
  const styles = { textDecoration: "line-through" };
  const [checked, setChecked] = useState(tasks.map((task) => task.completed));
  console.log(checked);
  const [data, setData] = useState(tasks);
  const handleClick = (id) => {
    setData(() => {
      return data.map((task) => {
        console.log("herererere");
        if (task.id === id) {
          return { ...task, completed: !task.completed };
        }
        return task;
      });
    });
  };
  return (
    <>
      {data.map((task, pos) => {
        return (
          <div
            key={task.id}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <input
              onChange={() => handleClick(task.id)}
              checked={task.completed}
              type="checkbox"
              id={task.id}
              value={task.name}
            />

            <p
              onClick={() => handleClick(task.id)}
              style={task.completed ? styles : {}}
            >
              {task.name}
            </p>
          </div>
        );
      })}
    </>
  );
};

export default Task;
