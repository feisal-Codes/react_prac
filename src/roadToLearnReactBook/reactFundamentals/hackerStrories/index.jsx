import { useCallback, useEffect, useReducer, useState } from "react";
import Search from "./components/search";
import List from "./components/list";
import useLocalStorage from "./hooks/useLocalStorage";
const SET_STORIES = "SET_STORIES";
const SET_INIT_LOADING = "SET_INIT_LOADING";
const SET_FETCH_FAIL = "SET_FETCH_FAIL";
const SET_REMOVE_STORY = "SET_REMOVE_STORY";
const API_ENDPOINT = "https://hn.algolia.com/api/v1/search?query=";

const HackerStories = () => {
  const [searchTerm, setSearchTerm] = useLocalStorage("searchTerm", "");

  const [url, setUrl] = useState(`${API_ENDPOINT}${searchTerm}`);
  const [sort, setSort] = useState({ key: "NONE", order: "asc" });

  const reducer = (state, action) => {
    switch (action.type) {
      case SET_INIT_LOADING: {
        return {
          ...state,
          isLoading: true,
        };
      }
      case SET_STORIES: {
        return {
          ...state,
          data: action.payload,
          isLoading: false,
          isError: false,
        };
      }

      case SET_REMOVE_STORY: {
        return {
          ...state,
          data: state.data.filter((item) => item.objectID !== action.payload),
        };
      }
      case SET_FETCH_FAIL: {
        return {
          ...state,
          isLoading: false,
          isError: true,
        };
      }
      default: {
        return state;
      }
    }
  };

  const [stories, storiesDispatcher] = useReducer(reducer, {
    data: [],
    isLoading: false,
    isError: false,
  });
  const [sortedList, setSortedList] = useState(stories.data);


  const fetchData = async () => {
    try {
      const response = await fetch(url);

      const result = await response.json();
      storiesDispatcher({
        type: SET_STORIES,
        payload: result.hits,
      });
    } catch (e) {
      storiesDispatcher({
        type: SET_FETCH_FAIL,
        payload: true,
      });
    }
  };

  const handleSort = (sortKey) => {
    if (sort.key === sortKey) {
      let newOrder = sort.order === "asc" ? "desc" : "asc";
      setSort({ key: sortKey, order: newOrder });
    } else {
      setSort({ key: sortKey, order: "asc" });
    }
  };
  const handleRemoveItem = (item) => {
    console.log("****************************8");
    storiesDispatcher({
      type: SET_REMOVE_STORY,
      payload: item.objectID,
    });
  };

  const sortBy = (list, key, order) => {
    key = key.toLowerCase();
    return list.sort((a, b) => {
      console.log(key);
      console.log(a);
      let aValue = a[key]
      let bValue = b[key]
      if (typeof a[key] === "string" && typeof b[key] === "string") {
        aValue = a[key].toLowerCase();
        bValue = b[key].toLowerCase();
      }

      if (order === "asc") {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });
  };

  useEffect(() => {
    let newList = sortBy([...stories.data], sort.key, sort.order);
    setSortedList(newList);
  }, [sort, stories.data]);
  const handleFetchStories = useCallback(() => {
    if (!searchTerm) {
      console.log("here");
      return;
    }
    storiesDispatcher({
      type: SET_INIT_LOADING,
      payload: true,
    });

    fetchData();


  }, [url]);

  const handleChange = (e) => {
    let value = e.target.value;
    setSearchTerm(value);
  };



  const handleSubmit = (e) => {
    console.log(searchTerm);
    handleFetchStories();
    e.preventDefault();
  };


  console.log(stories);
  return (
    <div>
      <div>
        <Search
          onChange={handleChange}
          onSubmit={handleSubmit}
          value={searchTerm}
        />
      </div>

      {stories.isError && <h2>Failed to Fetch</h2>}

      {stories.isLoading ? (
        <h2>Loading stories... </h2>
      ) : (
        <div>
          <List
            handleSort={handleSort}
            sortedList={sortedList}
            sort={sort}
            onRemoveItem={handleRemoveItem}
          />
        </div>
      )}
    </div>
  );
};

export default HackerStories;


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