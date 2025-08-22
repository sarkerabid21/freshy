'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import useAuth from '../../../hooks/useAuth';
// import useAuth from '../../';

export default function AddProductPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    img: '', // will store base64 or file path
    weight: ''
  });
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

//   if (!user) {
//     router.push('/login');
//     return null;
//   }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    setFile(selectedFile);
    const reader = new FileReader();
    reader.onloadend = () => setPreview(reader.result); // preview as base64
    reader.readAsDataURL(selectedFile);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let imgData = formData.img;

      // If a file is selected, convert to base64 (or handle upload to server/cloud)
      if (file) imgData = preview;

      const res = await fetch('/api/products', {
        method: 'POST',
        body: JSON.stringify({ ...formData, img: imgData }),
        headers: { 'Content-Type': 'application/json' },
      });

      if (res.ok) {
        alert('Product added successfully!');
        router.push('/products');
      } else {
        const err = await res.json();
        alert(err.error || 'Something went wrong');
      }
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      className="min-h-screen py-40 bg-amber-100 flex justify-center items-start  p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.form
        onSubmit={handleSubmit}
        className="bg-white rounded-3xl shadow-2xl p-8 max-w-xl w-full flex flex-col gap-5"
        initial={{ y: -20 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 120 }}
      >
        <h1 className="text-3xl font-bold text-[#f99b43] text-center mb-4">
          Add New Product
        </h1>

        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={formData.name}
          onChange={handleChange}
          className="border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-[#f99b43] focus:outline-none transition"
          required
        />
        <textarea
          name="description"
          placeholder="Product Description"
          value={formData.description}
          onChange={handleChange}
          className="border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-[#f99b43] focus:outline-none transition resize-none h-24"
          required
        ></textarea>
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          className="border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-[#f99b43] focus:outline-none transition"
          required
        />

        <input
          type="text"
          name="weight"
          placeholder="Weight (e.g., 1kg)"
          value={formData.weight}
          onChange={handleChange}
          className="border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-[#f99b43] focus:outline-none transition"
        />

        {/* File upload */}
        <div className="flex flex-col gap-2">
          <label className="text-gray-700 font-semibold">Product Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="border border-gray-300 rounded-xl p-2 cursor-pointer"
          />
          {preview && (
            <img
              src={preview}
              alt="Preview"
              className="mt-2 w-full h-48 object-cover rounded-xl border"
            />
          )}
        </div>

        <motion.button
          type="submit"
          disabled={loading}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-[#f99b43] text-white py-3 cursor-pointer rounded-xl font-semibold hover:bg-[#e88c35] transition-colors duration-300 mt-3"
        >
          {loading ? 'Adding...' : 'Add Product'}
        </motion.button>
      </motion.form>
    </motion.div>
  );
}
