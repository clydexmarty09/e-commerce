"use client"; 
import { Product, useCart } from "@/context/CartContext"; 



export default function ProductItem({product}: {product: Product}) {
    
    const { addToCart, clearCart, removeFromCart } = useCart(); 
    

    return (
        <div className="flex gap-8 space-x-2 space-y-3"> 
            <h2 className="font-style: italic"> {product.name} </h2>
            <button className="flex gap-2" onClick={() => addToCart(product)}> 
                Add to Cart 
            </button>
          
            <button className="flex gap-2" onClick ={()=> clearCart()}>
                Remove All Items
            </button>

            <button className="flex gap-2 rounded-md border px-2 py-1 hover:bg-amber-300 hover:cursor-pointer" onClick ={()=> removeFromCart(product.id)}> 
                Remove one item
            </button>
        </div>
    )

}