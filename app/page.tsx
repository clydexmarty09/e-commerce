import {products} from "../data/products"; 
import ProductItem from "../components/ProductItem"
import ProductList from "../components/ProductList"

export default function Home() {
  return (
  <main> 
    <h1> Products</h1>
    <ProductList products = {products} />
  </main>
  );
}
