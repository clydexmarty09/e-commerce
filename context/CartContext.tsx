"use client"; 
// code must run in the browser, not the server

import React, { createContext, useContext, useMemo, useState, useEffect } from "react"; 
// createContext = creates global pipe that carries cart data
// useContext lets a component tap into the pipe
// useState stores the cart array in memory 
// useMemo -- avoids recreating the context value object every render 
// React is needed for React.ReactNode typing 

const CART_STORAGE_KEY = "cartItems"; 

export type Product = {
    id: string; 
    name: string; 
    price:number; 
    image?:string; 
}; 

export type CartItem = {
    product : Product; 
    quantity : number; 
}; 

/* add export Order type for ordering logic*/
export type Order = {
    id: string; 
    createdAt: number; 
    items: CartItem[]; 
    totalPrice: number; 
} 

// interface/menu for the cart 
type CartContextValue = {  // CartContextValue is an object type 
    items : CartItem[];  // items is a list of CartItem
    addToCart : (product: Product)=> void;  // function that takes in paramater product of type Product. returns nothing 
    removeFromCart : (productID: string)=> void;  // function that takes in paramater productID of type string. returns nothing 
    clearCart : ()=> void; // clears cart - return nothing 
    getQuantity : (productId: string)=> number; // function that takes in parameter productID of type string. Returns a number
    removeItem: (productId: string) => void; // removes specific item from cart
    total : number; // data -- totalItems of type number 

    placeOrder:() => Order | null; // context promises that it provides a placeholder function
}

/*
create the global pipe or global communication channel - set to null be default 
createConext<CartContextValue | null> : context will eventually hold a value fo type 
CartContextValue, but for now it might be null. This is because we passed in null as a default type 
CartContext is an object with .Provider component  
Provider is a React component that supplies real cart data, null is a fallback value returned when no Provided exists
upon writing this, we create CartContext.Provider and CartContext.Consumer 

*/
const CartContext = createContext<CartContextValue | null>(null); 

/*
create CartProvider function - a function that holds cart state and define cart logic 
This will also render the real Provider 
{children} is object destructuring - children is of type React.ReactNode; anything react can render 
*/
export function CartProvider({children}: {children: React.ReactNode}) {

    /*
    useSate creates a state variable 
    state = items
    setter = setItems (function that updates the cart)
    initial value = [] (empty cart)
    state will always be an array of CartItem objects. The starting value is [] 

    add "lazy initialization so it only reads localStorage"
    */
    const [items, setItems] = useState<CartItem[]>([]); 
        /* if(typeof window === "undefined") return []; // localStorage only runs in browser 

        // use try/catch prevets corrupted JSON from breaking the app 
        try {
            const stored = localStorage.getItem(CART_STORAGE_KEY); 
            return stored ? JSON.parse(stored): []; // if something was stored->convert string->JS object
        } catch {
            return []; 
        }
    }) ; */

    const [hydrated, setHydrated] = useState(false); 
    
    const addToCart = (product: Product)=> {

        setItems((prev) => { //use prev because it's guaranteed to be the latest state 
            const existing = prev.find(

                (cartItem) => cartItem.product.id === product.id // if the product is already in cart
            ); 

            if (!existing) { // if git product is already not in the cart 
                return[...prev, { product, quantity: 1 }]; // add a brand new item
            }

            return prev.map((cartItem) => // no brackets = implicit return  
                //if the IDs match, return a new object with increased quantity, otherwise, return original cartItem 
                cartItem.product.id === product.id
                ? {...cartItem, quantity: cartItem.quantity + 1} :  cartItem
            ); 
        });
    };
    
    /*
    removeFromCart funtion
    */
    const removeFromCart = (productID : string)=> {
        setItems((prev)=> 
            prev.map((cartItem)=>  // create a new array .map visits evert cart item  = "cart item"
                cartItem.product.id === productID // if match
                ? {...cartItem, quantity: cartItem.quantity -1} : cartItem // return new object with quantity -1, else return original item
            
            )
            .filter((cartItem)=> cartItem.quantity > 0) // only return objects where quantity > 0
        ); 
    }; 

    const removeItem = (productID : string) => {
        setItems((prev) => 
            prev.filter((item) => item.product.id !== productID)
    )}; 

    /*
    clearCart function
    */
    const clearCart = ()=> {
        setItems([]); // replace with brand new empty array 

        try {
            localStorage.removeItem(CART_STORAGE_KEY); 
        } catch {}
    }; 
    /*
    getQuantity function
    look for product in the cart
    if it doesn't exists, return 0 
    */
   const getQuantity = (productID: string)=> {
        return (

            // ?. is optional chaining - if value is undefined, stop and return undefined
            // ?? is the fallback value - if value is null or undefined, return 0 
            items.find((cartItem) => cartItem.product.id === productID)?.quantity ?? 0
        ); 
   }; 

   const placeOrder = (): Order | null => {
        if (items.length === 0) {
            return null; 
        }

        const totalPrice = items.reduce((sum, item) => {
            return sum + item.product.price * item.quantity; 
        }, 0); 

        const order: Order = {
            id: crypto.randomUUID(), createdAt: Date.now(), items: items, totalPrice: totalPrice,
        }; 
        return order; 
   }; 

   //reduce() turns ana array into a single value 
   const total = items.reduce((sum, cartItems) => sum + cartItems.quantity, 0);
   
   /*
   useMemo() remebers the result of the function and only recomputes it when certain values change
   create one cart object and keep using the same one, unless the cart contents actually change
    */
   const value = useMemo(
    ()=> ({  // ()=> ({}) means object being returned 
        items, addToCart, removeFromCart, clearCart, getQuantity, total, removeItem, placeOrder
    }), [items, total] // only rvaecompute if something HERE changes 
   );

   /*
   whenever something happens, run this side effect code 
   side effect = saving to localStorage
   run this everytime [items] changes 
   */
   useEffect(() => {

        try {
            const stored = localStorage.getItem(CART_STORAGE_KEY); 
            if(stored) setItems(JSON.parse(stored)); 
        } catch {}

        setHydrated(true); 

   }, []); 

   useEffect(()=> {

        if(!hydrated) return; 

        try {
            localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items))
        } catch {}

   }, [items, hydrated]); 

   return (
    /*
    render whatever is wrapped inside CartContext.Provider 
    everything inside this provider will be able to access the cart object
    */
    <CartContext.Provider value={value}> 
        {children} 
    </CartContext.Provider>
   ); 

}

/*
declare custom React hook - MUST START WITH "use"
ctx looks up the component tree, finds the nearest <CartContext.Provider>, and returns value
otherwise THROW an error
*/
export function useCart() {
        
    const ctx = useContext(CartContext); 
    if(!ctx) throw new Error("Use cart must be used inside <CartProvider>"); 

    return ctx; 
}