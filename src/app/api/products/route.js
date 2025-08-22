import { promises as fs } from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "src/app/data/products.json");

export async function GET() {
  const data = await fs.readFile(filePath, "utf-8");
  const products = JSON.parse(data);
  return new Response(JSON.stringify(products), { status: 200 });
}

export async function POST(req) {
  try {
    const product = await req.json();
    const data = await fs.readFile(filePath, "utf-8");
    const products = JSON.parse(data);

    products.push({ id: Date.now().toString(), ...product });

    await fs.writeFile(filePath, JSON.stringify(products, null, 2));
    return new Response(JSON.stringify({ message: "Product added!" }), { status: 201 });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
