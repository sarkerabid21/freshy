"use client";
import { motion } from "framer-motion";
import { Button } from "./ui/button";
import Link from "next/link";

export default function Hero() {
  return (
    <section
      className="relative h-[90vh] w-full bg-cover bg-center flex items-center"
      style={{
        backgroundImage: "url('https://i.postimg.cc/pyNMfQCT/6389553ww.jpg')", // place image in /public
      }}
    >
      {/* Overlay for readability */}
      {/* <div className="absolute inset-0 bg-black/30" /> */}

      {/* Content */}
      <div className="relative  z-10 w-full max-w-7xl mx-auto px-6 flex justify-center -top-22">
        <motion.div
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-right max-w-lg"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight drop-shadow-lg">
            Fresh & Healthy
          </h1>
          <p className="mt-4 text-lg md:text-xl text-gray-100">
            Browse thousands of high-quality fresh foods tailored for your
            healthy lifestyle. Start exploring and find your perfect match today.
          </p>

          <div className="mt-6 flex gap-4 justify-end">
            <Button className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-xl shadow-lg">
              Get Started
            </Button>
            <Button
            
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-orange-600 px-6 py-3 rounded-xl"
            >
              View Products
            </Button>
            
          </div>
        </motion.div>
      </div>
    </section>
  );
}
