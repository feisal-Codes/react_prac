const applyFilters = (movies, filters) => {
  return movies.filter((movie) => {
    return !filters.genre || movie.genre === filters.genre;
  });
};

export default applyFilters;
