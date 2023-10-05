import { useEffect, useReducer } from "react";
import "./table.css";
const Table = ({ initialData }) => {
  /**
   * a reducer function takes in state
   * and an action, it computes and returns a new state based on
   * the state and action
   *
   *
   */

  const deleteItem = "DELETE_ITEM";
  const setItems = "SET_ITEMS";
  const reducer = (state, action) => {
    switch (action.type) {
      case setItems: {
        return action.payload;
      }
      case deleteItem: {
        return state.filter((item) => item.id !== action.payload);
      }
      default: {
        return state;
      }
    }
  };

  useEffect(() => {
    dispatcher({ type: setItems, payload: initialData });
  }, []);

  const [state, dispatcher] = useReducer(reducer, []);

  const handleClick = (id) => {
    console.log("the id is here", id);
    dispatcher({ type: "DELETE_ITEM", payload: id });
  };

  return (
    <>
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
          {state?.map((item) => (
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
    </>
  );
};

export default Table;
