// testing github
import { NextResponse } from "next/server"; // Next js helper for returning HTTP responses
import { db } from "@/lib/db";
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
};

type Order = {
  id: string;
  createdAt: number;
  items: CartItem[];
  totalPrice: number;
  customer: CustomerInfo;
};

// TEMP in-memmory database
// resets when the server restarts
let ORDERS: Order[] = [];

/* 
 GET handler - when the browser calls fetch ("/api/orders"), it gets all orders
 NextResponse.json makes a JSON response with the correct headers 

export async function GET() {
  return NextResponse.json({ orders: ORDERS });
} */

export async function GET() {
  const [ordersRows] = await db.query<any[]>(
    `SELECT * FROM orders ORDER BY created_at DESC`,
  );

  const [itemsRows] = await db.query<any[]>(
    `SELECT order_id, product_id, product_name, unit_price, quantity
     FROM order_items`,
  );

  const itemsByOrder = new Map<string, any[]>();
  for (const row of itemsRows) {
    const arr = itemsByOrder.get(row.order_id) ?? [];
    arr.push({
      product: {
        id: row.product_id,
        name: row.product_name,
        price: Number(row.unit_price),
      },
      quantity: row.quantity,
    });
    itemsByOrder.set(row.order_id, arr);
  }

  const orders = ordersRows.map((o) => ({
    id: o.id,
    createdAt: o.created_at,
    totalPrice: Number(o.total_price),
    customer: {
      name: o.customer_name,
      email: o.customer_email,
      address: o.customer_address,
    },
    items: itemsByOrder.get(o.id) ?? [],
  }));

  return NextResponse.json({ orders });
}

/*
 POST handler - 
 req: Request is the standard Web API Request object 

*/
export async function POST(req: Request) {
  try {
    // try/catch catches parsing errors like, body isn't valid JSON, or body is empty
    const body = await req.json(); // reads the incoming request body and parses JSON

    //Expect: { items, customer }
    const items: CartItem[] = body.items ?? []; // ?? nullish coalescing: if body.items is null or undefined, use []
    // otehrwise, use body.items
    const customer: CustomerInfo | undefined = body.customer; // customer *might be missing

    // validation
    // if customer is undefined, customer?.name becomes undefined instead of crashing
    if (!customer?.name || !customer?.email || !customer?.address) {
      return NextResponse.json(
        { error: "Missing customer information" },
        { status: 400 },
      );
    }

    if (!Array.isArray(items) || items.length === 0) {
      // ensures the incoming thing is actually an array
      return NextResponse.json({ error: "Cart is Empty" }, { status: 400 });
    }
    const totalPrice = items.reduce((sum, item) => {
      return sum + item.product.price * item.quantity;
    }, 0);

    /* 
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
        );  */

    const orderId = crypto.randomUUID();
    const createdAt = Date.now();

    const conn = await db.getConnection();
    try {
      await conn.beginTransaction();

      await conn.execute(
        `INSERT INTO orders
            (id, created_at, total_price, customer_name, customer_email, customer_address)
            VALUES (?, ?, ?, ?, ?, ?)`,
        [
          orderId,
          createdAt,
          totalPrice,
          customer.name,
          customer.email,
          customer.address,
        ],
      );

      for (const item of items) {
        await conn.execute(
          `INSERT INTO order_items
            (order_id, product_id, product_name, unit_price, quantity)
            VALUES (?, ?, ?, ?, ?)`,
          [
            orderId,
            item.product.id,
            item.product.name,
            item.product.price,
            item.quantity,
          ],
        );
      }

      await conn.commit();
    } catch (err) {
      await conn.rollback();
      throw err;
    } finally {
      conn.release();
    }

    return NextResponse.json(
      {
        order: {
          id: orderId,
          createdAt,
          items,
          totalPrice,
          customer,
        },
      },
      { status: 201 },
    );
  } catch {
    // return HTTP 400 bad request if JSON parsing fails
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }
}
