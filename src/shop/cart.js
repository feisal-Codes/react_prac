/**
 You are tasked with building a simple shopping 
 cart application in React. The application should allow users to:
View a list of products with their names, 
prices, and an "Add to Cart" button.
Add products to a shopping cart.
View the contents of the shopping cart, 
including the names, quantities, and total price of each item.
Remove items from the shopping cart.
Adjust the quantity of items in the shopping cart.
Calculate and display the total price of all items in the shopping cart.
Your task is to create the components and logic necessary to implement this shopping cart functionality in React. You should also consider how to manage the state of the application, such as keeping track of the products, the items in the shopping cart, and their quantities.
 
 */

import Header from "./header";

const Cart = ({ cart, setCart }) => {
  const updateCart = (id, direction) => {
    let updatedCart = cart.map((item) => {
      if (item.id === id) {
        if (direction === "increase") {
          return { ...item, quantity: item.quantity + 1 };
        } else if (direction === "decrease" && item.quantity > 1) {
          return { ...item, quantity: item.quantity - 1 };
        }
      }
      return item;
    });
    setCart(updatedCart);
  };

  const removeFromCart = (id) => {
    let filteredCart = cart.filter((product) => product.id !== id);
    setCart(filteredCart);
  };

  const totalPrice = (price, quantity) => {
    return Math.round(Number(price) * Number(quantity));
  };

  let updatedTotal = cart
    .map((product) => {
      return Number(product.quantity) * Number(product.price);
    })
    .reduce((a, b) => Math.round(a + b), 0);
  console.log("^^^^^^^^^^^^&&&&&&&&&&&&&&&");

  // console.log(calcTotalPrice());
  if (cart.length === 0) {
    return (
      <>
        <Header /> <div>cart is empty</div>
      </>
    );
  }
  return (
    <>
      <Header />

      <table style={{ padding: "50px" }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Image</th>
            <th>Price</th>
            <th>Add</th>
            <th>Quantity</th>
            <th>Decrease</th>
            <th>Remove</th>
            <th>Total Price</th>
          </tr>
        </thead>
        {/* <List data={cart} /> */}
        {cart.map((product) => {
          return (
            <tbody key={product.id}>
              <tr>
                <td style={{ width: "200px" }}>{product.title}</td>
                <td style={{ width: "50px" }}>
                  <img
                    src={product.image}
                    width="50px"
                    height="50px"
                    alt="product"
                  />
                </td>
                <td style={{ width: "2px", fontWeight: "bold" }}>
                  {product.price}
                </td>

                <td style={{ width: "20px" }}>
                  <button
                    onClick={() => {
                      updateCart(product.id, "increase");
                    }}
                  >
                    +
                  </button>
                </td>
                <td style={{ width: "20px" }}>{product.quantity}</td>
                <td style={{ width: "20px" }}>
                  <button
                    disabled={product.quantity === 1}
                    onClick={() => {
                      updateCart(product.id, "decrease");
                    }}
                  >
                    -
                  </button>
                </td>
                <td style={{ width: "20px" }}>
                  <button
                    onClick={() => {
                      removeFromCart(product.id);
                    }}
                  >
                    Remove from Cart
                  </button>
                </td>
                <td
                  style={{
                    width: "20px",
                    textAlign: "center",
                    fontWeight: "bold"
                  }}
                >
                  {totalPrice(product.price, product.quantity)}
                </td>
              </tr>
            </tbody>
          );
        })}
        <tbody>
          <tr>
            <td
              style={{
                textAlign: "right",
                paddingRight: "10px",
                fontWeight: "bold"
              }}
              colSpan="8"
            >
              Total : {updatedTotal}
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default Cart;
