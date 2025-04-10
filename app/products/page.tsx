/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import ProductCard from "@/components/common/productcard"
import React, { useEffect, useState } from "react"
interface Product {
  id: string
  name: string
  price: string
  description: string
  details: string[]
  care: string[]
  images: string[]
  sizes: string[]
  materials: string[]
  category: string
  isNew?: boolean
}

const Products = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("https://ecommerce-c6014-default-rtdb.firebaseio.com/Products/products.json")
        const data = await res.json()

        // Firebase stores objects by default, so convert to array
        const productsArray = Object.entries(data).map(([id, product]: [string, any]) => ({
          id,
          ...product,
        }))

        setProducts(productsArray)
      } catch (err) {
        setError("Failed to load products.")
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  if (loading) {
    return <div className="text-center py-20">Loading products...</div>
  }

  if (error) {
    return <div className="text-center text-red-500 py-20">{error}</div>
  }

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 mb-8">All Products</h1>
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Products
