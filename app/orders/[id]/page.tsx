"use client"; 

import { useCart } from "@/context/CartContext"; 
import Link from "next/link"; 
import { useParams } from "next/navigation";
import { formatMoney } from "@/utils/format";   

export default function OrderDetailsPage() {
    const { id } = useParams<{ id: string }>(); // gives already resolved routhe params from client router
    const { orders } = useCart(); 
    const order = orders.find(o=> o.id === id); 

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
            <p> Total Price: {formatMoney(order.totalPrice)}</p>
            
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