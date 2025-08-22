import fs from "fs";
import path from "path";
import bcrypt from "bcryptjs";

export async function POST(req) {
  try {
    const body = await req.json();
    const { email, password } = body;

    const filePath = path.join(process.cwd(), "app/data/users.json");
    const users = JSON.parse(fs.readFileSync(filePath, "utf-8"));

    const user = users.find(u => u.email === email);

    if (!user) {
      return new Response(JSON.stringify({ error: "Invalid email or password" }), { status: 401 });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return new Response(JSON.stringify({ error: "Invalid email or password" }), { status: 401 });
    }

    return new Response(JSON.stringify({ message: "Login successful", user: { email: user.email, phone: user.phone } }), { status: 200 });

  } catch (err) {
    return new Response(JSON.stringify({ error: "Server error" }), { status: 500 });
  }
}
