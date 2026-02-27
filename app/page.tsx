"use client"; 
//import {products} from "../data/products"; 
import ProductItem from "../components/ProductItem"
import ProductList from "../components/ProductList"
import Link from "next/link"; 
import { useCart } from "@/context/CartContext"; 
import { useState, useEffect } from "react"; 
//import DebugCart  from "@/components/DebugCart"; 

type Product = {
  id: string; 
  name: string; 
  price: number; 
  image?: string; 
}

export default function Home() {

  const { total } = useCart(); 

  const[products, setProducts] = useState<Product[]>([]); 
  const[loading, setLoading] = useState(true); 
  const[error, setError] = useState<string | null>(null); 

  useEffect(()=> {
    async function load() {
      try {
        setLoading(true); 
        setError(null); 
        const res = await fetch("/api/products"); 

        if(!res.ok) {
          throw new Error("Failed to load products"); 
        }
        const data = await res.json(); 
        setProducts(data.products); 
      } catch (err:any) {
          setError(err.message ?? "Unknown error"); 
      } finally {
        setLoading(false); 
      }
    }

    load(); 
  }, []); 
  return (
  <main> 
    <h1 className="text-4xl font-bold py-4"> Products</h1>
    {loading && <p> Loading...</p>}
    {error && <p> Error: {error}</p>}
    {!loading && !error && (
     <ProductList products= {products} />
    )}
    <Link className="transition btn-hover p-2 hover:bg-green-500/10 border border-green-500/30 rounded-md font-semibold mt-8 inline-block text-green-300 hover:text-green-200" href="/cart"> Go To Cart ({total})</Link> 
    
  </main>
  )
}
