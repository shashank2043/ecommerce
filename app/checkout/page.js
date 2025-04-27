import React, { useState } from "react";

export default function Checkout() {
  const [form, setForm] = useState({ name: "", email: "", address: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would send order data to the backend
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <main className="min-h-screen p-4 flex flex-col items-center">
        <h1 className="text-3xl font-bold mb-4">Thank you for your order!</h1>
        <p className="text-lg">
          We have received your order and will process it soon.
        </p>
      </main>
    );
  }

  return (
    <main className="min-h-screen p-4 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>
      <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          required
          className="w-full border rounded px-3 py-2"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
          className="w-full border rounded px-3 py-2"
        />
        <input
          type="text"
          name="address"
          placeholder="Shipping Address"
          value={form.address}
          onChange={handleChange}
          required
          className="w-full border rounded px-3 py-2"
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Place Order
        </button>
      </form>
    </main>
  );
}
