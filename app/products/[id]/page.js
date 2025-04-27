import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function ProductDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    fetch(`/api/products?id=${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data.product || null);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <main className="min-h-screen p-4">Loading...</main>;
  }
  if (!product) {
    return <main className="min-h-screen p-4">Product not found.</main>;
  }
  return (
    <main className="min-h-screen p-4 flex flex-col items-center">
      <img
        src={product.imageUrl || "/public/globe.svg"}
        alt={product.name}
        className="w-full max-w-md h-64 object-cover mb-4 rounded"
      />
      <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
      <p className="text-gray-600 mb-4">{product.description}</p>
      <span className="font-bold text-2xl mb-6">${product.price}</span>
      {/* Add to cart button will be added here */}
    </main>
  );
}
