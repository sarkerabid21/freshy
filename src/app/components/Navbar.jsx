"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [userEmail, setUserEmail] = useState(null);

  useEffect(() => {
    const email = localStorage.getItem("userEmail");
    if (email) setUserEmail(email);
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem("userEmail");
    setUserEmail(null);
    window.location.href = "/"; // অথবা router.push("/") if useRouter
  };

  return (
    <motion.nav
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="w-full fixed top-0 left-0 z-50 bg-white shadow-lg"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        <Link href="/" className="text-2xl font-bold text-indigo-600">
          <img
            className="h-12"
            src="https://i.postimg.cc/YSmNKtkT/freepik-br-5b623207-11c1-45a5-b38e-f62fbebaf68a.png"
            alt="Logo"
          />
        </Link>

        <ul className="hidden md:flex gap-8 text-gray-700 font-medium">
          <li><Link href="/">Home</Link></li>
          <li><Link href="/products">Products</Link></li>
          <li><Link href="/about">About</Link></li>
          <li><Link href="/dashboard/add-product">Add Product</Link></li>
        </ul>

        <div className="hidden md:flex gap-4">
          {!userEmail ? (
            <>
              <Link href="/login" className="px-4 py-2 rounded-lg  bg-amber-600 text-white hover:bg-amber-700 transition">
                Login
              </Link>
              <Link href="/signup" className="px-4 py-2 rounded-lg border border-amber-600 text-amber-600 hover:bg-amber-50 transition">
                Sign Up
              </Link>
            </>
          ) : (
            <button
              onClick={handleSignOut}
              className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-700 transition"
            >
              Sign Out
            </button>
          )}
        </div>

        <button
          className="md:hidden text-gray-700"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-white shadow-lg"
        >
          <ul className="flex flex-col items-center gap-6 py-6 text-gray-700 font-medium">
            <li><Link href="/" onClick={() => setIsOpen(false)}>Home</Link></li>
            <li><Link href="/products" onClick={() => setIsOpen(false)}>Products</Link></li>
            <li><Link href="/about" onClick={() => setIsOpen(false)}>About</Link></li>
            <li><Link href="/dashboard/add-product" onClick={() => setIsOpen(false)}>Add Product</Link></li>
            {!userEmail ? (
              <>
                <li>
                  <Link href="/login" onClick={() => setIsOpen(false)} className="px-4 py-2 rounded-lg bg-amber-600 text-white hover:bg-amber-700 transition">
                    Login
                  </Link>
                </li>
                <li>
                  <Link href="/signup" onClick={() => setIsOpen(false)} className="px-4 py-2 rounded-lg border border-amber-600 text-amber-600 hover:bg-amber-50 transition">
                    Sign Up
                  </Link>
                </li>
              </>
            ) : (
              <li>
                <button
                  onClick={handleSignOut}
                  className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition"
                >
                  Sign Out
                </button>
              </li>
            )}
          </ul>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;
