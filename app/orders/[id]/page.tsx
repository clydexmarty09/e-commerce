"use client"; 

import { useCart } from "@/context/CartContext"; 
import Link from "next/link"; 
import { useParams } from "next/navigation";
import { formatMoney } from "@/utils/format";   

export default function OrderDetailsPage() {
    const { id } = useParams<{ id: string }>(); // gives already resolved routhe params from client router
    const { orders, ordersLoading } = useCart(); 
    const order = orders.find(o=> o.id === id); 

    if(ordersLoading) {
        return(
            <main> 
                <h1> Loading Orders...</h1>
                <Link href ="/"> Back to Orders</Link>
            </main>
        ); 
    }

    if (!order) {
        return (
            <main> 
                <h1> Order is not found </h1>
                <Link href="/orders"> Back to Orders </Link>
            </main>
        ); 
    }

    return (
        <main className="px-4 py-10"> 
            <div className="flex flex-col w-full mx-auto max-w-xl gap-4 items-center px-4 py-8 my-8 border rounded-md border-green-500/30 shadow-md"> 
                
                <div className="text-center"> 
                    <h1 className="text-2xl font-semibold text-green-100"> Thank You, {order.customer.name} !</h1>
                    <p className="mt-1 text-sm text-green-200/70"> A confirmation was sent to <span className="font-medium text-green-100"> {order.customer.email} </span></p>
                </div>

                <div className="rounded-lg border border-green-500/20 bg-black/30 p-4 text-sm text-green-100"> 
                    <div className="flex items-center justify-between gap-4">
                        <span className="text-green-200/70"> Order ID: </span>
                        <span className="font-mono text-xs"> {order.id}</span>
                    </div>
                    <div> 
                        <span className="text-green-200/70"> Delivery: </span>
                        <span className="text-right"> {order.customer.address}</span>
                    </div>
                    <div> 
                        <span className="text-green-500/70"> Total: </span>
                        <span className="font-semibold"> {formatMoney(order.totalPrice)} </span> 
                    </div>
                </div>

                <div>
                    <h2 className="text-lg font-semibold text-green-100"> Items</h2>
                    <ul className="mt-3 divide-y divide-green-500/10 rounded-lg border border-green-500/20 bg-black/30"> 
                        {order.items.map(item=> (
                            <li className="flex items-center justify-between gap-4 px-4 py-3" key={item.product.id}>
                                <span className="min-w-0 truncate text-green-100">{item.product.name}</span> 
                                <span className="shrink-0 text-sm text-green-200/70">x{item.quantity}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            
            <Link className="mt-2 inline-flex items-center justify-center rounded-md border border-green-500/30 px-4 py-2 font-semibold text-green-100 hover:bg-green-500/10" href="/orders"> Back to Orders </Link>
            </div>
        </main>
    )
}