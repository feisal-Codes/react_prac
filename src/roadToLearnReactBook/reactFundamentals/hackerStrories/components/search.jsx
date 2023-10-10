import React from "react";

const Search = ({ onChange, value, onSubmit }) => {
  return (
    <form
      onSubmit={onSubmit}
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "5px",
        margin: "30px auto",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        borderRadius: "8px",
        background: "#fff",
        overflow: "hidden",
        maxWidth: "400px",
        width: "100%",
        animation: "fadeIn 0.5s ease-in-out",
      }}
    >
      <input
        style={{
          flex: 1,
          padding: "10px",
          border: "none",
          outline: "none",
          fontSize: "16px",
        }}
        type="text"
        name="search"
        value={value}
        onChange={onChange}
        placeholder="Search stories..."
      />
      <button
        disabled={!value}
        type="submit"
        style={{
          padding: "10px",
          background: "#4CAF50",
          color: "#fff",
          border: "none",
          borderRadius: "0 8px 8px 0",
          cursor: "pointer",
          transition: "background 0.3s",
        }}
      >
        Search Story
      </button>
    </form>
  );
};

export default Search;
