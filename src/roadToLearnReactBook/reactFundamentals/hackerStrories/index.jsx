import { useCallback, useEffect, useReducer, useState } from "react";
import Search from "./components/search";
import List from "./components/list";
import useLocalStorage from "./hooks/useLocalStorage";
const SET_STORIES = "SET_STORIES";
const SET_INIT_LOADING = "SET_INIT_LOADING";
const SET_FETCH_FAIL = "SET_FETCH_FAIL";
const SET_REMOVE_STORY = "SET_REMOVE_STORY";
// const API_ENDPOINT = "https://hn.algolia.com/api/v1/search?query=";
const API_BASE = 'https://hn.algolia.com/api/v1';
const API_SEARCH = '/search';
const PARAM_SEARCH = 'query=';

//utility functions
const getLastUrl = (urls) => {
  return urls[urls.length - 1];
};
const getUrl = (searchTerm) => {
  const url = `${API_BASE}${API_SEARCH}?${PARAM_SEARCH}${searchTerm}`;
  return url;
};
const getSearchTerm = (url) => {
  return url
    .substring(url.lastIndexOf('?') + 1)
    .replace(PARAM_SEARCH, '');
};
// const getLastSearches = (urls) => {
//   let reversedList = [...urls].reverse()
//   let uniqueUrls = [...new Set(reversedList)]
//   let lastSearches = uniqueUrls.reverse()
//   let lastSixSearches = lastSearches.slice(-6)
//   return lastSixSearches.slice(0, -1)
// }
const getLastSearches = (urls) => {
  // let lastSearches = [...new Set([...urls].reverse())].slice(1, 7);
  // return lastSearches.reverse()
  let lastSearches = urls
    .reduce((result, url, index) => {
      const searchTerm = getSearchTerm(url)
      if (index === 0) {
        return result.concat(searchTerm);
      }

      const previousSearchTerm = result[result.length - 1];
      if (searchTerm === previousSearchTerm) {
        return result;
      } else {
        return result.concat(searchTerm);
        ;
      }
    }, [])
  return lastSearches.slice(-6).slice(0, -1)
};

const HackerStories = () => {
  const [searchTerm, setSearchTerm] = useLocalStorage("searchTerm", "");

  // const [url, setUrl] = useState(`${API_ENDPOINT}${searchTerm}`);
  //implementing  5 last searches

  const [urls, setUrls] = useState([getUrl(searchTerm)]);
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

  useEffect(() => {
    handleFetchStories();
  }, [urls]);

  //handles sorting of the list
  const handleSort = (sortKey) => {
    if (sort.key === sortKey) {
      let newOrder = sort.order === "asc" ? "desc" : "asc";
      setSort({ key: sortKey, order: newOrder });
    } else {
      setSort({ key: sortKey, order: "asc" });
    }
  };
  const handleRemoveItem = (item) => {
    storiesDispatcher({
      type: SET_REMOVE_STORY,
      payload: item.objectID,
    });
  };

  //utility function for sort
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

  //sets an effect on stories.data and reloads everytime it changes

  useEffect(() => {
    let newList = sortBy([...stories.data], sort.key, sort.order);
    setSortedList(newList);
  }, [sort, stories.data]);

  const handleFetchStories = useCallback(() => {
    if (!searchTerm && urls.length === 0) {
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
  }, [urls]);

  const handleChange = (e) => {
    let value = e.target.value;
    setSearchTerm(value);
  };
  //handle last search
  const handleLastSearch = (searchTerm) => {
    const url = getUrl(searchTerm);
    setSearchTerm(searchTerm);
    setUrls((prevUrls) => {
      // let filteredUrls = prevUrls.filter((u) => u !== url)
      return [...prevUrls, url];
    });
  };

  const handleSubmit = (e) => {
    const url = getUrl(searchTerm);
    if (!searchTerm) {
      return;
    }
    setUrls((prevUrls) => {
      return [...prevUrls, url];
    });

    e.preventDefault();
  };
  const lastSearches = getLastSearches(urls)

  return (
    <div>
      <div>
        <Search
          onChange={handleChange}
          onSubmit={handleSubmit}
          value={searchTerm}
        />
      </div>
      <LastSearches handleLastSearch={handleLastSearch} lastSearches={lastSearches} />

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

      {lastSearches.map((searchTerm, idx) => (
        <button
          key={searchTerm + idx}
          onClick={() => handleLastSearch(searchTerm)}
        >
          {searchTerm}
        </button>
      ))}
    </div>)
}





















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
