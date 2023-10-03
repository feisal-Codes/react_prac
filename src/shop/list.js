const List = ({ data, handleAddToCart }) => {
  return (
    <>
      {data.length > 0 &&
        data.map((product) => {
          return (
            <div
              key={product.id}
              style={{
                textAlign: "center",
                width: "300px",
                height: "500px",
                paddingBottom: "10px"
              }}
            >
              <img
                src={product.image}
                width="200px"
                height="200px"
                alt="product"
              />
              <h4>{product.title}</h4>
              <p style={{ width: "300px" }}>
                {product.description.substring(0, 100)}
              </p>
              <p style={{ fontWeight: "bold", fontSize: "18px" }}>
                {product.price}
              </p>
              <p>
                ratings: {product.rating.rate} rated by {product.rating.count}{" "}
                shoppers
              </p>
              {handleAddToCart && (
                <button
                  onClick={() => {
                    handleAddToCart(product);
                  }}
                >
                  Add to Cart
                </button>
              )}
            </div>
          );
        })}
    </>
  );
};

export default List;
