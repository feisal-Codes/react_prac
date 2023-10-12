import { useState } from "react";

const Home = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [count, setCount] = useState(0);
  return (
    <>
      <ProtectedRoute
        isAuthenticated={isAuthenticated}
        setIsAuthenticated={setIsAuthenticated}
        render={(isAuthenticated, count) => {
          return (
            <div>
              <h1>this is protected component</h1>
              <h2>
                This component uses render props and is controlled here in the
                parent
              </h2>
              <h2>{isAuthenticated}</h2>
            </div>
          );
        }}
      />

      <ProtectedRoute
        isAuthenticated={isAuthenticated}
        setCount={setCount}
        setIsAuthenticated={setIsAuthenticated}
        count={count}
        render={(isAuthenticated, count, handleIncrement) => {
          return (
            <div>
              <h1>we can resuse this </h1>
              <h2>
                and we can pass any props without interefering with the internal
                state of the component i.e the display is controlled from the
                parent
              </h2>
              <h2>this is count {count}</h2>
              {handleIncrement && (
                <button onClick={handleIncrement}>count ++</button>
              )}
            </div>
          );
        }}
      />
    </>
  );
};

export default Home;

const ProtectedRoute = ({
  render,
  setCount,
  count,
  isAuthenticated,
  setIsAuthenticated,
}) => {
  const handleIncrement = () => {
    if (setCount) {
      setCount((count) => count + 1);
    }
  };

  if (isAuthenticated) {
    return <div> {render(isAuthenticated, count, handleIncrement)}</div>;
  } else {
    return (
      <div>
        <button onClick={() => setIsAuthenticated(true)}>authenticate</button>
      </div>
    );
  }
};
