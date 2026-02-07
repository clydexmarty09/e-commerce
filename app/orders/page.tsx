"use client"; 

import { useCart } from "@/context/CartContext"; 
import Link from "next/link"; 

export default function OrderPage() {

    const { orders } = useCart(); 
    if (orders.length === 0) {
        return (
            <main> 
                <h1> No orders yet</h1>
                <Link href="/"> Back to Shop</Link>
            </main>
        ); 
    }
    else {
        return (

            <main> 
                <h1> Order Information: </h1>
                <ul> 
                    {orders.map((order)=> (
                        <li key={order.id}> 
                            <p> Date ordered: {new Date(order.createdAt).toLocaleString()}</p>
                            <p> Item count: {order.items.reduce((s,i)=> s+i.quantity,0)}</p>
                            <p> ID: {order.id} </p>
                            <p> Total Price: ${order.totalPrice}</p>
                            <Link href={`/orders/${order.id}`}> View Order</Link>
                        </li>
                    ))}
                </ul>
                <Link href="/"> Back to Shop</Link>
            </main>
        ); 
    }
}