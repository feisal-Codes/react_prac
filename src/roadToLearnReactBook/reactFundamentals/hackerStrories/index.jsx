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
const COMMENTS_FILTER = "COMMENTS_FILTER";
const POINTS_FILTER = "POINTS_FILTER";
const TITLE_FILTER = "TITLE_FILTER";
const SET_FILTERS = "SET_FILTERS";

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
  const [sortedList, setSortedList] = useState(stories.data);

  //apply filters reducer
  const filterReducer = (state, action) => {
    switch (action.type) {
      // case COMMENTS_FILTER: {
      //   const filteredData = stories.data.filter(
      //     (story) => story.num_comments > 300
      //   );
      //   console.log("inside comments filter");
      //   console.log(filteredData);
      //   return {
      //     ...state,
      //     data: filteredData,
      //   };
      // }

      case SET_FILTERS: {
        // console.log(action.name);
        // console.log(action.payload);
        return {
          ...state,
          criteria: {
            ...state.criteria,
            [action.name]: action.payload,
          },
        };
      }

      default:
        return state;
    }
  };
  const [filters, filtersDispatcher] = useReducer(filterReducer, {
    criteria: {
      comments: "",
      points: "",
    },
    data: [...stories.data],
  });

  console.log("******************************************");
  console.log("******************************************");
  console.log("******************************************");
  console.log("******************************************");

  console.log("filters", filters.data);
  console.log("########################################");

  const handleSetFilters = (e) => {
    console.log(e.target);
    let { name, value, checked } = e.target;
    console.log(checked, "and value", value);
    filtersDispatcher({
      type: SET_FILTERS,
      payload: checked,
      name: name,
    });
  };

  // const applyFilters = () => {
  //   console.log("here");
  //   if (!filters) {
  //     console.log("here too");

  //     return;
  //   }
  //   console.log(filters);
  //   if (filters.criteria.comments) {
  //     console.log("and here");
  //     filtersDispatcher({
  //       type: COMMENTS_FILTER,
  //       payload: 200,
  //     });
  //   }
  // };
  // State for storing sorted list

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

  //useEffect for filters

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

  // useEffect(() => {
  //   applyFilters();
  // }, [filters.criteria.comments]);

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

  //function to handle onChnage in filters

  return (
    <div>
      <div>
        <Search
          onChange={handleChange}
          onSubmit={handleSubmit}
          value={searchTerm}
        />
      </div>

      <LastSearches
        handleLastSearch={handleLastSearch}
        lastSearches={lastSearches}
      />

      {stories.isError && <h2>Failed to Fetch</h2>}

      {stories.loading && <h2>Loading stories... </h2>}

      {stories.data.length > 0 && (
        <div>
          <CheckBox
            value={filters.criteria.comments}
            onChange={handleSetFilters}
            name="comments"
            label="most commented"
          />
          <CheckBox
            value={filters.criteria.points}
            onChange={handleSetFilters}
            name="points"
            label="most points"
          />

          <List
            handleSort={handleSort}
            sortedList={sortedList}
            sort={sort}
            filters={filters}
            onRemoveItem={handleRemoveItem}
          />

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

const CheckBox = ({ label, name, onChange, value }) => {
  console.log("from checkbox");
  console.log(value);
  return (
    <>
      <label>
        <input type="checkbox" name={name} value={value} onChange={onChange} />

        {label}
      </label>
    </>
  );
};
