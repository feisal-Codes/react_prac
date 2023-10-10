import { useCallback, useEffect, useReducer, useState } from "react";
import Search from "./components/search";
import List from "./components/list";
import useLocalStorage from "./hooks/useLocalStorage";

// Action types for the reducer
const SET_STORIES = "SET_STORIES";
const SET_INIT_LOADING = "SET_INIT_LOADING";
const SET_FETCH_FAIL = "SET_FETCH_FAIL";
const SET_REMOVE_STORY = "SET_REMOVE_STORY";

// API constants
const API_BASE = "https://hn.algolia.com/api/v1";
const API_SEARCH = "/search";
const PARAM_SEARCH = "query=";
const PARAM_PAGE = "page=";
const SET_PAGE_NUMBER = "SET_PAGE_NUMBER";
const RESET_PAGE_NUMBER = "RESET_PAGE_NUMBER";

// Utility functions

// Get the last URL from an array of URLs
const getLastUrl = (urls) => {
  return urls[urls.length - 1];
};

// Generate a search URL based on search term and page number
const getUrl = (searchTerm, page) => {
  const url = `${API_BASE}${API_SEARCH}?${PARAM_SEARCH}${searchTerm}&${PARAM_PAGE}${page}`;
  return url;
};

// Extract the search term from a URL
const getSearchTerm = (url) => {
  return url
    .substring(url.lastIndexOf("?") + 1, url.lastIndexOf("&"))
    .replace(PARAM_SEARCH, "");
};

// Get the last 5 unique search terms from an array of URLs
const getLastSearches = (urls) => {
  let lastSearches = urls.reduce((result, url, index) => {
    const searchTerm = getSearchTerm(url);
    if (index === 0) {
      return result.concat(searchTerm);
    }

    const previousSearchTerm = result[result.length - 1];
    if (searchTerm === previousSearchTerm) {
      return result;
    } else {
      return result.concat(searchTerm);
    }
  }, []);
  return lastSearches.slice(-6).slice(0, -1);
};

// Component for Hacker Stories
const HackerStories = () => {
  // State for storing the search term
  const [searchTerm, setSearchTerm] = useLocalStorage("searchTerm", "");

  // State for sorting
  const [sort, setSort] = useState({ key: "NONE", order: "asc" });

  // Reducer for handling state related to stories
  const reducer = (state, action) => {
    switch (action.type) {
      case SET_INIT_LOADING: {
        return {
          ...state,
          isLoading: true,
        };
      }
      case SET_STORIES: {
        if (state.page === 0) {
          return {
            ...state,
            data: action.payload,
            isLoading: false,
            isError: false,
          };
        } else {
          return {
            ...state,
            data: [...state.data, ...action.payload],
            isLoading: false,
            isError: false,
          };
        }
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
      case SET_PAGE_NUMBER: {
        return {
          ...state,
          page: state.page + 1,
        };
      }
      case RESET_PAGE_NUMBER: {
        return {
          ...state,
          page: 0,
        };
      }
      default: {
        return state;
      }
    }
  };

  // useReducer hook to manage state
  const [stories, storiesDispatcher] = useReducer(reducer, {
    data: [],
    page: 0,
    isLoading: false,
    isError: false,
  });

  // State for storing sorted list
  const [sortedList, setSortedList] = useState(stories.data);

  // State for storing search history URLs
  const [urls, setUrls] = useState([getUrl(searchTerm, stories.page)]);

  // Function to fetch data from API
  const fetchData = async (url) => {
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

  // useEffect to handle initial data fetching and sorting
  useEffect(() => {
    setSort({ key: "NONE", order: "asc" });
    handleFetchStories();
  }, [stories.page, urls]);

  // Function to handle sorting of the list
  const handleSort = (sortKey) => {
    if (sort.key === sortKey) {
      let newOrder = sort.order === "asc" ? "desc" : "asc";
      setSort({ key: sortKey, order: newOrder });
    } else {
      setSort({ key: sortKey, order: "asc" });
    }
  };

  // Function to handle removing an item from the list
  const handleRemoveItem = (item) => {
    storiesDispatcher({
      type: SET_REMOVE_STORY,
      payload: item.objectID,
    });
  };

  // Utility function for sorting the list
  const sortBy = (list, key, order) => {
    key = key.toLowerCase();
    return list.sort((a, b) => {
      let aValue = a[key];
      let bValue = b[key];
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

  // useEffect to handle updating sorted list when stories.data changes
  useEffect(() => {
    let newList = [];
    if (sort.key === "NONE") {
      newList = [...stories.data];
    } else {
      newList = sortBy([...stories.data], sort.key, sort.order);
    }

    setSortedList(newList);
  }, [sort, stories.data]);

  // useCallback to memoize handleFetchStories function
  const handleFetchStories = useCallback(() => {
    if (!searchTerm) {
      return;
    }

    storiesDispatcher({
      type: SET_INIT_LOADING,
      payload: true,
    });

    // Use the latest URL
    const latestUrl = getLastUrl(urls);

    // Fetch data using the latest URL
    fetchData(latestUrl);
  }, [urls, stories.page]);

  // Function to handle input change
  const handleChange = (e) => {
    let value = e.target.value;
    setSearchTerm(value);
    storiesDispatcher({
      type: RESET_PAGE_NUMBER,
    });
  };

  // Function to handle clicking on last search item
  //resets the page number back to 0
  const handleLastSearch = (searchTerm) => {
    storiesDispatcher({
      type: RESET_PAGE_NUMBER,
    });
    const url = getUrl(searchTerm, 0);
    setSearchTerm(searchTerm);
    setUrls((prevUrls) => {
      return [...prevUrls, url];
    });
  };

  // Function to handle search
  const handleSearch = (page) => {
    const url = getUrl(searchTerm, page);

    if (!searchTerm) {
      return;
    }
    setUrls((prevUrls) => {
      return [...prevUrls, url];
    });
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    storiesDispatcher({
      type: RESET_PAGE_NUMBER,
    });
    handleSearch(0);
    e.preventDefault();
  };

  // Get the last 5 search terms
  const lastSearches = getLastSearches(urls);

  // Function to load more stories
  const handleLoadMore = () => {
    handleSearch(stories.page + 1);
    storiesDispatcher({
      type: SET_PAGE_NUMBER,
    });
  };

  return (
    <div>
      {/* Search component */}
      <div>
        <Search
          onChange={handleChange}
          onSubmit={handleSubmit}
          value={searchTerm}
        />
      </div>

      {/* Last searches component */}
      <LastSearches
        handleLastSearch={handleLastSearch}
        lastSearches={lastSearches}
      />

      {/* Display error message on fetch failure */}
      {stories.isError && <h2>Failed to Fetch</h2>}

      {/* Display loading message during data fetch */}
      {stories.loading && <h2>Loading stories... </h2>}

      {/* Display list and load more button when there are stories */}
      {stories.data.length > 0 && (
        <div>
          {/* List component */}
          <List
            handleSort={handleSort}
            sortedList={sortedList}
            sort={sort}
            onRemoveItem={handleRemoveItem}
          />

          {/* Load more button component */}
          <LoadMoreButton
            loading={stories.isLoading}
            onLoadMore={handleLoadMore}
          />
        </div>
      )}
    </div>
  );
};

export default HackerStories;

// LastSearches component
const LastSearches = ({ handleLastSearch, lastSearches }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "10px",
        margin: "30px 0",
      }}
    >
      {/* Display buttons for the last 5 search terms */}
      {lastSearches.map((searchTerm, idx) => (
        <button
          key={searchTerm + idx}
          onClick={() => handleLastSearch(searchTerm)}
          style={{
            padding: "10px",
            background: "#3498db",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            transition: "background 0.3s",
            fontSize: "16px",
            outline: "none",
          }}
        >
          {searchTerm}
        </button>
      ))}
    </div>
  );
};

// LoadMoreButton component
const LoadMoreButton = ({ onLoadMore, loading }) => {
  return (
    <div
      style={{ display: "flex", justifyContent: "center", marginTop: "50px" }}
    >
      {/* Display load more button or loading message */}
      {!loading ? (
        <button
          disabled={loading === true}
          style={{
            backgroundColor: "green",
            color: "white",
            padding: "5px 10px",
            border: "none",
          }}
          onClick={onLoadMore}
        >
          Load more
        </button>
      ) : (
        <h2>Loading...</h2>
      )}
    </div>
  );
};

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
