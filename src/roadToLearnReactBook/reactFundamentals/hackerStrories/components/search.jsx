const Search = ({ onChange, value, onSubmit }) => {
  return (
    <form onSubmit={onSubmit}>
      <input
        type="text"
        name="search"
        value={value}
        onChange={onChange}
        placeholder="search stories"
      />
      <button disabled={!value} type="submit">
        Search Story
      </button>
    </form>
  );
};

export default Search;
