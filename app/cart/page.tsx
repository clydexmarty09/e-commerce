"use client"; 
import { useCart } from "@/context/CartContext"; 

export default function CartPage() {

    const { items, total, clearCart } = useCart(); 
    
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
        <p> Total items: {total} </p>
        <div> 
            <button onClick= {()=> {clearCart()}}>
            Clear Cart
            </button>
        </div>
       </div> 
       
    ); 
    
}