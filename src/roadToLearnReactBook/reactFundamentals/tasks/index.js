import React from "react";
import initialTasks from "./data";
import TaskDashboard from "./TaskDashboard";

const TasksManagement = () => {
  return (
    <>
      <TaskDashboard initialTasks={initialTasks} />
    </>
  );
};

export default TasksManagement;
