"use client"; 
import { useCart } from "@/context/CartContext"; 

export default function CartPage() {

    const { items, total, clearCart, addToCart, removeFromCart } = useCart(); 
    
    if(items.length==0) {
        return(

            <p> Cart Is Empty</p>
        ); 
    }

    /*
    the add and remove buttons need to be inside the map so it encapulates each individual item
    */
    return(
        <div>
        {items.map((item) => (

            <div key ={item.product.id}>
                <p> name: {item.product.name} </p>
                 <button onClick = {()=> {removeFromCart(item.product.id)}}> [-] </button>
                <span> {item.quantity}</span>
                <button onClick = {()=> {addToCart(item.product)}}> [+] </button>
              
             
           </div>
        ))}
        <p> Total items: {total} </p>
        <button onClick= {()=> {clearCart()}}>
        Clear Cart
        </button>
       </div> 
    ); 
    
}