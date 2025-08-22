import fs from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "data", "users.json");

export async function getUsers() {
  const data = fs.readFileSync(filePath);
  return JSON.parse(data);
}

export async function getUserByEmail(email) {
  const users = await getUsers();
  return users.find(user => user.email === email);
}

export async function addUser(user) {
  const users = await getUsers();
  users.push(user);
  fs.writeFileSync(filePath, JSON.stringify(users, null, 2));
}
