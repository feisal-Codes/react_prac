import "../styles.css";
import List from "./list";

const Products = ({ handleAddToCart, data }) => {
  return (
    <div className="flex justify-around ">
      <List data={data} handleAddToCart={handleAddToCart} />
    </div>
  );
};

export default Products;
