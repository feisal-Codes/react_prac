import Item from "./item";

const MovieList = ({ movies }) => {
  return (
    <>
      {movies.map((movie) => (
        <Item key={movie.id} movie={movie} />
      ))}
    </>
  );
};

export default MovieList;
