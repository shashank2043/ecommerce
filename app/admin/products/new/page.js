import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const schema = z.object({
  name: z.string().min(2, "Name is required"),
  price: z.coerce.number().min(0, "Price must be positive"),
  description: z.string().min(5, "Description is required"),
  imageUrl: z.string().url("Image URL must be valid").optional(),
});

export default function NewProduct() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
    reset,
  } = useForm({ resolver: zodResolver(schema) });

  const onSubmit = async (data) => {
    await fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    reset();
  };

  return (
    <main className="min-h-screen p-4">
      <h1 className="text-2xl font-bold mb-6">Add New Product</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-md space-y-4">
        <div>
          <label className="block mb-1">Name</label>
          <input
            {...register("name")}
            className="w-full border rounded px-3 py-2"
          />
          {errors.name && (
            <p className="text-red-600 text-sm">{errors.name.message}</p>
          )}
        </div>
        <div>
          <label className="block mb-1">Price</label>
          <input
            type="number"
            step="0.01"
            {...register("price")}
            className="w-full border rounded px-3 py-2"
          />
          {errors.price && (
            <p className="text-red-600 text-sm">{errors.price.message}</p>
          )}
        </div>
        <div>
          <label className="block mb-1">Description</label>
          <textarea
            {...register("description")}
            className="w-full border rounded px-3 py-2"
          />
          {errors.description && (
            <p className="text-red-600 text-sm">{errors.description.message}</p>
          )}
        </div>
        <div>
          <label className="block mb-1">Image URL</label>
          <input
            {...register("imageUrl")}
            className="w-full border rounded px-3 py-2"
          />
          {errors.imageUrl && (
            <p className="text-red-600 text-sm">{errors.imageUrl.message}</p>
          )}
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Add Product
        </button>
        {isSubmitSuccessful && (
          <p className="text-green-600 mt-2">Product added successfully!</p>
        )}
      </form>
    </main>
  );
}
