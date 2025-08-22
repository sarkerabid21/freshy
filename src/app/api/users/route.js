import { promises as fs } from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'src', 'app', 'data', 'users.json');

export async function POST(req) {
  const { email, password, phone } = await req.json();

  let users = [];
  try {
    const data = await fs.readFile(filePath, 'utf-8');
    users = JSON.parse(data);
  } catch (err) {
    console.log('users.json not found, creating new one.');
  }

  const existingUser = users.find((u) => u.email === email);
  if (existingUser) {
    return new Response(JSON.stringify({ error: 'User already exists' }), {
      status: 400,
    });
  }

  const newUser = { id: Date.now().toString(), email, password, phone };
  users.push(newUser);

  await fs.writeFile(filePath, JSON.stringify(users, null, 2));

  return new Response(JSON.stringify({ message: 'Signup successful' }), {
    status: 200,
  });
}

// Login check
export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const email = searchParams.get('email');
  const password = searchParams.get('password');

  if (!email || !password) {
    return new Response(JSON.stringify({ error: 'Missing credentials' }), { status: 400 });
  }

  let users = [];
  try {
    const data = await fs.readFile(filePath, 'utf-8');
    users = JSON.parse(data);
  } catch (err) {}

  const user = users.find((u) => u.email === email && u.password === password);

  if (!user) {
    return new Response(JSON.stringify({ error: 'Invalid login' }), { status: 401 });
  }

  return new Response(JSON.stringify({ user }), { status: 200 });
}
