"use client"; 
import { useCart } from "@/context/CartContext"; 

export default function CartPage() {

    const { items } = useCart(); 
    
    if(items.length==0) {
        return(

            <p> Cart Is Empty</p>
        ); 
    }

    return(
        <div>
        {items.map((item) => (

            <div key ={item.product.id}>
                <p> name: {item.product.name} </p>
                <p> quantity: {item.quantity} </p>
           </div>
        ))}
       </div> 
    ); 
    
}