import { NextResponse } from "next/server";
import { db } from "@/lib/db";

/*
export async function GET(req: Request, context: { params: { id?: string } }) {
  const fromParams = context.params?.id;

  const url = new URL(req.url); // url pahtname is /api/prodicts/p1
  const parts = url.pathname.split("/").filter(Boolean); // [api, products, p1]
  const fromPath = parts[parts.length - 1]; // last segment

  const rawId = fromParams ?? fromPath;
  const id = decodeURIComponent(rawId).trim();

  // DEBUG (temporarily)
  // return NextResponse.json({ marker: "debug", fromParams, fromPath, pathname: url.pathname, id });

  const [rows] = await db.query<any[]>(
    `SELECT id, name, price_cents, image
     FROM products
     WHERE id = ?
     LIMIT 1`,
    [id],
  );

  if (!rows || rows.length === 0) {
    return NextResponse.json(
      { error: "Product not found", debug: { fromParams, fromPath, id } },
      { status: 404 },
    );
  }

  const r = rows[0];
  const product = {
    id: r.id,
    name: r.name,
    price: Number(r.price_cents) / 100,
    image: r.image ?? undefined,
  };

  return NextResponse.json({ product });
} */
export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id: rawId } = await params;
  const id = decodeURIComponent(rawId).trim();

  const [rows] = await db.query<any[]>(
    `SELECT id, name, price_cents, image
    FROM products
    WHERE id = ?
    LIMIT 1`,
    [id],
  );

  if (!rows || rows.length === 0) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 });
  }

  const r = rows[0];
  return NextResponse.json({
    product: {
      id: r.id,
      name: r.name,
      price: Number(r.price_cents) / 100,
      image: r.image ?? undefined,
    },
  });
}

/* 
  the PUT function allows us to update product
*/
export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const body = await req.json();

  const name = body.name ? String(body.name).trim() : undefined;
  const price = body.price !== undefined ? Number(body.price) : undefined;
  const sets: string[] = [];
  const values: any[] = [];

  if (name !== undefined) {
    sets.push("name=?");
    values.push(name);
  }

  if (price !== undefined) {
    sets.push("price_cents=?");
    values.push(Math.round(price * 100));
  }

  if (sets.length === 0) {
    return NextResponse.json({ error: "Nothing to update" }, { status: 404 });
  }

  values.push(id);

  await db.query(`UPDATE products SET ${sets.join(",")} WHERE id = ?`);

  return NextResponse.json({ ok: true });
}
