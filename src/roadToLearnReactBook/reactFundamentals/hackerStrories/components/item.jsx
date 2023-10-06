import React from "react";

const Item = ({ item, storiesDispatcher, actionType }) => {
  const handleRemove = (id) => {
    storiesDispatcher({
      type: actionType,
      payload: id,
    });
  };
  return (
    <div>
      <h3>{item.title}</h3>
      <p>
        <strong>{item.author}</strong>
      </p>
      <p>
        <a>{item.url}</a>
      </p>
      <button onClick={() => handleRemove(item.objectID)}>Delete Story</button>
    </div>
  );
};

export default Item;
