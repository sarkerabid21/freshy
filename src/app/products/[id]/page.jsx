"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";

export default function ProductDetailsPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      const res = await fetch("/api/products");
      const data = await res.json();
      const found = data.find((p) => p.id === id);
      setProduct(found);
    };
    fetchProduct();
  }, [id]);

  if (!product) return <p className="text-center mt-20 text-gray-500">Loading...</p>;

  const increment = () => setQuantity((q) => q + 1);
  const decrement = () => setQuantity((q) => (q > 1 ? q - 1 : 1));

  const addToCart = () => {
    alert(`Added to cart!`);
    // Here you can integrate actual cart logic
  };

  return (
    <motion.div
      className="min-h-screen py-40 bg-amber-100 p-6 flex justify-center items-start"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full overflow-hidden flex flex-col lg:flex-row">
        <img
          src={product.img}
          alt={product.name}
          className="w-full lg:w-1/2 h-96 object-cover"
        />
        <div className="p-8 flex flex-col justify-between">
          <div>
            <h1 className="text-4xl font-bold text-[#f99b43]">{product.name}</h1>
            <p className="text-gray-700 mt-4">{product.description}</p>
            <p className="text-[#f99b43] font-bold text-2xl mt-4">Tk {product.price}</p>
            <div className="mt-4 flex items-center gap-4">
              <span className="text-gray-700 font-semibold">Weight:</span>
              <div className="flex items-center border rounded-lg overflow-hidden">
                <button
                  onClick={decrement}
                  className="px-3 py-1 bg-gray-200 hover:bg-gray-300 transition"
                >
                  -
                </button>
                <span className="px-4 py-1">{quantity} </span>
                <button
                  onClick={increment}
                  className="px-3 py-1 bg-gray-200 hover:bg-gray-300 transition"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          <button
            onClick={addToCart}
            className="mt-6 px-6 py-3 bg-[#f99b43] text-white rounded-xl hover:bg-[#ea892f] transition self-start"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </motion.div>
  );
}
