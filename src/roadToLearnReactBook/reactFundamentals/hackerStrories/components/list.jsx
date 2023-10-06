import React from "react";
import Item from "./item";

const List = ({ list, storiesDispatcher, actionType }) => {
  return (
    <>
      {list.map((item) => (
        <Item
          key={item.objectID}
          item={item}
          storiesDispatcher={storiesDispatcher}
          actionType={actionType}
        />
      ))}
    </>
  );
};

export default List;
