"use client"; 
import { Product, useCart } from "@/context/CartContext"; 



export default function ProductItem({product}: {product: Product}) {
    
    const { addToCart, clearCart, removeFromCart } = useCart(); 
    

    return (
        <div className="flex flex-col gap-8"> 
            <h2 className="font-style: italic"> {product.name} </h2>
            <div className="flex gap-2"> 
                <button className="btn border border-green-500/30 btn-hover" onClick={() => addToCart(product)}> 
                    Add to Cart 
                </button>
            
                <button className="btn border border-green-500/30 btn-hover" onClick ={()=> clearCart()}>
                    Remove All Items
                </button>

                <button className="btn border border-green-500/30 btn-hover" onClick ={()=> removeFromCart(product.id)}> 
                    Remove one item
                </button>
            </div>
        </div>
    )

}