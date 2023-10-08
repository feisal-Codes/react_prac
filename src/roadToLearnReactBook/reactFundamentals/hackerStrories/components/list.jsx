import React, { useEffect, useState } from "react";
import Item from "./item";
import "./style.css";
import { BiUpArrow, BiDownArrow } from "react-icons/bi"

const SortButton = ({ label, sort, onClick, isActive, className }) => (

  <span className={className}>
    <button
      onClick={onClick}
      style={{ fontWeight: isActive ? "bold" : "normal", display: "flex", alignItems: "center" }}
    >
      <span>      {label}
      </span>
      <span style={{ marginLeft: "2px" }}>
        {sort.order === "asc" && isActive && <BiUpArrow />
        }
        {sort.order === "desc" && isActive && <BiDownArrow />
        }
      </span>
    </button>

  </span>
);

const List = ({ sortedList, onRemoveItem, onSubmit, handleSort, sort }) => {
  // console.log("lsisiisi")
  // console.log(sortedList)




  return (
    <>
      <ul>
        <li style={{ display: "flex", marginBottom: "5px" }}>
          <SortButton
            onClick={() => {
              handleSort("TITLE");
            }}
            className="title"
            label="TITLE"
            sort={sort}
            isActive={sort.key === "TITLE"} />

          <SortButton
            onClick={() => {
              handleSort("AUTHOR");
            }}
            label="AUTHOR"
            className="author"
            sort={sort}
            isActive={sort.key === "AUTHOR"} />

          <SortButton
            onClick={() => {
              handleSort("NUM_COMMENTS");
            }}
            sort={sort}
            label="COMMENTS"
            className="comments"
            isActive={sort.key === "NUM_COMMENTS"} />


          <SortButton
            onClick={() => {
              handleSort("POINTS");
            }}
            label="POINTS"
            className="comments"
            sort={sort}
            isActive={sort.key === "POINTS"}
          />

          <span className="comments">
            <button>Actions</button>
          </span>

        </li>
        {sortedList?.map((item) => (
          <Item
            key={item.objectID}
            item={item}
            onRemoveItem={onRemoveItem}
            onSubmit={onSubmit}
          />
        ))}
      </ul>

    </>
  );
};

export default List;
