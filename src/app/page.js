// import Image from "next/image";

import Hero from "./components/Hero";
import ProductHighlights from "./components/ProductHighlights";
import ProductList from "./components/ProductList";


export default function Home() {
  return (
    <>
      <Hero />
      <ProductHighlights />
      <ProductList></ProductList>
      
    </>
  );
}
