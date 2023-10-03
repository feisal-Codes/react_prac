import { Link } from "react-router-dom";
const Header = () => {
  return (
    <>
      <header style={{ display: "flex", justifyContent: "center" }}>
        <h4 style={{ marginRight: "10px" }}>
          <Link to="/">Shop</Link>
        </h4>
        <h4>
          <Link to="/cart">Cart</Link>
        </h4>
      </header>
    </>
  );
};

export default Header;
