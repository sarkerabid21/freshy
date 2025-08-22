import fs from "fs";
import path from "path";
import bcrypt from "bcryptjs";

const filePath = path.join(process.cwd(), "data", "users.json");

export async function POST(req) {
  try {
    const { email, password } = await req.json();

    if (!fs.existsSync(filePath)) {
      return new Response(JSON.stringify({ error: "No users found" }), { status: 404 });
    }

    const data = fs.readFileSync(filePath, "utf-8");
    const users = JSON.parse(data);

    const user = users.find((u) => u.email === email);

    if (!user) {
      return new Response(JSON.stringify({ error: "User not found" }), { status: 404 });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return new Response(JSON.stringify({ error: "Invalid password" }), { status: 401 });
    }

    return new Response(JSON.stringify({ message: "Login successful", user }), { status: 200 });
  } catch (error) {
    console.error("Login error:", error);
    return new Response(JSON.stringify({ message: "There is a problem with the server configuration." }), { status: 500 });
  }
}
