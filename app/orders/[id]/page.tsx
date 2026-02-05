"use client"; 

import { useCart } from "@/context/CartContext"; 
import Link from "next/link"; 

export default function OrderDetailsPage(
    { params }: { params: { id: string }}
) {

    const { orders } = useCart(); 
    const order = orders.find(o=>o.id===params.id); 

    if (!order) {
        return (
            <main> 
                <h1> Order is not found </h1>
                <Link href="/orders"> Back to Orders </Link>
            </main>
        ); 
    }

    return (
        <main> 
            <h1> Order Detail</h1>
            <p> ID: {order.id} </p>
            <p> Total Price: ${order.totalPrice}</p>
            
            <h2> Items</h2>
            <ul> 
                {order.items.map(item=> (
                    <li key={item.product.id}>
                        {item.product.name} - {item.quantity}
                    </li>
                ))}
            </ul>
            <Link href="/orders"> Back to Orders </Link>
        </main>
    )
}