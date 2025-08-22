"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const submitHandler = async (e) => {
  e.preventDefault();
  try {
    const res = await fetch(`/api/users?email=${email}&password=${password}`);
    const data = await res.json();

    if (res.ok) {
      router.push('/'); // redirect to home or intended page
    } else {
      setError(data.error);
    }
  } catch (err) {
    setError('Something went wrong');
  }
};


  return (
    <div className="min-h-screen relative flex items-center justify-center bg-gradient-to-br from-purple-200 via-pink-200 to-blue-200 overflow-hidden">
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
          Welcome Back
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
          <button
            type="submit"
            className="bg-purple-600 text-white font-semibold py-3 rounded-xl shadow-lg hover:bg-purple-700 transition transform hover:-translate-y-1"
          >
            Login
          </button>
        </form>
        {error && (
          <p className="text-red-500 mt-4 text-center font-medium">{error}</p>
        )}
        <p className="mt-6 text-center text-gray-700">
          Don't have an account?{" "}
          <a
            href="/signup"
            className="text-purple-600 font-semibold hover:underline"
          >
            Sign up
          </a>
        </p>
      </motion.div>
    </div>
  );
}
