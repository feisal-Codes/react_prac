import { useEffect, useReducer } from "react";
import "./table.css";
const Table = ({ initialData }) => {
  /**
   * a reducer function takes in state
   * and an action, it computes and returns a new state based on
   * the state and action
   *
   * if you have one state transiton , use useState hook ,
   * if you have more than  one state transition on related data
   *  or same domain use useReducer hook
   *
   *
   */

  const deleteItem = "DELETE_ITEM";
  const setItems = "SET_ITEMS";
  const setInitialLoading = "SET_INIT_LOADING";
  const setError = "FETCHING_ERROR";

  const getAsyncItems = () =>
    // new Promise((resolve, reject) => setTimeout(reject, 2000));
    new Promise((resolve) =>
      setTimeout(() => resolve({ data: { items: initialData } }), 2000)
    );

  const reducer = (state, action) => {
    switch (action.type) {
      case setInitialLoading: {
        return {
          ...state,
          isLoading: true,
        };
      }

      case setItems: {
        return {
          ...state,
          isLoading: false,
          isError: false,
          items: action.payload,
        };
      }
      case deleteItem: {
        return state?.items.filter((item) => item.id !== action.payload);
      }

      case setError: {
        return {
          ...state,
          isError: true,
          isLoading: false,
        };
      }
      default: {
        return state;
      }
    }
  };

  const [state, dispatcher] = useReducer(reducer, {
    items: [],
    isLoading: false,
    isError: false,
  });

  useEffect(() => {
    dispatcher({ type: setInitialLoading, payload: true });
    getAsyncItems()
      .then((result) => {
        dispatcher({ type: setItems, payload: result.data.items });
      })
      .catch((e) => {
        dispatcher({ type: setError, payload: true });
      });
  }, []);

  const handleClick = (id) => {
    console.log("the id is here", id);
    dispatcher({ type: "DELETE_ITEM", payload: id });
  };

  return (
    <>
      {state.isError && <h2>Failed to fetch</h2>}
      {state.isLoading ? (
        <h2>data loading</h2>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Quantity</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {state.items?.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.quantity}</td>
                <td>
                  <button
                    onClick={() => {
                      handleClick(item.id);
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};

export default Table;
