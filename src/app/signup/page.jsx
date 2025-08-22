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
const submitHandler = async (e) => {
  e.preventDefault();
  try {
    const res = await fetch('/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, phone }),
    });
    const data = await res.json();

    if (res.ok) {
      setMessage('Signup successful! Redirecting to login...');
      setTimeout(() => router.push('/login'), 1500);
    } else {
      setMessage(data.error);
    }
  } catch (err) {
    setMessage('Something went wrong');
  }
};


  return (
    <div className="min-h-screen relative flex items-center justify-center bg-gradient-to-br from-purple-200 via-pink-200 to-blue-200 overflow-hidden p-4">
      {/* Floating shapes */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 120, ease: "linear" }}
        className="absolute w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 -top-32 -left-32"
      />
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ repeat: Infinity, duration: 100, ease: "linear" }}
        className="absolute w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 -bottom-32 -right-32"
      />

      {/* Glassy card */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative bg-white/30 backdrop-blur-md rounded-3xl shadow-2xl p-10 max-w-md w-full"
      >
        <h1 className="text-3xl font-bold text-center text-purple-700 mb-6">
          Create Account
        </h1>
        <form onSubmit={submitHandler} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="p-3 rounded-xl border border-white/30 bg-white/20 text-gray-800 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="p-3 rounded-xl border border-white/30 bg-white/20 text-gray-800 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
          />
          <input
            type="tel"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            className="p-3 rounded-xl border border-white/30 bg-white/20 text-gray-800 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
          />
          <button
            type="submit"
            className="bg-green-600 text-white font-semibold py-3 rounded-xl shadow-lg hover:bg-green-700 transition transform hover:-translate-y-1"
          >
            Sign Up
          </button>
        </form>
        {message && (
          <p
            className={`mt-4 text-center font-medium ${
              message.includes("successful") ? "text-green-600" : "text-red-500"
            }`}
          >
            {message}
          </p>
        )}
        <p className="mt-6 text-center text-gray-700">
          Already have an account?{" "}
          <a
            href="/login"
            className="text-purple-600 font-semibold hover:underline"
          >
            Login
          </a>
        </p>
      </motion.div>
    </div>
  );
}
