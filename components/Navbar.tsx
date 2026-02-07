"use client"; 
import Link from "next/link"; 
import { useCart } from "@/context/CartContext"; 

export default function Nav() {

    const { total } = useCart(); 

    return (

        <nav> 
            <Link href="/"> Home</Link> { "|" }
            <Link href="/cart"> Cart ({total})</Link> {"|"}
            <Link href="/orders"> Orders</Link>

        </nav>

    );  
}