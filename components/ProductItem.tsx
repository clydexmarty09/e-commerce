"use client"; 
import { Product, useCart } from "@/context/CartContext"; 



export default function ProductItem({product}: {product: Product}) {
    
    const { addToCart, clearCart, removeFromCart } = useCart(); 
    

    return (
        <div> 
            <h2> {product.name} </h2>
            <button onClick={() => addToCart(product)}> 
                Add to Cart  
            </button>
          
            <button onClick ={()=> clearCart()}>
                Remove All Items
            </button>

            <button onClick ={()=> removeFromCart(product.id)}> 
                Remove one item
            </button>
        </div>
    )

}