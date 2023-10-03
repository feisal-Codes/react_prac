import React, { useEffect, useState } from "react";

const TaskList = () => {
  const [userInput, setUserInput] = useState({
    title: "",
    description: "",
    status: ""
  });
  const [tasks, setTasks] = useState([]);
  const [taskId, setTaskId] = useState(0);
  const [incomplete, setIncomplete] = useState();
  const [filter, setFilter] = useState({
    showAll: true,
    completed: false,
    incomplete: false
  });
  const [filteredTasks, setFilteredTasks] = useState([]); // Separate state for filtered tasks

  useEffect(() => {
    setTaskId((prev) => prev + 1);
    setIncomplete(() => {
      return tasks.find((task) => task.status === "incomplete");
    });
  }, [tasks]);

  useEffect(() => {
    // Apply filters to tasks when filter state changes
    let updatedTasks = filterTasks();
    setFilteredTasks(updatedTasks);
  }, [filter, tasks]);

  const filterTasks = () => {
    return tasks.filter((task) => {
      if (filter.showAll) {
        return true;
      }
      if (filter.completed && task.status === "completed") {
        return true;
      }
      if (filter.incomplete && task.status === "incomplete") {
        return true;
      }
      return false;
    });
  };

  const toggleCompletionStatus = (taskId) => {
    let updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        return {
          ...task,
          status: task.status === "completed" ? "incomplete" : "completed"
        };
      }
      return task;
    });

    setTasks(updatedTasks);
    setIncomplete(undefined);
  };

  const handleChange = (e) => {
    const { name, value, id } = e.target;
    let newValue = id ? id : value;
    setUserInput((prevState) => ({ ...prevState, [name]: newValue }));
  };

  const handleFilter = (e) => {
    const { id } = e.target;

    setFilter({
      showAll: id === "showAll",
      completed: id === "completed",
      incomplete: id === "incomplete"
    });
  };

  const handleClick = (e) => {
    e.preventDefault();

    if (userInput.title && userInput.description && userInput.status) {
      setTasks((prev) => [...prev, { id: taskId, ...userInput }]);
    }
    setUserInput({
      title: "",
      description: "",
      status: ""
    });
  };

  const clearCompleted = () => {
    let incompleteTasks = filteredTasks.filter(
      (task) => task.status !== "completed"
    );
    setFilteredTasks(incompleteTasks);
  };

  return (
    <>
      <div>
        <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
          <input
            type="text"
            placeholder="add new task title"
            name="title"
            value={userInput.title}
            onChange={handleChange}
          />
          <input
            type="text"
            name="description"
            placeholder="add new description"
            value={userInput.description}
            onChange={handleChange}
          />
        </div>
        <div style={{ display: "flex", gap: "5px" }}>
          <input
            type="radio"
            id="completed"
            checked={userInput.status === "completed"}
            value="completed"
            onChange={handleChange}
            name="status"
          />
          <h4>Completed</h4>
        </div>
        <div style={{ display: "flex", gap: "5px" }}>
          <input
            type="radio"
            id="incomplete"
            name="status"
            checked={userInput.status === "incomplete"}
            value="incomplete"
            onChange={handleChange}
          />
          <h4>Incomplete</h4>
        </div>
        <button onClick={handleClick}>Add Task</button>
      </div>
      <h2>Our Tasks Appear here!</h2>
      <div>
        {filteredTasks.length > 0 &&
          filteredTasks.map((task) => {
            return (
              <div key={task.id}>
                <h4>{task.title}</h4>
                <h4>{task.description}</h4>
                <button
                  onClick={() => {
                    toggleCompletionStatus(task.id);
                  }}
                >
                  {task.status === "completed"
                    ? "Mark as Incomplete"
                    : "Mark as Completed"}
                </button>
              </div>
            );
          })}
      </div>
      <div>
        {incomplete && (
          <button onClick={clearCompleted}>Clear Completed</button>
        )}
      </div>

      <div>
        {tasks.length > 0 && (
          <>
            <h4>Available Filters</h4>
            <div>
              <div style={{ display: "flex", gap: "5px" }}>
                <input
                  type="radio"
                  id="showAll"
                  checked={filter.showAll}
                  onChange={handleFilter}
                  name="filter"
                />
                <h4>Show All</h4>
              </div>
              <div style={{ display: "flex", gap: "5px" }}>
                <input
                  type="radio"
                  id="completed"
                  checked={filter.completed}
                  onChange={handleFilter}
                  name="filter"
                />
                <h4>Completed Tasks</h4>
              </div>
              <div style={{ display: "flex", gap: "5px" }}>
                <input
                  type="radio"
                  id="incomplete"
                  checked={filter.incomplete}
                  onChange={handleFilter}
                  name="filter"
                />
                <h4>Incomplete Tasks</h4>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default TaskList;
