import React, { useEffect, useState } from "react";

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
      console.log(filtered);
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

  const applySearch = () => {
    if (searchTerm.genre || searchTerm.title || searchTerm.releaseYear) {
      let searchedMovies = [...movies].filter((movie) => {
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

  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  };

  const sectionStyle = {
    marginBottom: "20px",
    width: "100%",
    maxWidth: "75%",
  };

  const headingStyle = {
    marginBottom: "10px",
    fontSize: "1.5rem",
  };

  const inputStyle = {
    padding: "8px",
    width: "100%",
    marginBottom: "10px",
  };

  const selectStyle = {
    padding: "8px",
    width: "100%",
    maxWidth: "48%",
    marginBottom: "10px",
  };

  const checkboxStyle = {
    marginRight: "10px",
  };

  const genreContainerStyle = {
    display: "flex",
    flexWrap: "wrap",
    gap: "10px",
  };

  const genreItemStyle = {
    marginBottom: "5px",
    display: "flex",
    alignItems: "center",
  };

  const movieCardContainerStyle = {
    display: "flex",
    flexWrap: "wrap",
    gap: "20px",
    justifyContent: "center",
  };

  const movieCardStyle = {
    width: "200px", // Set your preferred width
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  };

  return (
    <div style={containerStyle}>
      <div style={sectionStyle}>
        <h2 style={headingStyle}>Search for movie</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <input
            value={searchTerm.title}
            onChange={handleSearch}
            type="text"
            name="title"
            placeholder="Search by title"
            style={inputStyle}
          />
          <input
            type="text"
            name="releaseYear"
            value={searchTerm.releaseYear}
            onChange={handleSearch}
            placeholder="Search by release year"
            style={inputStyle}
          />
          <input
            value={searchTerm.genre}
            onChange={handleSearch}
            type="text"
            name="genre"
            placeholder="Search by genre"
            style={inputStyle}
          />
        </div>
      </div>
      <div style={sectionStyle}>
        <h2 style={headingStyle}>Filters Based On:</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <div style={{ marginBottom: "10px" }}>
            <h4 style={{ fontSize: "1.25rem", marginBottom: "5px" }}>
              Release Year
            </h4>
            <select
              name="year"
              value={filters.year}
              onChange={handleChange}
              style={selectStyle}
            >
              <option value="">Select Year</option>
              {releaseYear.map((year, idx) => (
                <option value={year} key={idx}>
                  {year}
                </option>
              ))}
            </select>
          </div>
          <div>
            <h4 style={{ fontSize: "1.25rem", marginBottom: "5px" }}>Genre</h4>
            <div style={genreContainerStyle}>
              {genre &&
                genre?.map((title, _idx) => (
                  <div key={_idx} style={genreItemStyle}>
                    <label htmlFor={title} style={{ marginRight: "5px" }}>
                      {title}
                    </label>
                    <input
                      type="checkbox"
                      onChange={handleChange}
                      name={title}
                      value={filters.genre}
                      id={title}
                      style={checkboxStyle}
                    />
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
      <div style={movieCardContainerStyle}>
        {filteredMovies?.map((movie) => (
          <div key={movie.id} style={movieCardStyle}>
            <h3
              style={{
                fontSize: "1.25rem",
                fontWeight: "bold",
                marginBottom: "5px",
              }}
            >
              {movie.title}
            </h3>
            <p>{movie.genre}</p>
            <p>{movie.releaseYear}</p>
            <p>{movie.rating}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Movies;
