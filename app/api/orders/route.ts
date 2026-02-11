// testing github
import { NextResponse } from "next/server";  // Next js helper for returning HTTP responses 

// type definitions
type Product = {
    id: string; 
    name: string; 
    price: number; 
    image?: string; 
}; 

type CartItem = {
    product: Product; 
    quantity: number; 
}; 

type CustomerInfo = {
    name: string; 
    email: string; 
    address: string; 
}

type Order = {
    id: string; 
    createdAt: number; 
    items: CartItem[]; 
    totalPrice: number; 
    customer: CustomerInfo; 
}

// TEMP in-memmory database 
// resets when the server restarts 
let ORDERS: Order[] = []; 

/* 
 GET handler - when the browser calls fetch ("/api/orders"), it gets all orders
 NextResponse.json makes a JSON response with the correct headers 
*/
export async function GET() {
    return NextResponse.json({ orders: ORDERS }); 
}
/*
 POST handler - 
 req: Request is the standard Web API Request object 

*/
export async function POST(req: Request) {
    try { // try/catch catches parsing errors like, body isn't valid JSON, or body is empty 
        const body =  await req.json(); // reads the incoming request body and parses JSON

        //Expect: { items, customer } 
        const items: CartItem[] = body.items ?? []; // ?? nullish coalescing: if body.items is null or undefined, use []
        // otehrwise, use body.items
        const customer: CustomerInfo | undefined = body.customer; // customer *might be missing

        // validation
        // if customer is undefined, customer?.name becomes undefined instead of crashing
        if(!customer?.name || !customer?.email || !customer?.address) {
            return NextResponse.json (
                { error: "Missing customer information"}, 
                { status: 400}
            ); 
        }
        
        if (!Array.isArray(items) || items.length === 0) { // ensures the incoming thing is actually an array
            return NextResponse.json(
                { error: "Cart is Empty" }, 
                { status: 400 }
            ); 
        }
        const totalPrice =  items.reduce((sum, item) => {
            return sum + item.product.price * item.quantity;
        }, 0);

        // create the order 
        const newOrder: Order = {
            id: crypto.randomUUID(), 
            createdAt: Date.now(), 
            items, totalPrice, customer,
        }; 
        ORDERS.unshift(newOrder);  // save + return: unshift adds to the front of the array 

        return NextResponse.json (
            { order: newOrder }, 
            { status: 201 }  // 201 for successful creation
        ); 
        } catch { // return HTTP 400 bad request if JSON parsing fails 
            return NextResponse.json(
                { error: "Invalid JSON body" }, 
                { status: 400 }
            ); 
        }
    }