"use client"; 

import { useCart } from "@/context/CartContext"; 
import Link from "next/link"; 
import { formatMoney } from "@/utils/format"; 
import { useEffect, useState } from "react"; 

type OrderItem = {
    quantity: number; 
}; 

type Order = {
    id: string; createdAt: number; items: OrderItem[]; totalPrice: number; 
}

export default function OrderPage() {

    //const { orders, ordersLoading } = useCart(); 
    const[orders, setOrders] = useState<any[]>([]); 
    const[ordersLoading, setOrdersLoading] = useState(true); 
    const[error, setError] = useState<string | null>(null); 

    useEffect(()=> {
        (async()=> {
            try {
                setOrdersLoading(true); 
                setError(null); 

                const res = await fetch("/api/orders"); 

                if(!res.ok) {
                    throw new Error('Failed to load orders (HTTP ${res.status})'); 
                }

                const data = await res.json(); 
                const list = Array.isArray(data) ? data: data.orders; 

                setOrders(list ?? []); 
            } catch(e) {
                setError(e instanceof Error ? e.message: "Failed to load orders"); 
                setOrders([]); 
            } finally {
                setOrdersLoading(false); 
            }
        })(); 
    }, []); 
    if(ordersLoading) {
        return (
            <main> 
                <h1> Loading orders...</h1>
                <Link href="/"> Back to Shop</Link>
            </main>
        ); 
    }
    
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
                            <p> Total Price: {formatMoney(order.totalPrice)}</p>
                            <Link href={`/orders/${order.id}`}> View Order</Link>
                        </li>
                    ))}
                </ul>
                <Link href="/"> Back to Shop</Link>
            </main>
        ); 
    }
}