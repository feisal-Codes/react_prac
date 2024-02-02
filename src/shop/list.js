import React, { useState, useEffect } from "react";

const List = ({ data, handleAddToCart }) => {
  const [alertProduct, setAlertProduct] = useState(null);

  const handleAddToCartClick = (product) => {
    handleAddToCart(product);
    setAlertProduct(product);

    // Auto dismiss the alert after 3 seconds (adjust as needed)
    setTimeout(() => {
      setAlertProduct(null);
    }, 3000);
  };

  return (
    <>
      {data.length > 0 &&
        data.map((product) => (
          <div
            key={product.id}
            style={{
              textAlign: "center",
              width: "300px",
              height: "500px",
              paddingBottom: "10px",
              marginBottom: "40px",
              border: "1px solid #e2e8f0",
              borderRadius: "8px",
              position: "relative",
            }}
          >
            {alertProduct && alertProduct.id === product.id && (
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  backgroundColor: "#4CAF50",
                  color: "white",
                  padding: "10px",
                  borderRadius: "8px 8px 0 0",
                }}
              >
                Product added to cart!
              </div>
            )}
            <img
              src={product.image}
              style={{
                width: "200px",
                height: "200px",
                objectFit: "cover",
                borderRadius: "8px 8px 0 0",
              }}
              alt="product"
            />
            <h4 className="text-lg font-semibold mt-2">{product.title}</h4>
            <p className="text-sm text-gray-600 mb-4">
              {product.description.substring(0, 80)}
            </p>
            <p className="font-bold text-lg mb-2">${product.price}</p>
            <p className="text-gray-500">
              Ratings: {product.rating.rate} rated by {product.rating.count} shoppers
            </p>
            {handleAddToCart && (
              <button
                onClick={() => {
                  handleAddToCartClick(product);
                }}
                className="bg-blue-500 text-white px-4 py-2 rounded mt-4 hover:bg-blue-600"
              >
                Add to Cart
              </button>
            )}
          </div>
        ))}
    </>
  );
};

export default List;
