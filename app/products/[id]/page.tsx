import { products } from "@/data/products"; 
import { formatMoney } from "@/utils/format";
import { db } from "@/lib/db"; 
import Link from "next/link"; 

type Product = {
    name: string; 
    id: string; 
    price: number; 
    image?: string; 
}

export default async function ProductDetailPage({
    params, }: { params: { id: string }
}) {

   
    const id = params. id;
    console.log("ProductDetailPage params.id = ", id); 

    //debugging
    console.log("PRODUCTS", products); 
    console.log("PARAMS ID:", id); 

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
        price: r.price, 
        image: r.image ?? undefined 
    }; 


    return (
        <main> 
            <h1> {product.name} </h1>
            <p> Price: {formatMoney(product.price)} </p>
            <p> ID: {product.id} </p>
            <Link href="/"> Back to Products</Link>
        </main>
    ); 
}