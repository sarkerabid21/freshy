'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const router = useRouter(); // Add router

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch('/api/products');
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error('Failed to fetch products:', err);
      }
    }

    fetchProducts();
  }, []);

  if (products.length === 0)
    return <p className="text-white text-center mt-10">No products found.</p>;

  return (
    <div className="p-6 grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {products.map((p) => (
        <div
          key={p.id}
          className="bg-white rounded-2xl shadow-lg p-5 flex flex-col justify-between transform transition duration-500 hover:scale-105 hover:shadow-2xl"
        >
          <div>
            <h2 className="text-xl font-bold text-[#f99b43] mb-2">{p.name}</h2>
            <p className="text-gray-700 mb-4">{p.description}</p>
            <p className="font-semibold text-gray-900">Tk{p.price}</p>
          </div>
          <button
            onClick={() => router.push(`/products/${p.id}`)} // <-- Navigate to details
            className="mt-4 bg-[#f99b43] text-white py-2 px-4 rounded-lg hover:bg-[#e88c35] transition-colors duration-300"
          >
            Details
          </button>
        </div>
      ))}
    </div>
  );
}
