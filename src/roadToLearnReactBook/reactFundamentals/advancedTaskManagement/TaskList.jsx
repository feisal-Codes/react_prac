import styles from "./styles.module.css";
import { FaComments, FaEdit, FaTrash } from "react-icons/fa";

const TaskList = ({ tasks, onRemoveTask, onEdit }) => {
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
            <td className={styles.description}>{task.description}</td>
            <td>
              <i>Task is due on: {task.dueDate.toString()}</i>
            </td>
            <td>
              <div className={styles.buttonContainer}>
                <button className={styles.iconButton}>
                  <FaComments />
                </button>
                <button
                  onClick={() => onEdit(task)}
                  className={styles.iconButton}
                >
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
export default TaskList;
