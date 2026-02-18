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

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const id = String(body.id).trim(); // e.g. "p4"
    const name = String(body.name).trim();
    const price = Number(body.price); // dollars
    const image = body.image ? String(body.image) : null;

    if (!id || !name) {
      return NextResponse.json(
        { error: "id and name are required" },
        { status: 400 },
      );
    }

    if (!Number.isFinite(price) || price < 0) {
      return NextResponse.json(
        { error: "price must be a non-negative number" },
        { status: 400 },
      );
    }

    const priceCents = Math.round(price * 100);

    await db.query(
      `INSERT INTO products (id, name, price_cents, image)
       VALUES (?, ?, ?, ?)`,
      [id, name, priceCents, image],
    );

    return NextResponse.json(
      { product: { id, name, price, image: image ?? undefined } },
      { status: 201 },
    );
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
}
