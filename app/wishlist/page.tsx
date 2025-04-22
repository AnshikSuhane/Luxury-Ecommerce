import { useWishlist } from '@/components/context/wishList'
import { Product } from '@/lib/api'
import React, { useEffect, useState } from 'react'


const WishListpage = () => {
    const {toast} =use
    const  [product,setproduct]=useState<Product>()
    const [loading,setIsloading]=useState(true)
    const {wishlistItems,removeFromWishlist,clearWishlist}=useWishlist()
    useEffect(() => {
        const fetchProducts = async () => {
          try {
           
            const response = await fetch("https://ecommerce-c6014-default-rtdb.firebaseio.com/Products/products.json")
            if (!response.ok) {
              throw new Error("Failed to fetch products")
            }
    
            const data = await response.json()
            setproduct(data || [])
          } catch (error) {
            console.error("Error fetching products:", error)
          } finally {
            setIsloading(false)
          }
        }
    
        fetchProducts()
      }, [])
  return (
    <div></div>
  )
}

export default WishListpage