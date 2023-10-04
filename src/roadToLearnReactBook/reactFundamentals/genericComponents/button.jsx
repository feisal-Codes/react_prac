import React from "react";

const Button = ({ handleClick, children, size }) => {
  let style = {};
  switch (size) {
    case "small": {
      style.width = "40px";
      style.height = "20px";
      style.backgroundColor = "green";
      style.color = "white";
      break;
    }
    case "medium": {
      style.width = "50px";
      style.height = "35px";
      style.backgroundColor = "black";
      style.color = "white";
      break;
    }
    default:
      style.width = "50px";
      style.height = "50px";
      style.backgroundColor = "yellow";
      style.color = "black";
  }

  return (
    <div>
      <button style={style} onClick={handleClick}>
        {children}
      </button>
    </div>
  );
};

export default Button;
