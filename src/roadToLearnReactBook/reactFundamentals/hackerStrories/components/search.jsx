const Search = ({ onChange, value }) => {
  return (
    <input
      type="text"
      name="search"
      value={value}
      onChange={onChange}
      placeholder="search stories"
    />
  );
};

export default Search;
