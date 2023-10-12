import Movie from "./movie";
import { moviesData } from "./data";
const MiniMovieApp = () => {
  console.log(moviesData);
  return (
    <>
      <Movie data={moviesData} />
    </>
  );
};

export default MiniMovieApp;
