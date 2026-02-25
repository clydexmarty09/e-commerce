"use client"; 
import { Product, useCart } from "@/context/CartContext"; 



export default function ProductItem({product}: {product: Product}) {
    
    const { addToCart, clearCart, removeFromCart } = useCart(); 
    

    return (
        <main className="border border-green-500/20 bg-black rounded-xl p-5"> 
            <div className="flex items-start justify-between gap-4"> 
                <div className="min--0">
                    <h2 className="text-lg font-semibold text-green-100 truncatefont-style:italic"> {product.name} </h2>
                    <p className="mt-1 text-sm text-green-200/70"> Manage this item in cart</p>
                </div> 
            </div>
                
                <div className="flex flex-wrap mt-4 gap-2"> 
                    <button className="inline-flex items-center justify-center rounded-md border border-green-500/30 bg-black/40 px-3 py-2 text-sm text-green-100 hover:border-green-500/50 hover:bg-black/60 active:scale-95 transition" onClick={() => addToCart(product)}> 
                        Add to Cart 
                    </button>
                
                    <button className="inline-flex items-center justify-center rounded-md border border-green-500/30 bg-black/40 px-3 py-2 text-sm text-green-100 hover:border-green-500/50 hover:bg-black/60 active:scale-95 transition" onClick ={()=> clearCart()}>
                        Remove All Items
                    </button>

                    <button className="inline-flex items-center justify-center rounded-md border border-green-500/30 bg-black/40 px-3 py-2 text-sm text-green-100 hover:border-green-500/50 hover:bg-black/60 active:scale-95 transition" onClick ={()=> removeFromCart(product.id)}> 
                        Remove one item
                    </button>
                </div>
            
        </main>
    )

}