import {products} from "../data/products"; 
import ProductItem from "../components/ProductItem"

export default function Home() {
  return (
  <main> 
    <h1> Products</h1>
    <ul> 
      {products.map((p)  => (
        <ProductItem key={p.id} product={p} />
      ))}
    </ul>
  </main>
  );
}
