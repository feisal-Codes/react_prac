import React, { useEffect, useState } from "react";

//utility functions

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
const applyFilters = (movies, filters) => {
  return movies.filter((movie) => {
    return !filters.genre || movie.genre === filters.genre;
  });
};

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

const Movie = ({ data }) => {
  const [movies, setMovies] = useState(data ? data : []);

  const [genres, setGenres] = useState([
    ...new Set(
      sortBy([...data], "genre", "asc").map((data) => {
        return data.genre;
      })
    ),
  ]);
  const [filters, setFilters] = useState({
    releaseYear: {
      order: "",
    },
    genre: "",
    searchTerm: {
      category: "",
      year: "",
      title: "",
    },
  });
  const [filteredMovies, setFilteredMovies] = useState(data);

  const onChange = (e) => {
    let { name, value, id } = e.target;
    if (name === "order") {
      setFilters((prev) => {
        return {
          ...prev,
          releaseYear: { [name]: value },
        };
      });
    } else if (name === "category" || name === "title" || name === "year") {
      console.log("this is", name, "and this is", value);
      setFilters((prev) => {
        return {
          ...prev,
          searchTerm: { ...prev.searchTerm, [name]: value },
        };
      });
    } else {
      setFilters((prev) => ({ ...prev, [name]: value }));
    }
    console.log(value);
    console.log("inside select");
  };

  useEffect(() => {
    let searched = applySearch([...movies], filters.searchTerm);
    setFilteredMovies(searched);
  }, [filters.searchTerm]);
  useEffect(() => {
    let filtered = applyFilters([...movies], filters);
    if (filters.releaseYear.order) {
      filtered = sortBy(filtered, "releaseYear", filters.releaseYear.order);
    }
    // if (filters.searchTerm) {
    //   filtered = applySearch(filtered, filters.searchTerm);
    // }
    setFilteredMovies(filtered);
  }, [filters, movies]);

  console.log(filters);
  return (
    <div>
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <Input
          label="search by name"
          name="title"
          id="title"
          value={filters.searchTerm.title}
          onChange={onChange}
        />
        <Input
          label="search by release year"
          id="year"
          name="year"
          value={filters.searchTerm.year}
          onChange={onChange}
        />
        <Input
          label="search by category"
          name="category"
          id="category"
          value={filters.searchTerm.category}
          onChange={onChange}
        />
      </div>
      <div>
        <Select
          options={genres}
          onChange={onChange}
          label="Filter By Genre"
          value={filters.genre}
          name="genre"
        />
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <RadioButton
          name="order"
          label="Ascending"
          value="asc"
          onChange={onChange}
        />
        <RadioButton
          name="order"
          label="Descending"
          value="desc"
          onChange={onChange}
        />
        <RadioButton name="order" label="None" value="" onChange={onChange} />
      </div>
      <MovieList movies={filteredMovies} />
    </div>
  );
};

export default Movie;

const MovieList = ({ movies }) => {
  return (
    <>
      {movies.map((movie) => (
        <Item key={movie.id} movie={movie} />
      ))}
    </>
  );
};

const Item = ({ movie }) => {
  return (
    <div style={{ borderBottom: "black solid 1px " }}>
      <h3>{movie.title}</h3>
      <h3>{movie.genre}</h3>
      <h3>{movie.releaseYear}</h3>
    </div>
  );
};

const Select = ({ label, name, value, onChange, options }) => {
  return (
    <label>
      <span style={{ marginRight: "5px" }}>{label}</span>
      <select name={name} value={value} onChange={onChange}>
        <option value="">Select an option</option>
        {options.map((option, idx) => (
          <option value={option} key={idx}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
};

const RadioButton = ({ label, name, onChange, value }) => {
  return (
    <label>
      {label}
      <input type="radio" value={value} name={name} onChange={onChange} />
    </label>
  );
};

const Input = ({ value, name, id, label, onChange }) => {
  return (
    <label>
      <input
        type="text"
        placeholder={label}
        value={value}
        name={name}
        id={id}
        onChange={onChange}
      />
    </label>
  );
};
