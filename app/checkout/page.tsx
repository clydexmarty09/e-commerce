"use client"; 
import { useCart } from "@/context/CartContext";
import Link from "next/link"; 
import { useRouter } from "next/navigation"; 
import { useState } from "react"; 
import { formatMoney } from "@/utils/format";  

export default function CheckoutPage() {
    
    const [isPlacing, setIsPlacing] = useState(false); 
    const router = useRouter(); 
    const { items, total, placeOrder } =  useCart(); 
    const [error, setError] = useState<string | null>(null);
    
    //checkout user infomation
    const [name, setName] = useState(""); 
    const [email, setEmail] = useState(""); 
    const [address, setAddress] = useState(""); 
    
    if (items.length === 0 ) {
        return  (
        <main>
            <h1> Cart is Empty</h1>
            <Link href="/"> Back to products </Link>
        </main>
        ); 
    }

    // reduce = takes many values and combines them into one value 
    // syntax: array.reduce((accumulator, currentItem)=> {=> ...}, startingValue)
    const totalPrice = items.reduce((sum, item) => {

        return sum + item.product.price * item.quantity; 

    }, 0);

    // map array in JSX, and use stable key
    return (
        <main> 
            <h1> Checkout</h1>
            <ul> 
                {items.map ((item) =>(

                    <li key={item.product.id}> 
                    {item.product.name} - qty: {item.quantity} - 
                    <span> ${item.product.price * item.quantity}</span>
                    </li>
                ))}
            </ul>

            <p> Total items: { total } </p>
            <p> Total price: {formatMoney(totalPrice)} </p>
            {error &&<p>{error} </p>} {/*only display error if it exists   */}
            
            <label> 
                Name: 
                <input
                    type="text"
                    value={name}
                    onChange={(e)=> setName(e.target.value)}
                />
            </label>
            <br/>
            <label> 
                Email:
                <input
                    type="email"
                    value={email}
                    onChange={(e)=> setEmail(e.target.value)}
                />
            </label>
            <br/>
            <label> 
                Adress: 
                <input
                    type="text"
                    value={address}
                    onChange={(e)=> setAddress(e.target.value)}
                />
            </label>
            <br/>

            <button
            disabled={items.length===0 || isPlacing}
            onClick={async()=> {

                setError(null);
                if (isPlacing) return; 
                setIsPlacing(true); 

                try {
                    const newOrder = await placeOrder(); 
                    if(!newOrder) {
                        setIsPlacing(false); 
                        return; 
                    }
                    router.push(`/orders/${newOrder.id}`); // router.push() navigates to path
            } catch (e) {
                setError("Something went wrong.") 

            } finally {
                setIsPlacing(false); 
            }
            }}> {isPlacing ? "Placing...": "Place Order"} </button>  
        
        </main>
    ); 
}