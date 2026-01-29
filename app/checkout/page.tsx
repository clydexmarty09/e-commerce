"use client"; 
import { useCart } from "@/context/CartContext";

export default function CheckoutPage() {

    

    const { items, total } =  useCart(); 
    if (items.length === 0 ) {
        return <h1> Cart is Empty</h1>
    }

    const totalPrice = items.reduce((sum, item) => {

        return sum + item.product.price * item.quantity; 

    }, 0);

    return (
        <main> 
            <h1> Checkout</h1>
            <ul> 
                {items.map ((item) =>(

                    <li key={item.product.id}> 
                    {item.product.name} - qty: {item.quantity}
                    </li>
                ))}
            </ul>

            <p> Total items: { total } </p>
            <p> Total price: { totalPrice} </p>
            
        </main>
    )
}