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
}