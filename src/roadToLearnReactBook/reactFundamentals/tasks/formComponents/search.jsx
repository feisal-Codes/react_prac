import React from "react";
import styles from "../style.module.css";

const Search = ({ onChange, name, label, value }) => {
  return (
    <label className={styles.searchLabel}>
      <input
        className={styles.searchInput}
        name={name}
        placeholder={label}
        value={value}
        onChange={onChange}
      />
    </label>
  );
};

export default Search;
