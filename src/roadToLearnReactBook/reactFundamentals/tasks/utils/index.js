export const applySearch = (tasks, searchTerm) => {
  //filter
  let searchedTasks = tasks.filter((task) => {
    //check if searchterm is set
    let isTitle =
      !searchTerm.title ||
      task.title.toLowerCase().includes(searchTerm.title.toLowerCase());
    let isDesc =
      !searchTerm.desc ||
      task.description.toLowerCase().includes(searchTerm.desc.toLowerCase());

    return isTitle && isDesc;
  });

  return searchedTasks;
};

export const applySort = (tasks, key, order) => {
  console.log(key);
  console.log("this is key");
  if (key === "NONE") {
    return tasks;
  }
  return tasks.sort((a, b) => {
    let aValue = a[key];
    let bValue = b[key];

    if (typeof aValue === "string" || typeof bValue === "string") {
      aValue = aValue.toLowerCase();
      bValue = bValue.toLowerCase();
    }

    if (order === "asc") {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });
};

export const applyFilters = (tasks, status) => {
  return tasks.filter(
    (task) => task.status.toLowerCase() === status.toLowerCase()
  );
};
