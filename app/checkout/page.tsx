"use client"; 
import { useCart, Order } from "@/context/CartContext";
import { useState } from "react"; 
import Link from "next/link"; 

export default function CheckoutPage() {
    
    const { items, total, placeOrder } =  useCart(); 
    const [order, setOrder] = useState<Order | null>(null); 
    
    if(order) {
        return (
            <main> 
                <h1> Order confirmed </h1>
                <p> Order ID: {order.id} </p>
                <p> Total Price: ${order.totalPrice} </p>

                <h2> Items </h2>
                <ul> 
                    {order.items.map((item)=> (
                        <li key={item.product.id}> 
                        {item.product.name} - qty: {item.quantity} 
                        </li>
                    ))}
                </ul>
                <Link href="/"> Continue Shopping</Link>
            </main>
        ); 
    }
    
    if (items.length === 0 ) {
        return  (
        <main>
            <h1> Cart is Empty</h1>
            <Link href="/"> Back to products </Link>
        </main>
        ); 
    }

    // reduce = takes many values and combines them into one value 
    // syntax: array.reduce((accumulator, currentItem)=> {=> ...}, startingValue)
    const totalPrice = items.reduce((sum, item) => {

        return sum + item.product.price * item.quantity; 

    }, 0);

    // map array in JSX, and use stable key
    return (
        <main> 
            <h1> Checkout</h1>
            <ul> 
                {items.map ((item) =>(

                    <li key={item.product.id}> 
                    {item.product.name} - qty: {item.quantity} - 
                    <span> ${item.product.price * item.quantity}</span>
                    </li>
                ))}
            </ul>

            <p> Total items: { total } </p>
            <p> Total price: ${ totalPrice} </p>
            <button
            onClick={()=> {
                const newOrder = placeOrder(); 
                setOrder(newOrder); 
            }}> Place Order </button>
            
        </main>
    ); 
}