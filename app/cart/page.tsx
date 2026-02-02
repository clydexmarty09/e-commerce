"use client"; 
import { useCart } from "@/context/CartContext"; 

export default function CartPage() {

    const { items, total, clearCart, addToCart, removeFromCart, removeItem } = useCart(); 
    
    const totalPrice = items.reduce((sum, item) => {
        return sum + item.product.price * item.quantity; 
    }, 0);  
    
    if(items.length==0) {
        return(

            <p> Cart Is Empty</p>
        ); 
    }

    /*
    the add and remove buttons need to be inside the map so it encapulates each individual item
    */
    return (
    <div>
        {items.map((item) => {
        const lineSubtotal = item.quantity * item.product.price;

        return (
            <div key={item.product.id}>
            <p> name: {item.product.name} </p>
            <p> Unit Price: ${item.product.price.toFixed(2)} </p>
            <p> Subtotal: ${lineSubtotal.toFixed(2)} </p>

            <button
                disabled={item.quantity === 1}
                onClick={() => removeFromCart(item.product.id)}
            >
                [-]
            </button>

            <span> {item.quantity} </span>

            <button onClick={() => addToCart(item.product)}>[+]</button>
            <button onClick={() => removeItem(item.product.id)}>Remove Item</button>
            </div>
        );
        })}

        <p> Total items: {total} </p>
        <p> Total price: ${totalPrice.toFixed(2)} </p>

        <button onClick={() => clearCart()}>Clear Cart</button>
        <a href="/checkout"> Proceed to checkout </a>
        <p> OR </p>
        <a href="/"> Continue Shopping</a>
    </div>
    ); 
  
}