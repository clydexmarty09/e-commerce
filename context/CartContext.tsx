"use client"; 
// code must run in the browser, not the server

import React, { createContext, useContext, useMemo, useState } from "react"; 
// createContext = creates global pipe that carries cart data
// useContext lets a component tap into the pipe
// useState stores the cart array in memory 
// useMemo -- avoids recreating the context value object every render 
// React is needed for React.ReactNode typing 

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

// interface/menu for the cart 
type CartContextValue = {  // CartContextValue is an object type 
    items : CartItem[];  // items is a list of CartItem
    addToCart : (product: Product)=> void;  // function that takes in paramater product of type Product. returns nothing 
    removeFromCart : (productID: string)=> void;  // function that takes in paramater productID of type string. returns nothing 
    clearCart : ()=> void; // clears cart - return nothing 
    getQuantity : (productId: string)=> number; // function that takes in parameter productID of type string. Returns a number
    totalItems : number; // data -- totalItems of type number 
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
    */
    const [items, setItems] = useState<CartItem[]>([]); 
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
    const removeFromCart = (prouctID : string)=> {


    }; 

    /*
    clearCart function
    */
    const clearCart = ()=> {

    }; 
    /*
    getQuantity function
    */
   const getQuantity = (productID: string)=> {

   }; 
}