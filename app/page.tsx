import {products} from "../data/products"; 
import ProductItem from "../components/ProductItem"
import ProductList from "../components/ProductList"
import Link from "next/link"; 
import { useCart } from "@/context/CartContext"; 
import DebugCart  from "@/components/DebugCart"; 

export default function Home() {

  const { total } = useCart(); 

  return (
  <main> 
    <h1> Products</h1>
    <ProductList products= {products} />
    <Link href="/cart"> Go To Cart ({total})</Link> 
    <DebugCart /> 
  </main>
  );
}
