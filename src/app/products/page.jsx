// import ProductList from './ProductList';

import ProductList from "./ProductList";

export default function ProductsPage() {
  return (
    <div className="lg:py-30 min-h-screen py-20 bg-amber-100">
      <h1 className="text-center font-bold lg:text-4xl text-xl">Products</h1>
      <ProductList />
    </div>
  );
}
