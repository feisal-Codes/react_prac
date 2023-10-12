import React, { useEffect, useState } from "react";
import MovieList from "./movieList";
import Select from "./formComponents/select";
import RadioButton from "./formComponents/radioButton";
import Input from "./formComponents/input";
import applyFilters from "./utils/applyFilter";
import applySearch from "./utils/applySearch";
import sortBy from "./utils/applySort";

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
