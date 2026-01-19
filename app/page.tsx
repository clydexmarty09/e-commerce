import {products} from "../data/products"; 
import ProductItem from "../components/ProductItem"
import ProductList from "../components/ProductList"
import Link from "next/link"; 

import DebugCart  from "@/components/DebugCart"; 

export default function Home() {
  return (
  <main> 
    <h1> Products</h1>
    <ProductList products= {products} />
    <Link href="/cart"> Go To Cart</Link>
    <DebugCart /> 
  </main>
  );
}
