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
    const isFormValid =  
        name.trim().length>0 && address.trim().length>0 && email.trim().length>0; 
    
    return (
        <main className="flex flex-col items-center w-full"> 
            <h1 className="py-4 my-2 text-3xl font-semibold"> Checkout</h1>
            <ul className="gap-6 flex flex-col py-8 px-8 border border-green-500/30 rounded-md"> 
                {items.map ((item) =>(

                    <li className="font-medium truncate" key={item.product.id}> 
                    {item.product.name} - qty: {item.quantity} - 
                    <span className="opacity-80"> ${item.product.price * item.quantity}</span>
                    </li>
                ))}
            </ul>
            
            <div className=" text-center flex flex-col py-6"> 
                <p className="font-semibold"> Total items: { total } </p>
                <p className="text-xs opacity-80"> Total price: {formatMoney(totalPrice)} </p>
            </div>
            <div> 
                <label> 
                    Name: 
                    <input
                        type="text"
                        value={name}
                        onChange={(e)=> {
                            setName(e.target.value)
                            setError(null); 
                        }}
                    />
                </label>
                <br/>
                <label> 
                    Email:
                    <input
                        type="email"
                        value={email}
                        onChange={(e)=> {
                            setEmail(e.target.value)
                            setError(null); 
                        }} //onChange = event handler that runs when an input's value changes
                    />
                </label>
                <br/>
                <label> 
                    Adress: 
                    <input
                        type="text"
                        value={address}
                        onChange={(e)=> { 
                            setAddress(e.target.value)
                            setError(null); 
                        }}
                    />
                </label>
            </div> 
            <br/>

            <button
            disabled={isPlacing}
            onClick={async()=> {

                if(!isFormValid) {
                    setError("Please fill in the required forms."); 
                    return; 
                }

                setError(null);
                if (isPlacing) return; 
                setIsPlacing(true); 


                try {
                    const newOrder = await placeOrder({
                        name: name.trim(), email: email.trim(), address: address.trim(), 
                    }); 
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