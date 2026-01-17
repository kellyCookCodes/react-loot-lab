import Header from "../components/Header";
import Products from "../components/Products";

function Landing({ addToCart, cart }) {
  return (
    <div>
      <Header />
      <hr />
      <Products cart={cart} addToCart={addToCart} />
    </div>
  );
}

export default Landing