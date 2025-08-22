'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const router = useRouter();

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch('/api/products');
        const data = await res.json();
        setProducts(data.slice(0, 4)); // শুধু প্রথম ৪টা product show করব
      } catch (err) {
        console.error('Failed to fetch products:', err);
      }
    }

    fetchProducts();
  }, []);

  if (products.length === 0)
    return <p className="text-white text-center mt-10">No products found.</p>;

  return (
    <section className="py-16 px-6 bg-amber-100">
      <h2 className="text-3xl font-bold text-center mb-10 text-amber-600">
        Featured Products
      </h2>

      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        {products.map((p) => (
          <div
            key={p.id}
            className="bg-white rounded-2xl shadow-lg p-5 flex flex-col justify-between transform transition duration-500 hover:scale-105 hover:shadow-2xl"
          >
            {/* Product Image */}
            {p.image && (
              <div className="w-full h-48 relative mb-4">
                <Image
                  src={p.image} // <-- তোমার API থেকে যে field আসবে
                  alt={p.name}
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
            )}

            {/* Product Info */}
            <div>
              <h2 className="text-xl font-bold text-[#f99b43] mb-2">{p.name}</h2>
              <p className="text-gray-700 mb-4 line-clamp-2">{p.description}</p>
              <p className="font-semibold text-gray-900">Tk{p.price}</p>
            </div>

            <button
              onClick={() => router.push(`/products/${p.id}`)}
              className="mt-4 bg-[#f99b43] text-white py-2 px-4 rounded-lg hover:bg-[#e88c35] transition-colors duration-300"
            >
              Details
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
