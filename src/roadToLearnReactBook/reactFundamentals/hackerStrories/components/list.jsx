import React from "react";
import Item from "./item";

const List = ({ list, onRemoveItem, onSubmit }) => {
  return (
    <>
      <ul>
        <li style={{ display: "flex", marginBottom: "5px" }}>
          <span style={{ width: "40%" }}>Title</span>
          <span style={{ width: "30%" }}>Author</span>
          <span style={{ width: "10%" }}>Comments</span>
          <span style={{ width: "10%" }}>Points</span>
          <span style={{ width: "10%" }}>Actions</span>
        </li>
        {list.map((item) => (
          <Item
            key={item.objectID}
            item={item}
            onRemoveItem={onRemoveItem}
            onSubmit={onSubmit}
          />
        ))}
      </ul>
      {/* {list.map((item) => (
        <Item
          key={item.objectID}
          item={item}
          storiesDispatcher={storiesDispatcher}
          actionType={actionType}
        />
      ))} */}
    </>
  );
};

export default List;
