//import { products } from "@/data/products"; 
import { formatMoney } from "@/utils/format";
import { db } from "@/lib/db"; 
import Link from "next/link"; 
import AddToCartButton from "./addToCart"; 

type Product = {
    name: string; 
    id: string; 
    price: number; 
    image?: string; 
}

export default async function ProductDetailPage({
    params, }: { params: Promise<{ id: string }>; 
}) {

   
    const {id} =  await params; 

    console.log("ProductDetailPage params.id = ", id); 

    //debugging
    //console.log("PRODUCTS", products); 
    //console.log("PARAMS ID:", id); 

const [allIds] = await db.query<any[]>(
  `SELECT id FROM products ORDER BY id LIMIT 10`
);

console.log("DB product ids sample:", allIds);
    const [rows] = await db.query<any[]> (
       `SELECT id, name, price_cents, image
        FROM products
        WHERE id = ? 
        LIMIT 1`, [id]
    ); 

    if(!rows || rows.length === 0) {
        return(
            <main> 
                <h1> Product not found</h1>
                <Link href="/"> Back to Products</Link>
            </main>
        ); 
    }

    const r = rows[0]; 
    const product: Product = {
        id: r.id, 
        name: r.name, 
        price: Number(r.price_cents) / 100, 
        image: r.image ?? undefined 
    }; 


    return (
        <main> 
            <h1> {product.name} </h1>
            <p> Price: {formatMoney(product.price)} </p>
            <p> ID: {product.id} </p>
            <AddToCartButton product={product}/>
            <Link href="/"> Back to Products</Link>
        </main>
    ); 
}