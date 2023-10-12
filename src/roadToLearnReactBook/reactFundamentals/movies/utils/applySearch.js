const applySearch = (movies, searchTerm) => {
  //multiple searches
  let searched = movies.filter((movie) => {
    let isTitle =
      !searchTerm.title ||
      movie.title.toLowerCase().includes(searchTerm.title.toLowerCase().trim());
    let isCategory =
      !searchTerm.category ||
      movie.genre.toLowerCase() === searchTerm.category.toLowerCase().trim();
    let isReleaseYear =
      !searchTerm.year ||
      Number(movie.releaseYear) === Number(searchTerm.year.trim());

    return isTitle && isCategory && isReleaseYear;
  });

  return searched;
};

export default applySearch;
