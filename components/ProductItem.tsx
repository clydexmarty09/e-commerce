"use client"; 
import { Product, useCart } from "@/context/CartContext"; 


export default function ProductItem({product}: {product: Product}) {
    
    const { addToCart } = useCart(); 

    return (
        <div> 
            <h2> {product.name} </h2>
            <button onClick={() => addToCart(product)}> 
                Add to Cart
            </button>
        </div>
    )

}