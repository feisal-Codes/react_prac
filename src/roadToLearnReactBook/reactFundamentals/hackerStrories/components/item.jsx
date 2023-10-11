import React from "react";

const Item = ({ item, onRemoveItem }) => {
  return (
    <li
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "15px",
        backgroundColor: "#ecf0f1", // Light Gray background
        margin: "10px 0",
        borderRadius: "8px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      <span style={{ flex: "40%", marginRight: "20px" }}>
        <a
          href={item.url}
          style={{
            color: "#3498db", // Blue color
            textDecoration: "none",
            fontWeight: "bold",
          }}
        >
          {item.title}
        </a>
      </span>
      <span style={{ flex: "30%", marginBottom: "5px", color: "#2c3e50" }}>
        {item.author}
      </span>
      <span style={{ flex: "10%", marginBottom: "5px", color: "#e74c3c" }}>
        {item.num_comments}
      </span>
      <span style={{ flex: "10%", marginBottom: "5px", color: "#27ae60" }}>
        {item.points}
      </span>
      <span style={{ flex: "10%", marginBottom: "5px" }}>
        <button
          style={{
            backgroundColor: "#e74c3c", // Red background
            border: "none",
            color: "white",
            padding: "8px 15px",
            borderRadius: "5px",
            cursor: "pointer",
          }}
          type="button"
          onClick={() => onRemoveItem(item)}
        >
          Dismiss
        </button>
      </span>
    </li>
  );
};

export default Item;

/**for reference 
 *   // const [timeOutId, setTimeOutId] = useState(null);

 * 
 * // clearTimeout(timeOutId);
// useEffect(() => {
  //   handleFetchStories();
  // }, [handleFetchStories]);
    // let newTimeOutId = setTimeout(() => {
    //   fetchData();
    // }, 200);
    //refactored to fetching data explicitly
    //   if (newTimeOutId) {
    //     setTimeOutId(newTimeOutId);
    //   }
    // }, [searchTerm]);
 * // useEffect(() => {
  //   if (searchTerm === "") return;
  //   storiesDispatcher({
  //     type: SET_INIT_LOADING,
  //     payload: true,
  //   });
  //   fetchData();
  // }, [searchTerm]);

  // useEffect(() => {
  //   if (!searchTerm) {
  //     return;
  //   }
  //   storiesDispatcher({
  //     type: SET_INIT_LOADING,
  //     payload: true,
  //   });
  //   clearTimeout(timeOutId);

  //   let newTimeOutId = setTimeout(() => {
  //     // storiesDispatcher({
  //     //   type: SEARCH_STORIES,
  //     //   payload: searchTerm,
  //     // });
  //     fetchData();
  //   }, 200);
  //   if (newTimeOutId) {
  //     setTimeOutId(newTimeOutId);
  //   }

  //   // if (searchTerm === "") {
  //   //   storiesDispatcher({
  //   //     type: "default",
  //   //   });
  //   // }

  //   return () => clearTimeout(newTimeOutId);
  // }, [searchTerm]);

 */
