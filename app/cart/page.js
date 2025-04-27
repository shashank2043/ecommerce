import React, { useState, useEffect } from "react";

export default function Cart() {
  const [cart, setCart] = useState([]);
  useEffect(() => {
    const stored = localStorage.getItem("cart");
    setCart(stored ? JSON.parse(stored) : []);
  }, []);

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <main className="min-h-screen p-4">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          <ul className="mb-4">
            {cart.map((item) => (
              <li
                key={item.id}
                className="flex justify-between items-center border-b py-2"
              >
                <span>
                  {item.name} x {item.quantity}
                </span>
                <span>${item.price * item.quantity}</span>
              </li>
            ))}
          </ul>
          <div className="font-bold text-xl mb-4">
            Total: ${total.toFixed(2)}
          </div>
          <a
            href="/checkout"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Proceed to Checkout
          </a>
        </div>
      )}
    </main>
  );
}
