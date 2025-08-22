"use client";
import { motion } from "framer-motion";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-[#f99b43] text-black py-8 ">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Brand */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
         <img className="h-12" src="https://i.postimg.cc/6Q6q4wTP/Screenshot-2025-08-23-033728-removebg-preview.png" alt=""/>
          <p className="mt-2 text-sm text-black">
            Freshy আপনাদের কাছে সরবরাহ করে ১০০% তাজা ও নিরাপদ ফল। আমরা সরাসরি নির্ভরযোগ্য উৎস থেকে ফল সংগ্রহ করি এবং গুণগত মানে কোনো আপস করি না।
          </p>
        </motion.div>

        {/* Quick Links */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <h3 className="text-lg font-semibold text-black mb-3">Quick Links</h3>
          <ul className="space-y-2">
            <li><a href="/" className="hover:text-blue-400">Home</a></li>
            <li><a href="/about" className="hover:text-blue-400">About</a></li>
            <li><a href="/services" className="hover:text-blue-400">Services</a></li>
            <li><a href="/contact" className="hover:text-blue-400">Contact</a></li>
          </ul>
        </motion.div>

        {/* Social Media */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h3 className="text-lg font-semibold text-white mb-3">Follow Us</h3>
          <div className="flex space-x-4">
            <a href="https://www.facebook.com/" className="hover:text-blue-400 text-xl"><FaFacebook /></a>
            <a href="https://x.com/" className="hover:text-blue-400 text-xl"><FaTwitter /></a>
            <a href="https://www.instagram.com/" className="hover:text-blue-400 text-xl"><FaInstagram /></a>
            <a href="https://www.linkedin.com/" className="hover:text-blue-400 text-xl"><FaLinkedin /></a>
          </div>
        </motion.div>
      </div>

      {/* Bottom */}
      <div className="text-center text-sm  mt-8 border-t border-gray-700 pt-4">
        © {new Date().getFullYear()} Freshy. All rights reserved.
      </div>
    </footer>
  );
}
