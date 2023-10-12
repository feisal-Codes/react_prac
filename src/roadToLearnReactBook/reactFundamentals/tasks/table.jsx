import React from "react";
import styles from "./style.module.css";

const Table = ({ tasks, handleSort }) => {
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th className={styles.th} onClick={() => handleSort("id")}>
            ID
          </th>
          <th className={styles.th} onClick={() => handleSort("title")}>
            Title
          </th>
          <th className={styles.th} onClick={() => handleSort("description")}>
            Description
          </th>
          <th className={styles.th} onClick={() => handleSort("status")}>
            Status
          </th>
          <th className={styles.th} onClick={() => handleSort("dueDate")}>
            Date Due
          </th>
        </tr>
      </thead>
      <tbody>
        {tasks.map((task) => (
          <tr key={task.id}>
            <td className={styles.td}>{task.id}</td>
            <td className={styles.td}>{task.title}</td>
            <td className={styles.td}>{task.description}</td>
            <td className={styles.td}>{task.status}</td>
            <td className={styles.td}>{task.dueDate}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
