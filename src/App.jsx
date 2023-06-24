import Products from "./components/Products";
import ProductsForm from "./components/ProductsForm";

export const App = () => {
  return (
    <div>
      <ProductsForm/>
      <Products/>           
    </div>
  );
};

export default App;