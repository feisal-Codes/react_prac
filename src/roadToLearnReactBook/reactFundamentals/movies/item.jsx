const Item = ({ movie }) => {
  return (
    <div style={{ borderBottom: "black solid 1px " }}>
      <h3>{movie.title}</h3>
      <h3>{movie.genre}</h3>
      <h3>{movie.releaseYear}</h3>
    </div>
  );
};

export default Item;
