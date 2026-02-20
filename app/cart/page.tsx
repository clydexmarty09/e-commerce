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

            <p> Cart Is Empty</p>
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
            <div className="flex items-center justify-between gap-4 border border-green-500/30 rounded-md p-3" key={item.product.id}>
            <p> Name: {item.product.name} </p>
            <p> Unit Price: {formatMoney(item.product.price)} </p>
            <p> Subtotal: ${lineSubtotal.toFixed(2)} </p>
            <div className="my-2"> 
                <button
                    disabled={item.quantity === 1}
                    onClick={() => removeFromCart(item.product.id)}
                >
                    [-]
                </button>

                <span> {item.quantity} </span>

                <button onClick={() => addToCart(item.product)}>[+]</button>
                <button onClick={() => removeItem(item.product.id)}>Remove Item</button>
            </div>
            </div>
        );
        })}
        <div className="py-8"> 
            <p> Total items: {total} </p>
            <p> Total price: ${totalPrice.toFixed(2)} </p>
        </div>

        <button onClick={() => clearCart()}>Clear Cart</button>
        <Link href="/checkout"> Proceed to checkout </Link>
        <p> OR </p>
        <Link href="/"> Continue Shopping</Link>
    </div>
    ); 
  
}