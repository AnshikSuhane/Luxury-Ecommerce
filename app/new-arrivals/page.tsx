/* eslint-disable react/no-unescaped-entities */
"use client";
import ProductCard from '@/components/common/productcard';
import React, { useEffect, useState } from 'react';

interface Product {
  id: string;
  name: string;
  price: string;
  description: string;
  images: string[];
  isNew: boolean;
}

export default function NewArrivalsPage() {
  const [newProducts, setNewProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("https://ecommerce-c6014-default-rtdb.firebaseio.com/Products/products.json");
        const data = await res.json();
        const products: Product[] = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));
        const filtered = products.filter((product) => product.isNew);
        setNewProducts(filtered);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <div className="md:flex md:items-center md:justify-between">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">New Arrivals</h1>
          <p className="mt-2 text-lg text-gray-500 md:mt-0">
            Check out our latest products and gear for your next adventure
          </p>
        </div>

        {newProducts.length > 0 ? (
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
            {newProducts.map((product: Product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="mt-10 rounded-md bg-yellow-50 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg
                  className="h-5 w-5 text-yellow-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M8.485 3.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 3.495zM10 6a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 6zm0 9a1 1 0 100-2 1 1 0 000 2z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-yellow-800">No new arrivals</h3>
                <div className="mt-2 text-sm text-yellow-700">
                  <p>We don't have any new products at the moment. Please check back soon for updates!</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
