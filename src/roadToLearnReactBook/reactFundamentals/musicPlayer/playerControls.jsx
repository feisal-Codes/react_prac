const PlayerControls = ({ handleClick, toggle }) => {
  return (
    <div>
      <button onClick={() => handleClick("prev")}>Prev </button>
      <button onClick={() => handleClick(toggle)}>{toggle}</button>
      <button onClick={() => handleClick("next")}>Next </button>
    </div>
  );
};

export default PlayerControls;
