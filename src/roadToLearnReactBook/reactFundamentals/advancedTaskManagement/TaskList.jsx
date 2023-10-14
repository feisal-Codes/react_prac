import styles from "./styles.module.css";
import { FaComments, FaEdit, FaTrash } from "react-icons/fa";
import { BiUpArrow, BiDownArrow } from "react-icons/bi";

const TaskList = ({ tasks, onRemoveTask, onEdit, userId, onSetSort, sort }) => {
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th onClick={() => onSetSort("title")}>
            Title
            {sort.key === "title" && (
              <span className={styles.ml5}>
                {sort.order === "asc" ? <BiUpArrow /> : <BiDownArrow />}
              </span>
            )}
          </th>
          <th onClick={() => onSetSort("description")}>
            Description
            {sort.key === "description" && (
              <span className={styles.ml5}>
                {sort.order === "asc" ? <BiUpArrow /> : <BiDownArrow />}
              </span>
            )}
          </th>
          <th onClick={() => onSetSort("dueDate")}>
            Due Date
            {sort.key === "dueDate" && (
              <span className={styles.ml5}>
                {sort.order === "asc" ? <BiUpArrow /> : <BiDownArrow />}
              </span>
            )}
          </th>
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
                {userId === task.userId && (
                  <>
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
                  </>
                )}
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
export default TaskList;
