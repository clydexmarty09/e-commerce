"use client"; 
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
    const[orders, setOrders] = useState<Order[]>([]); 
    const[ordersLoading, setOrdersLoading] = useState(true); 
    const[error, setError] = useState<string | null>(null); 

    // fetch from backend db API 
    // run effect when component appears on screen 
    useEffect(()=> { // Immediately Invoked Async Function expression: define async functuion and run immediately 
        (async()=> {
            try {
                setOrdersLoading(true);  // mark page as loading
                setError(null);  // setError(null)

                // Browser-> fetch-> API route -> DB -> JSON -> back 
                const res = await fetch("/api/orders");  // send req to /api/orders

                if(!res.ok) { // check HTTP success (200-299) status codes
                    throw new Error(`Failed to load orders (HTTP ${res.status})`); 
                }

                const data = await res.json();  // parse JSON body
                
                //if data is already an array, use it. Else, assume it's { orders: [...]} 
                const list = Array.isArray(data) ? data: data.orders; 

                setOrders(list ?? []); // save into React state (if list exists, use it. Else use empty array )
            } catch(e) { // if anything fails, store error message and clear orders
                setError(e instanceof Error ? e.message: "Failed to load orders"); 
                setOrders([]); 
            } finally {
                setOrdersLoading(false); 
            }
        })(); 
    }, []);  // run effect only once when the component first mounts 
    if(ordersLoading) {
        return (
            <main> 
                <h1> Loading orders...</h1>
                <Link href="/"> Back to Shop</Link>
            </main>
        ); 
    }
    
    if(error) {
        return(
            <main> 
                <h1> Couldn't load orders</h1>
                <p>{error}</p>
                <Link href="/"> Back to shop</Link>
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
                <h1 className="text-3xl my-2"> Order Information: </h1>
                <ul className="flex flex-col gap-4"> 
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
                <Link className="links" href="/"> Back to Shop</Link>
            </main>
        ); 
    }
}