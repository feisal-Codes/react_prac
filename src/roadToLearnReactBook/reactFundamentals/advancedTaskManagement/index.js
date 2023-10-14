import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import styles from "./styles.module.css";
import CreateTask from "./createTask";
import TaskList from "./TaskList";
import sortBy from "./helpers/sortBy";

const BASE_API_URL = "https://jsonplaceholder.typicode.com/";

const TaskManagement = ({ userId, initialData }) => {
  console.log("this is the user logged in", userId);
  const [formFields, setFormFields] = useState({
    title: "",
    description: "",
    dueDate: "",
  });

  const [tasks, setTasks] = useState(initialData);
  const [isEditing, setIsEditing] = useState(false);
  const [filters, setFilters] = useState({
    sort: { key: "NONE", order: "asc" },
  });

  const handleAddTask = (task) => {
    if (!isEditing) {
      console.log("and here");
      setTasks((prev) => [{ userId: userId, id: uuidv4(), ...task }, ...prev]);
    } else {
      //transform tasks and modify the given task
      //set the updated tasks back to the task state
      let updatedTasks = tasks.map((item) =>
        item.id === task.id ? { ...task } : { ...item }
      );
      setTasks(() => updatedTasks);
      setIsEditing(false);
    }

    setFormFields(() => ({
      title: "",
      description: "",
      dueDate: "",
    }));
  };
  console.log("this are tasks");
  console.log(tasks);
  console.log("****************8");
  const handleDeleteTask = (taskId) => {
    let updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(() => updatedTasks);
  };

  const handleChange = (e) => {
    let { name, value } = e.target;
    setFormFields((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleSetFilters = (sortKey) => {
    console.log(sortKey);
    if (filters.sort.key === sortKey) {
      let newOrder = filters.sort.order === "asc" ? "desc" : "asc";
      setFilters((prev) => ({
        ...prev,
        sort: { key: sortKey, order: newOrder },
      }));
    } else {
      setFilters((prev) => ({
        ...prev,
        sort: { key: sortKey, order: "asc" },
      }));
    }
  };

  useEffect(() => {
    let updatedList = [...tasks];

    console.log(updatedList);
    let {
      sort: { key, order },
    } = filters;
    if (key !== "NONE") {
      console.log("we are here");
      updatedList = sortBy([...updatedList], key, order);
    }
    console.log("updated list in sort", updatedList);
    setTasks(updatedList);
  }, [filters.sort]);

  const handleEdit = (task) => {
    if (userId !== task.userId) {
      return;
    }
    setIsEditing(true);
    setFormFields(() => ({
      ...task,
    }));
  };

  return (
    <div className={styles.formContainer}>
      <div className={styles.formSection}>
        <CreateTask
          formFields={formFields}
          onChange={handleChange}
          onAddTask={handleAddTask}
          isEditing={isEditing}
        />
      </div>
      <div className={styles.listSection}>
        <TaskList
          onSetSort={handleSetFilters}
          tasks={tasks}
          onRemoveTask={handleDeleteTask}
          onEdit={handleEdit}
          userId={userId}
          sort={filters.sort}
        />
      </div>
    </div>
  );
};

export default TaskManagement;
