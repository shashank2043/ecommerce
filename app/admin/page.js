import React from "react";

export default function AdminDashboard() {
  return (
    <main className="min-h-screen p-4">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <div className="space-y-4">
        <a
          href="/admin/products"
          className="block bg-gray-200 rounded p-4 hover:bg-gray-300"
        >
          Manage Products
        </a>
        <a
          href="/admin/categories"
          className="block bg-gray-200 rounded p-4 hover:bg-gray-300"
        >
          Manage Categories
        </a>
        <a
          href="/admin/orders"
          className="block bg-gray-200 rounded p-4 hover:bg-gray-300"
        >
          Manage Orders
        </a>
      </div>
    </main>
  );
}
