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

/* 
export async function POST(req: Request) {
  console.log("POST /api/products hit");
  try {
    const body = await req.json();

    const raw = await req.text();
    //debugging
    console.log("RAW BODY=", raw);

    const id = String(body.id).trim();
    const name = String(body.name).trim();
    const price = Number(body.price);
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
}*/

export async function POST(req: Request) {
  console.log("POST /api/products hit");

  // 1) Parse JSON (only this should return "Invalid JSON")
  let body: any;
  try {
    body = await req.json();
  } catch (err) {
    console.error("JSON parse failed:", err);
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  // 2) DB insert (if this fails, we’ll see the real reason)
  try {
    console.log("BODY =", body);

    const id = String(body.id).trim();
    const name = String(body.name).trim();
    const price = Number(body.price);
    const image = body.image ? String(body.image) : null;

    const priceCents = Math.round(price * 100);

    await db.query(
      `INSERT INTO products (id, name, price_cents, image, created_at)
       VALUES (?, ?, ?, ?, NOW())`,
      [id, name, priceCents, image],
    );

    return NextResponse.json({ ok: true }, { status: 201 });
  } catch (err) {
    console.error("DB insert failed:", err);
    return NextResponse.json(
      { error: "DB insert failed (check server logs)" },
      { status: 500 },
    );
  }
}
