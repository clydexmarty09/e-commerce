"use client"; 
import { useCart } from "@/context/CartContext"; 
import { formatMoney } from "@/utils/format"; 
import  Link  from "next/link"; 

export default function CartPage() {

    const { items, total, clearCart, addToCart, removeFromCart, removeItem } = useCart(); 
    
    const totalPrice = items.reduce((sum, item) => {
        return sum + item.product.price * item.quantity; 
    }, 0);  
    
    if(items.length==0) {
        return(

            <p className="text-3xl flex font-semibold justify-center"> Cart Is Empty</p>
        ); 
    }

    /*
    the add and remove buttons need to be inside the map so it encapulates each individual item
    */
    return (
    <div className="page">
        {items.map((item) => {
        
        const lineSubtotal = item.quantity * item.product.price;

        return (
            <div className="bg-black flex items-center justify-between gap-4 border border-green-500/20 rounded-md p-3" key={item.product.id}>
                <div className="min-w-0"> 
                    <p className="font-medium truncate text-green-100"> Name: {item.product.name} </p>
                    <p className="text-sm opacity-80 text-green-200/70"> Unit Price: {formatMoney(item.product.price)} </p>
                    <p className="font-medium mt-4 text-green-100/80"> Subtotal: <span className="text-green-200/70"> ${lineSubtotal.toFixed(2)} </span></p>
                </div>
                
                <div className="flex items-center gap-2"> 
                    <button
                        className="btn text-green-300 btn-hover border border-green-500/30"
                        disabled={item.quantity === 1}
                        onClick={() => removeFromCart(item.product.id)}
                    >
                        [-]
                    </button>

                    <span className="w-8 text-center"> {item.quantity} </span>

                    <button className="text-green-300 btn btn-hover border border-green-500/30" onClick={() => addToCart(item.product)}>[+]</button>
                    <button className="btn btn-hover border text-green-300 border-green-500/30" onClick={() => removeItem(item.product.id)}>Remove</button>
                </div>
            </div>
        );
        })}

        <button className="text-green-300 btn-hover not-only:my-6 btn border border-green-500/30" onClick={() => clearCart()}>Clear Cart</button>
        <div className="w-full py-6"> 
            <p className="text-green-100 font-semibold text-left"> Total items: <span className="text-green-100/70">{ total} </span> </p>
   
            <p className="text-xs opacity-70 text-left text-green-200/80"> Total price: <span className="text-green-100/80">${totalPrice.toFixed(2)} </span> </p>
        </div>
        
        <div className="flex flex-col gap-6"> 
            <Link className="p-2 text-green-300 btn transition inline-block btn-hover hover:bg-green-500/10 hover:text-green-200 border border-green-500/30 rounded-md" href="/checkout"> Proceed to checkout </Link>
            {/*<Link className="btn border border-green-500/30" href="/"> Continue Shopping</Link>*/}
        </div>
    </div>
    ); 
  
}