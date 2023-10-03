import Products from "./products";
import Header from "./header";
import { useEffect, useState } from "react";
import { products } from "../data";

const Shop = ({ handleClick }) => {
  const [filters, setFilters] = useState({
    price: "default"
  });
  const [data] = useState(products);
  const [filteredItems, setFilteredItems] = useState([]);

  useEffect(() => {
    let filterProducts = () => {
      if (filters.price) {
        if (filters.price === "high") {
          setFilteredItems([...data].sort((a, b) => b.price - a.price));
        } else if (filters.price === "low") {
          setFilteredItems([...data].sort((a, b) => a.price - b.price));
        } else {
          setFilteredItems(data);
        }
      }
    };
    filterProducts();
  }, [filters.price, data]);

  const handleChange = (e) => {
    const { id } = e.target;
    console.log(id);
    setFilters((prev) => {
      return { ...prev, price: id };
    });
  };
  return (
    <>
      <Header />
      <div
        style={{
          display: "flex",
          padding: "40px",
          justifyContent: "space-evenly"
        }}
      >
        <div style={{ display: "flex" }}>
          <div style={{}}>
            {filteredItems.length ? (
              <Products handleAddToCart={handleClick} data={filteredItems} />
            ) : (
              <Products handleAddToCart={handleClick} data={data} />
            )}
          </div>
          <div style={{ width: "700px" }}>
            <h4>Filter On Pricing</h4>

            <div>
              <div className="flex">
                <input
                  type="radio"
                  name="price"
                  id="low"
                  value={filters.price}
                  onChange={handleChange}
                />
                <h5>low to high </h5>
              </div>
              <div className="flex">
                <input
                  type="radio"
                  name="price"
                  id="high"
                  value={filters.price}
                  onChange={handleChange}
                />
                <h5> high to low </h5>
              </div>
              <div className="flex">
                <input
                  type="radio"
                  name="price"
                  id="default"
                  value={filters.price}
                  onChange={handleChange}
                />
                <h5> default </h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Shop;
