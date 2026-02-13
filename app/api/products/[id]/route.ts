import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(
  _req: Request, // incoming HTTP request object
  { params }: { params: { id: string } },
) {
  const id = params.id; // extract product id from route
  const [rows] = await db.query<any[]>( // run SQL using mariadb pool
    `SELECT id, name, price_cents, image FROM products WHERE id = ? LIMIT 1`,
    [id], // WHERE id = ? is a paramter  placeholder. Value comes from [id]
  );

  // not found check
  if (!rows || rows.length === 0) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 });
  }

  const r = rows[0]; // extract first row
  const product = {
    // data mapping
    id: r.id,
    name: r.name,
    price: Number(r.price_cents) / 100, // 2799 -> 27.99
    image: r.image ?? undefined,
  };

  return NextResponse.json({ product });
}
