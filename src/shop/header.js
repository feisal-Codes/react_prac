import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const Header = () => {
  const [isHeaderFixed, setIsHeaderFixed] = useState(false);

  // Add an event listener to handle scroll and update header position
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsHeaderFixed(scrollPosition > 0);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <header
        style={{
          display: "flex",
          justifyContent: "center",
          position: isHeaderFixed ? "fixed" : "relative",
          top: 0,
          width: "100%",
          backgroundColor: "white",
          padding: "10px 0",
          boxShadow: isHeaderFixed ? "0 4px 6px -1px rgba(0, 0, 0, 0.1)" : "none",
        }}
      >
        <h4 style={{ marginRight: "10px" }}>
          <Link to="/">Shop</Link>
        </h4>
        <h4>
          <Link to="/cart">Cart</Link>
        </h4>
      </header>
      {/* Add a placeholder to prevent content from being hidden under the fixed header */}
      <div style={{ height: isHeaderFixed ? "50px" : "0" }}></div>
    </>
  );
};

export default Header;
