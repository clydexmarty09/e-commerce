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
            <main className="min-h-screen bg-black text-green-100 px-4 py-10"> 
                <div className="mx-auto w-full max-w-3xl rounded-xl border border-green-500/30 bg-black p-6"> 
                    <h1 className="text-2xl font-semibold"> Loading orders...</h1>
                    <Link className="p-2 hover:bg-green-500/10 border border-green-500/30 rounded-md font-semibold mt-8 inline-block text-green-300 hover:text-green-200" href="/"> Back to Shop</Link>
                </div> 
            </main>
        ); 
    }
    
    if(error) {
        return(
            <main className="min-h-screen bg-black text-green-100 px-4 py-10"> 
                <div className="mx-auto w-full max-w-3xl rounded-xl border border-green-500/30 bg-black p-6"> 
                    <h1 className="text-2xl font-semibold"> Couldn't load orders</h1>
                    <p>{error}</p>
                    <Link className="p-2 hover:bg-green-500/10 border border-green-500/30 rounded-md font-semibold mt-8 inline-block text-green-300 hover:text-green-200" href="/"> Back to shop</Link>
                    </div> 
            </main>
        ); 
    }
    if (orders.length === 0) {
        return (
            <main className="min-h-screen bg-black text-green-100 px-4 py-10"> 
                <div className="mx-auto w-full max-w-3xl rounded-xl border border-green-500/30 bg-black p-6">
                    <h1 className="text-2xl font-semibold"> No orders yet</h1>
                    <Link className="p-2 hover:bg-green-500/10 border border-green-500/30 rounded-md font-semibold mt-8 inline-block text-green-300 hover:text-green-200" href="/"> Back to Shop</Link>
                </div>
            </main>
        ); 
    }
    else {
        return (

            <main className="min-h-screen bg-black text-green-100 px-4 py-10"> 
                <div className="mx-auto w-full max-w-3xl rounded xl border border-green-500/30 bg-black p-6">
                    <h1 className="text-3xl font-semibold tracking-tight"> Order Information: </h1>
                    <ul className="flex mt-6 flex-col gap-4"> 
                        {orders.map((order)=> (
                            <li className="rounded-lg border border-green-500/20 bg-black p-4 hover:border-green-500/400 transition" key={order.id}> 
                                <p className="text-sm text-green-200/80"> Date Ordered:{" "}<span className="text-green-100"> {new Date(order.createdAt).toLocaleString()}</span></p>
                                <p className="text-sm text-green-200/80"> Item count: <span className="text-green-100">{order.items.reduce((s,i)=> s+i.quantity,0)}</span> </p>
                                <p className="text-sm text-green-200/80 break-all"> ID: <span className="text-green-100">{order.id} </span></p>
                                <p className="text-sm text-green-200/80"> Total Price: <span className="text-green-100">{formatMoney(order.totalPrice)}</span></p>
                                <Link className="t-3 inline-block text-green-300 hover:text-green-200 undeline underline-offset-4" href={`/orders/${order.id}`}> View Order</Link>
                            </li>
                        ))}
                    </ul>
                    <Link className="p-2 hover:bg-green-500/10 border border-green-500/30 rounded-md font-semibold mt-8 inline-block text-green-300 hover:text-green-200" href="/"> Back to Shop</Link>
                 </div>
            </main>
        ); 
    }
}