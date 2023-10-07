import React from "react";

const Item = ({ item, onRemoveItem }) => {
  return (
    <li style={{ display: "flex" }}>
      <span style={{ width: "40%" }}>
        <a href={item.url}>{item.title}</a>
      </span>
      <span style={{ width: "30%", marginBottom: "5px" }}>{item.author}</span>
      <span style={{ width: "10%", marginBottom: "5px" }}>
        {item.num_comments}
      </span>
      <span style={{ width: "10%", marginBottom: "5px" }}>{item.points}</span>
      <span style={{ width: "10%", marginBottom: "5px" }}>
        <button type="button" onClick={() => onRemoveItem(item)}>
          Dismiss
        </button>
      </span>
    </li>
  );
};

export default Item;
