import styles from "../styles.module.css";

const Form = ({ children, onSubmit, label }) => {
  console.log(label);
  return (
    <>
      <form onSubmit={onSubmit} className={styles.formSection}>
        {children}
        <button type="submit" className={styles.formButton}>
          {label}
        </button>
      </form>
    </>
  );
};

export default Form;
