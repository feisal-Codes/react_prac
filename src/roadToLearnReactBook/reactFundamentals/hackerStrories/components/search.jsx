const Search = ({ onChange, value, onSubmit }) => {
  return (
    <form onSubmit={onSubmit} style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "5px", margin: "30px 0" }}>
      <input
        style={{ padding: "5px" }}
        type="text"
        name="search"
        value={value}
        onChange={onChange}
        placeholder="search stories"
      />
      <button disabled={!value} type="submit" style={{ padding: "5px" }}
      >
        Search Story
      </button>
    </form>
  );
};

export default Search;
