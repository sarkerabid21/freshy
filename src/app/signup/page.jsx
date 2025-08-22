"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();

  const signupHandler = async () => {
    try {
      const res = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, phone, type: "signup" }),
      });
      const data = await res.json();

      if (res.ok) {
        setMessage("Signup successful! Redirecting to login...");
        setTimeout(() => router.push("/login"), 1500);
      } else {
        setMessage(data.error);
      }
    } catch {
      setMessage("Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-200 via-pink-200 to-blue-200 p-4">
      <motion.div className="bg-white/30 backdrop-blur-md rounded-3xl shadow-2xl p-10 max-w-md w-full">
        <h1 className="text-3xl font-bold text-center text-purple-700 mb-6">Create Account</h1>
        <form onSubmit={(e) => { e.preventDefault(); signupHandler(); }} className="flex flex-col gap-4">
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required className="p-3 rounded-xl border bg-white/20" />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required className="p-3 rounded-xl border bg-white/20" />
          <input type="tel" placeholder="Phone Number" value={phone} onChange={(e) => setPhone(e.target.value)} required className="p-3 rounded-xl border bg-white/20" />
          <button type="submit" className="bg-green-600 text-white py-3 rounded-xl hover:bg-green-700">Sign Up</button>
        </form>
        {message && <p className={`mt-4 text-center ${message.includes("successful") ? "text-green-600" : "text-red-500"}`}>{message}</p>}
        <p className="mt-6 text-center text-gray-700">
          Already have an account? <a href="/login" className="text-purple-600 font-semibold">Login</a>
        </p>
      </motion.div>
    </div>
  );
}
