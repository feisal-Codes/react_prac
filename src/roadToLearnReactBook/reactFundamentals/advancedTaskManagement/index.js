import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import styles from "./styles.module.css";
import { FaComments, FaEdit, FaTrash } from "react-icons/fa";

const BASE_API_URL = "https://jsonplaceholder.typicode.com/";

const getUrl = (query) => {
  let url = `${BASE_API_URL}${query} `;
  return url;
};

const TaskManagement = () => {
  const [formFields, setFormFields] = useState({
    title: "",
    description: "",
    dueDate: "",
  });

  const [tasks, setTasks] = useState([]);

  const handleAddTask = (task) => {
    setTasks((prev) => [{ id: uuidv4(), ...task }, ...prev]);
  };

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

  return (
    <div className={styles.formContainer}>
      <div className={styles.formSection}>
        <CreateTask
          formFields={formFields}
          onChange={handleChange}
          onAddTask={handleAddTask}
        />
      </div>
      <div className={styles.listSection}>
        <ListTasks tasks={tasks} onRemoveTask={handleDeleteTask} />
      </div>
    </div>
  );
};

export default TaskManagement;

const CreateTask = ({ formFields, onChange, onAddTask }) => {
  const submit = (e) => {
    if (!formFields) {
      console.log("return");
      return;
    }
    onAddTask(formFields);
    console.log(formFields);
    e.preventDefault();
  };

  return (
    <>
      <Form onSubmit={submit}>
        <Input
          name="title"
          onChange={onChange}
          label="Title"
          value={formFields.title}
        />
        <TextArea
          name="description"
          onChange={onChange}
          label="Description"
          value={formFields.description}
        />
        <Input
          type="date"
          name="dueDate"
          onChange={onChange}
          label="Due Date"
          value={formFields.dueDate}
        />
      </Form>
    </>
  );
};

const Form = ({ children, onSubmit }) => {
  return (
    <>
      <form onSubmit={onSubmit} className={styles.formSection}>
        {children}
        <button type="submit" className={styles.formButton}>
          Add Task
        </button>
      </form>
    </>
  );
};

const Input = ({ type = "text", name, onChange, label, value }) => {
  return (
    <div className={styles.inputContainer}>
      <label className={styles.label}>{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className={styles.input}
      />
    </div>
  );
};

const TextArea = ({ name, onChange, label, value }) => {
  return (
    <>
      <label className={styles.label}>{label}</label>
      <textarea
        name={name}
        value={value}
        rows={4}
        cols={40}
        onChange={onChange}
        className={styles.input}
      />
    </>
  );
};

// Your component file

const ListTasks = ({ tasks, onRemoveTask }) => {
  console.log(tasks);

  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>Title</th>
          <th>Description</th>
          <th>Due Date</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {tasks?.map((task) => (
          <tr key={task.id} className={styles.listItem}>
            <td>{task.title}</td>
            <td>{task.description}</td>
            <td>
              <i>Task is due on: {task.dueDate.toString()}</i>
            </td>
            <td>
              <div className={styles.buttonContainer}>
                <button className={styles.iconButton}>
                  <FaComments />
                </button>
                <button className={styles.iconButton}>
                  <FaEdit />
                </button>
                <button
                  onClick={() => onRemoveTask(task.id)}
                  className={styles.iconButton}
                >
                  <FaTrash />
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
