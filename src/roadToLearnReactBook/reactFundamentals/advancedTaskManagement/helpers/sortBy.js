const sortBy = (list, key, order = "asc") => {
  console.log(list);
  console.log(key);
  console.log("**********************************5");

  return list.sort((a, b) => {
    key = key.toLowerCase();
    let aValue = a[key];
    let bValue = b[key];

    if (typeof aValue === "string" && typeof bValue === "string") {
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

export default sortBy;
