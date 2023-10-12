const sortBy = (list, key, order) => {
  return list.sort((a, b) => {
    //extract keys
    let aValue = a[key];
    let bValue = b[key];

    //check if keys are strings

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
