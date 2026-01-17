"use client"; 
// code must run in the browser, not the server

import React, { createContext, useContext, useMemo, useState } from "react"; 
// createContext = creates global pipe that carries cart data
// useContext lets a component tap into the pipe
// useState stores the cart array in memory 
// useMemo -- avoids recreating the context value object every render 
// React is needed for React.ReactNode typing 

export type Product = {
    id: string, name: string, price:number, image?:string; 
}; 

export type CartItem = {
    product : Product; 
    quantity : number; 
}

// interface/menu for the cart 
type CartContextValue = {  // CartContextValue is an object type 
    items : CartItem[]; 
    addToCart : (product: Product)=> void; 
    removeFromCart : (productID: string)=> void; 
    clearCart : ()=> void; 
    getQuantity : (productId: string)=> number; 
    totalItems : number; 
}