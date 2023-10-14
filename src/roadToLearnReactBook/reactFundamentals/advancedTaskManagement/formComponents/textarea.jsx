import styles from "../styles.module.css";

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

export default TextArea;
