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

const List = ({ list, onRemoveItem, onSubmit }) => {
  const [sortedList, setSortedList] = useState(list)
  const [sort, setSort] = useState({ key: "NONE", order: "asc" });
  const handleSort = (sortKey) => {
    if (sort.key === sortKey) {
      let newOrder = sort.order === "asc" ? "desc" : "asc";
      setSort({ key: sortKey, order: newOrder });
    } else {
      setSort({ key: sortKey, order: "asc" });
    }
  };



  const sortBy = (list, key, order) => {
    key = key.toLowerCase()
    return list.sort((a, b) => {
      console.log(key)
      console.log(a)
      const aValue = a[key];
      const bValue = b[key];
      if (order === "asc") {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });
  };




  useEffect(() => {
    let newList = sortBy([...list], sort.key, sort.order)
    setSortedList(newList)
  }, [sort, list])

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
        {sortedList.map((item) => (
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
