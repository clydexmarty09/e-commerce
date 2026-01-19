"use client"; 
// this page is for testing purposes
import { useCart } from "@/context/CartContext"; 

export default function DebugCart () {

    const { total } = useCart();
    return <div> Cart Items: { total } </div>; 
}