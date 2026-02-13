import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  const [rows] = await db.query<any[]>(
    `SELECT id, name, price_cents, image FROM products ORDER BY created_at DESC`,
  );

  const products = rows.map((r) => ({
    id: r.id,
    name: r.name,
    price: Number(r.price_cents) / 100, // cents → dollars
    image: r.image ?? undefined,
  }));

  return NextResponse.json({ products });
}
