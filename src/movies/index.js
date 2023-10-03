import { useEffect, useState } from "react";
const Movies = ({ movies }) => {
  const [releaseYear] = useState(
    movies
      ? [
          ...new Set(
            movies.map((movie) => movie.releaseYear).sort((a, b) => a - b)
          ),
        ]
      : ""
  );

  const [genre] = useState([...new Set(movies.map((movie) => movie.genre))]);

  const [filters, setFilters] = useState({
    year: "",
    ratings: "",
    genre: [],
  });
  const [searchTerm, setSearchTerm] = useState({
    title: "",
    releaseYear: "",
    genre: "",
  });
  const [filteredMovies, setFilteredMovies] = useState(movies);
  const applyFilters = () => {
    if (filters.year || filters.genre.length > 0) {
      let filtered = movies.filter((movie) => {
        return (
          (!filters.year || movie.releaseYear === Number(filters.year)) &&
          (!filters.genre.length || filters.genre.includes(movie.genre))
        );
      });
      setFilteredMovies(filtered);
    } else {
      setFilteredMovies(movies);
    }
  };

  useEffect(() => {
    applyFilters();
  }, [filters]);
  useEffect(() => {
    applySearch();
  }, [searchTerm.genre, searchTerm.title, searchTerm.releaseYear]);

  const handleChange = (e) => {
    let { name, value, id, checked } = e.target;
    if (id && checked) {
      setFilters((prev) => ({ ...prev, genre: [...prev.genre, name] }));
    } else if (id && checked === false) {
      setFilters((prev) => ({
        ...prev,
        genre: prev.genre.filter((genre) => genre !== name),
      }));
    } else {
      setFilters((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSearch = (e) => {
    let { name, value } = e.target;
    setSearchTerm((prev) => ({ ...prev, [name]: value }));
  };
  console.log(searchTerm);
  const applySearch = (e) => {
    if (searchTerm.genre || searchTerm.title || searchTerm.releaseYear) {
      let searchedMovies = [...movies].filter((movie) => {
        console.log("needed");
        console.log(filteredMovies);
        console.log(searchTerm.title.toLowerCase());
        console.log(movie.title?.toLowerCase());
        console.log(
          movie.title?.toLowerCase() === searchTerm.title?.toLowerCase()
        );

        let isTitleMatch =
          searchTerm.title === "" ||
          movie.title
            .toLowerCase()
            .includes(searchTerm.title.trim().toLowerCase());
        let isGenreMatch =
          searchTerm.genre === "" ||
          movie.genre.toLowerCase() === searchTerm.genre.trim().toLowerCase();
        let isYearMatch =
          searchTerm.releaseYear === "" ||
          movie.releaseYear === Number(searchTerm.releaseYear);

        return isTitleMatch && isGenreMatch && isYearMatch;
      });

      setFilteredMovies(searchedMovies);
    }
  };

  return (
    <>
      <div>
        <h2>Search for movie</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <input
            value={searchTerm.title}
            onChange={handleSearch}
            type="text"
            name="title"
            placeholder="search by title"
          />
          <input
            type="text"
            name="releaseYear"
            value={searchTerm.releaseYear}
            onChange={handleSearch}
            placeholder="search by release year"
          />
          <input
            value={searchTerm.genre}
            onChange={handleSearch}
            type="text"
            name="genre"
            placeholder="search by genre"
          />
        </div>
      </div>
      <div>
        <h2>Filters Based On:</h2>
        <h4>release year</h4>
        <select name="year" value={filters.year} onChange={handleChange}>
          <option value="">Select Year</option>
          {releaseYear.map((year, idx) => (
            <option value={year} key={idx}>
              {year}
            </option>
          ))}
        </select>
      </div>
      <div>
        <h4>Genre</h4>
        {genre &&
          genre?.map((title, _idx) => (
            <div key={_idx}>
              <label htmlFor={title}>{title}</label>
              <input
                type="checkbox"
                onChange={handleChange}
                name={title}
                value={filters.genre}
                id={title}
              />
            </div>
          ))}
      </div>
      <div>
        <h2>Available Movies</h2>

        {filteredMovies?.map((movie) => (
          <div key={movie.id}>
            <h3>{movie.title}</h3>
            <p>{movie.genre}</p>
            <p>{movie.releaseYear}</p>
            <p>{movie.rating}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default Movies;
