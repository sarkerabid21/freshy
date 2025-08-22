"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, type: "login" }),
      });
      const data = await res.json();
      if (res.ok) {
        router.push("/"); // home
      } else {
        setError(data.error);
      }
    } catch {
      setError("Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-200 via-pink-200 to-blue-200 p-4">
      <motion.div className="bg-white/30 backdrop-blur-md rounded-3xl shadow-2xl p-10 max-w-md w-full">
        <h1 className="text-3xl font-bold text-center text-purple-700 mb-6">Welcome Back</h1>
        <form onSubmit={submitHandler} className="flex flex-col gap-4">
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required className="p-3 rounded-xl border bg-white/20" />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required className="p-3 rounded-xl border bg-white/20" />
          <button type="submit" className="bg-purple-600 text-white py-3 rounded-xl hover:bg-purple-700">Login</button>
        </form>
        {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
        <p className="mt-6 text-center text-gray-700">
          Don't have an account? <a href="/signup" className="text-purple-600 font-semibold">Sign up</a>
        </p>
      </motion.div>
    </div>
  );
}
