import React from "react";
import "./style.css";
import { BiUpArrow, BiDownArrow } from "react-icons/bi";
import Item from "./item";

const SortButton = ({ label, sort, onClick, isActive, className }) => (
  <span className={className}>
    <button
      onClick={onClick}
      style={{
        fontWeight: isActive ? "bold" : "normal",
        display: "flex",
        alignItems: "center",
        backgroundColor: isActive ? "#4CAF50" : "#3498db", // Green if active, Blue if inactive
        color: "white",
        border: "none",
        padding: "10px",
        borderRadius: "5px",
        cursor: "pointer",
      }}
    >
      <span> {label}</span>
      <span style={{ marginLeft: "2px" }}>
        {sort && sort.order === "asc" && isActive && <BiUpArrow />}
        {sort && sort.order === "desc" && isActive && <BiDownArrow />}
      </span>
    </button>
  </span>
);

const List = ({
  sortedList,
  filters,
  onRemoveItem,
  onSubmit,
  handleSort,
  sort,
}) => {
  let sortedNewList = [];
  if (filters.criteria.comments || filters.criteria.points) {
    sortedNewList = sortedList.filter((story) => {
      let isMostPoints = !filters.criteria.points || story.points > 300;
      let isMostComments =
        !filters.criteria.comments || story.num_comments > 200;
      return isMostPoints && isMostComments;
    });
  } else {
    sortedNewList = [...sortedList];
  }

  return (
    <>
      <ul style={{ listStyle: "none", padding: 0 }}>
        <li
          style={{
            display: "flex",
            marginBottom: "5px",
            padding: "10px",
            backgroundColor: "#f1f1f1", // Light Gray background
            borderRadius: "5px",
          }}
        >
          <SortButton
            onClick={() => {
              handleSort("TITLE");
            }}
            className="title"
            label="TITLE"
            sort={sort}
            isActive={sort.key === "TITLE"}
          />

          <SortButton
            onClick={() => {
              handleSort("AUTHOR");
            }}
            label="AUTHOR"
            className="author"
            sort={sort}
            isActive={sort.key === "AUTHOR"}
          />

          <SortButton
            onClick={() => {
              handleSort("NUM_COMMENTS");
            }}
            sort={sort}
            label="COMMENTS"
            className="comments"
            isActive={sort.key === "NUM_COMMENTS"}
          />

          <SortButton
            onClick={() => {
              handleSort("POINTS");
            }}
            label="POINTS"
            className="points"
            sort={sort}
            isActive={sort.key === "POINTS"}
          />

          <span
            className="comments"
            style={{
              marginLeft: "20px",
            }}
          >
            <SortButton label="ACTION" isActive={false} />
          </span>
        </li>
        {sortedNewList.map((item) => (
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
