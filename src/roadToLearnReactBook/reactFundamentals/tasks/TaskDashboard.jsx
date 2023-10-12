import React, { useEffect, useState } from "react";
import Table from "./table";
import { applyFilters, applySearch, applySort } from "./utils";
import Search from "./formComponents/search";
import styles from "./style.module.css";
import RadioButton from "./formComponents/radioButton";
const TaskDashboard = ({ initialTasks }) => {
  const [tasks, setTasks] = useState(initialTasks);
  const [filters, setFilters] = useState({
    searchTerm: {
      title: "",
      desc: "",
    },
    sort: { key: "NONE", order: "asc" },
    status: "",
  });
  //handles change and sets filters
  const handleChange = (e) => {
    let { name, value } = e.target;
    if (name === "title" || name === "desc") {
      setFilters((prevState) => ({
        ...prevState,
        searchTerm: {
          ...prevState.searchTerm,
          [name]: value,
        },
        status: "",
      }));
    }

    if (name === "status") {
      setFilters((prevState) => ({
        ...prevState,
        status: value,
      }));
    }
  };
  //applies search here
  //applies filters
  //applies sort

  /*reinitializes 
  the list to the default state 
  each time the effects runs

  */

  useEffect(() => {
    let searchedTasks = applySearch([...initialTasks], filters.searchTerm);
    if (filters.sort.key) {
      searchedTasks = applySort(
        searchedTasks,
        filters.sort.key,
        filters.sort.order
      );
    }
    if (filters.status) {
      searchedTasks = applyFilters(searchedTasks, filters.status);
    }
    setTasks(searchedTasks);
  }, [filters.searchTerm, filters.sort, filters.status]);

  //function to set the Sorting keys

  const handleSort = (sortkey) => {
    if (filters.sort.key.toLowerCase() === sortkey.toLowerCase()) {
      let newOrder = filters.sort.order === "asc" ? "desc" : "asc";
      setFilters((prevState) => ({
        ...prevState,
        sort: { key: sortkey, order: newOrder },
      }));
    } else {
      setFilters((prevState) => ({
        ...prevState,
        sort: { key: sortkey, order: "asc" },
      }));
    }
  };

  return (
    <div>
      <div className={styles.flex_col}>
        <Search
          onChange={handleChange}
          name="title"
          value={filters.searchTerm.title}
          label="search by title"
        />
        <Search
          onChange={handleChange}
          name="desc"
          value={filters.searchTerm.desc}
          label="search by description"
        />
      </div>
      <div className={styles.flex_col}>
        <RadioButton
          label="In Progress"
          onChange={handleChange}
          value="in progress"
          name="status"
          checked={filters.status.toLowerCase() === "in progress"}
        />
        <RadioButton
          label="Completed"
          onChange={handleChange}
          value="completed"
          name="status"
          checked={filters.status.toLowerCase() === "completed"}
        />
        <RadioButton
          label="Not Started"
          onChange={handleChange}
          value="not started"
          name="status"
          checked={filters.status.toLowerCase() === "not started"}
        />
        <RadioButton
          label="show all"
          onChange={handleChange}
          value=""
          name="status"
          checked={filters.status === ""}
        />
      </div>
      <Table tasks={tasks} handleSort={handleSort} />
    </div>
  );
};

export default TaskDashboard;
