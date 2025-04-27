import React, { useState } from "react";
import Link from "next/link";

export default function ProductCard({ product }) {
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = async () => {
    setIsAdding(true);
    try {
      const response = await fetch("/api/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId: product.id, quantity: 1 }),
      });

      if (!response.ok) {
        throw new Error("Failed to add to cart");
      }

      // Optional: Show success feedback
      console.log("Added to cart:", product.id);
    } catch (error) {
      console.error("Error adding to cart:", error);
    } finally {
      setIsAdding(false);
    }
  };
  return (
    <div className="border rounded-lg p-4 shadow hover:shadow-lg transition">
      <Link href={`/products/${product.id}`}>
        <div className="cursor-pointer">
          <img
            src={product.imageUrl || "/public/globe.svg"}
            alt={product.name}
            className="w-full h-48 object-cover mb-2 rounded"
          />
          <h2 className="text-xl font-semibold mb-1">{product.name}</h2>
          <p className="text-gray-600 mb-2">{product.description}</p>
          <span className="font-bold text-lg">${product.price}</span>
        </div>
      </Link>
      <button
        className="mt-2 w-full bg-blue-600 text-white py-1 rounded hover:bg-blue-700 disabled:opacity-50"
        onClick={handleAddToCart}
        disabled={isAdding}
      >
        {isAdding ? "Adding..." : "Add to Cart"}
      </button>
    </div>
  );
}
