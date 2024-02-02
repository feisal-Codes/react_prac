import Products from "./products";
import Header from "./header";
import { useEffect, useState } from "react";
import { products } from "../data";

const Shop = ({ handleClick }) => {
  const [filters, setFilters] = useState({
    price: "default",
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
    setFilters((prev) => {
      return { ...prev, price: id };
    });
  };

  return (
    <>
      <Header />
      <div style={{ display: "flex", padding: "40px" }}>
        <div style={{ flex: 1, marginLeft: "220px" }}>
          {" "}
          {/* Add margin to create space for fixed filters */}
          {filteredItems.length ? (
            <Products handleAddToCart={handleClick} data={filteredItems} />
          ) : (
            <Products handleAddToCart={handleClick} data={data} />
          )}
        </div>
        <div
          style={{
            width: "200px",
            marginLeft: "20px",
            position: "fixed",
            overflowY: "scroll",
            height: "100vh",
          }}
        >
          <div
            style={{
              padding: "10px",
              border: "1px solid #e2e8f0",
              borderRadius: "8px",
            }}
          >
            <h4 style={{ marginBottom: "10px", textAlign: "center" }}>
              Filter On Pricing
            </h4>

            <div style={{ marginBottom: "8px" }}>
              <div className="flex">
                <input
                  type="radio"
                  name="price"
                  id="low"
                  value={filters.price}
                  onChange={handleChange}
                />
                <label htmlFor="low" style={{ marginLeft: "5px" }}>
                  Low to High
                </label>
              </div>
              <div className="flex">
                <input
                  type="radio"
                  name="price"
                  id="high"
                  value={filters.price}
                  onChange={handleChange}
                />
                <label htmlFor="high" style={{ marginLeft: "5px" }}>
                  High to Low
                </label>
              </div>
              <div className="flex">
                <input
                  type="radio"
                  name="price"
                  id="default"
                  value={filters.price}
                  onChange={handleChange}
                />
                <label htmlFor="default" style={{ marginLeft: "5px" }}>
                  Default
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Shop;
