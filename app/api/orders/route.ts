// testing github
import { NextResponse } from "next/server"; 

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

type Customer = {
    name: string; 
    email: string; 
    address: string; 
}

type Order = {
    id: string; 
    createdAt: number; 
    items: CartItem[]; 
    totalPrice: number; 
    customer: Customer; 
}

// TEMP in-memmory database 
let ORDERS: Order[] = []; 

export async function GET() {
    return NextResponse.json({ orders: ORDERS }); 
}

export async function POST(req: Request) {
    try {
        const body =  await req.json(); 

        //Expect: { items, customer } 
        const items: CartItem[] = body.items ?? []; 
        const customer: Customer | undefined = body.customer; 

        // validation
        if(!customer?.name || !customer?.email || !customer?.address) {
            return NextResponse.json (
                { error: "Missing customer information"}, 
                { status: 400}
            ); 
        }
        if (!Array.isArray(items) || items.length === 0) {
            return NextResponse.json(
                { error: "Cart is Empty" }, 
                { status: 400 }
            ); 
        }
        const totalPrice =  items.reduce((sum, item) => {
            return sum + item.product.price * item.quantity;
        }, 0);

        const newOrder: Order = {
            id: crypto.randomUUID(), 
            createdAt: Date.now(), 
            items, totalPrice, customer,
        }; 
        ORDERS.unshift(newOrder); 

        return NextResponse.json (
            { order: newOrder }, 
            { status: 201 } 
        ); 
        } catch {
            return NextResponse.json(
                { error: "Invalid JSON body" }, 
                { status: 400 }
            ); 
        }
    }