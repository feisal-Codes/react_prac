import { useEffect, useState } from "react";
import useLocalStorage from "./hooks/useLocalStorage";

const Search = ({ onSearch, searchTerm }) => {
  const handleChange = (e) => {
    //excute the callback handler here
    onSearch(e.target.value);
  };

  return (
    <>
      <input
        type="text"
        name="username"
        value={searchTerm}
        onChange={handleChange}
        placeholder="type here"
      />
    </>
  );
};

const List = ({ data }) => {
  return (
    <>
      {data?.map((book) => (
        <Item key={book.id} item={book} />
      ))}
    </>
  );
};

const Item = ({ item }) => {
  return (
    <div>
      <h2>{item.title}</h2>
      <p>{item.genre}</p>
      <p>{item.author}</p>
      <p>{item.publicationYear}</p>
      <p>{item.rating}</p>
    </div>
  );
};

const Books = ({ data }) => {
  const [searchTerm, setSearchTerm] = useLocalStorage("search", "");
  const [filteredData, setFilteredData] = useState(data || []);
  const [timeOutId, setTimeoutId] = useState(null);

  useEffect(() => {
    if (timeOutId) {
      clearTimeout(timeOutId);
    }

    const newTimeOutId = setTimeout(() => {
      setFilteredData((prev) => {
        if (searchTerm !== "") {
          let filtered = prev.filter((book) =>
            book.title.toLowerCase().includes(searchTerm.toLowerCase())
          );
          return filtered;
        } else {
          setFilteredData(data);
        }
      });
    }, 300);

    setTimeoutId(newTimeOutId);

    return () => {
      if (newTimeOutId) {
        clearTimeout(newTimeOutId);
      }
    };
  }, [searchTerm]);

  //the callback handler is defined here
  const handleChange = (search) => {
    setSearchTerm(search);
  };

  return (
    <>
      {/**the callback handler is passed here */}
      <Search searchTerm={searchTerm} onSearch={handleChange} />
      <div>
        <List data={filteredData} />
      </div>
    </>
  );
};

export default Books;
