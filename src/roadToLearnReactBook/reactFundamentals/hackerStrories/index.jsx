import { useEffect, useReducer, useState } from "react";
import Search from "./components/search";
import List from "./components/list";
import useLocalStorage from "./hooks/useLocalStorage";
let url = "https://hn.algolia.com/api/v1/search?query=story&page=1";
const SET_STORIES = "SET_STORIES";
const SET_INIT_LOADING = "SET_INIT_LOADING";
const SET_FETCH_FAIL = "SET_FETCH_FAIL";
const SET_REMOVE_STORY = "SET_REMOVE_STORY";
const SEARCH_STORIES = "SEARCH_STORIES";
const API_ENDPOINT = "https://hn.algolia.com/api/v1/search?query=";

const HackerStories = () => {
  const [searchTerm, setSearchTerm] = useLocalStorage("searchTerm", "");

  const [timeOutId, setTimeOutId] = useState(null);

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
      // case SEARCH_STORIES: {
      //   return {
      //     ...state,
      //     searchedData: state.data.filter((item) =>
      //       item.title.toLowerCase().includes(action.payload)
      //     ),
      //   };
      // }
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
    // searchedData: [],
    isLoading: false,
    isError: false,
  });

  const fetchData = async () => {
    try {
      const response = await fetch(`${API_ENDPOINT}${searchTerm}`);
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

  const handleChange = (e) => {
    let value = e.target.value;
    setSearchTerm(value);
  };

  // useEffect(() => {
  //   if (searchTerm === "") return;
  //   storiesDispatcher({
  //     type: SET_INIT_LOADING,
  //     payload: true,
  //   });
  //   fetchData();
  // }, [searchTerm]);

  useEffect(() => {
    if (!searchTerm) {
      return;
    }
    storiesDispatcher({
      type: SET_INIT_LOADING,
      payload: true,
    });
    clearTimeout(timeOutId);

    let newTimeOutId = setTimeout(() => {
      // storiesDispatcher({
      //   type: SEARCH_STORIES,
      //   payload: searchTerm,
      // });
      fetchData();
    }, 200);
    if (newTimeOutId) {
      setTimeOutId(newTimeOutId);
    }

    // if (searchTerm === "") {
    //   storiesDispatcher({
    //     type: "default",
    //   });
    // }

    return () => clearTimeout(newTimeOutId);
  }, [searchTerm]);

  console.log(stories);
  return (
    <div>
      <div>
        <Search onChange={handleChange} value={searchTerm} />
      </div>

      {stories.isError && <h2>Failed to Fetch</h2>}

      {stories.isLoading ? (
        <h2>Loading stories... </h2>
      ) : (
        <div>
          <List
            list={stories.data}
            storiesDispatcher={storiesDispatcher}
            actionType={SET_REMOVE_STORY}
          />
        </div>
      )}
    </div>
  );
};

export default HackerStories;
