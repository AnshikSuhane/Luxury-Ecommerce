/* eslint-disable @typescript-eslint/no-unused-vars */
import { use, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Heart, ShoppingCart, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner"; // ✅ Toast import
import { Router } from "next/router";

interface Product {
  id: string;
  name: string;
  description: string;
  price: string;
  sizes: string[];
  images: string[];
  details: string[];
  care: string[];
  materials: string[];
}

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export default function ProductPage({ params }: ProductPageProps) {
  const { id } = use(params);
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);


  useEffect(() => {
    if (!id) return;

    const fetchProduct = async () => {
      try {
        const res = await fetch(
          `https://ecommerce-c6014-default-rtdb.firebaseio.com/Products/products/${id}.json`
        );
        const data = await res.json();

        const productData = {
          id,
          name: data.name,
          description: data.description,
          price: data.price,
          sizes: data.sizes,
          images: data.images,
          details: data.details,
          care: data.care,
          materials: data.materials,
        };

        setProduct(productData);
      } catch (error) {
        console.error("Failed to fetch product data:", error);
        toast.error("Failed to load product");
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (!product) return;

    const cartItem = {
      productId: product.id,
      name: product.name,
      price: parseFloat(product.price.replace('$', '')),
      image: product.images[0] || "/placeholder.svg",
      quantity: quantity,
      addedAt: new Date().toISOString(),
    };

    // Retrieve existing cart items from localStorage
    const existingCart = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('cart') || '[]') : [];
    const updatedCart = existingCart.concat(cartItem); // Add new item to cart

    // Save updated cart to localStorage
    localStorage.setItem('cart', JSON.stringify(updatedCart));

    toast.success("Item added to cart!");
  };

  if (!product) return (
    <div className="p-10 text-center text-xl">Loading product...</div>
  );

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-6">
          <Link href="/products" className="flex items-center text-sm text-gray-500 hover:text-gray-700">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to products
          </Link>
        </div>

        <div className="lg:grid lg:grid-cols-2 lg:gap-x-8">
          {/* Product Images */}
          <div className="flex flex-col gap-4">
            <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg">
              <div className="relative h-96 lg:h-[500px]">
                <Image
                  src={product.images[0] || "/placeholder.svg"}
                  alt={product.name}
                  fill
                  className="h-full w-full object-cover object-center"
                  priority
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {product.images.slice(0, 2).map((image, index) => (
                <div key={index} className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg">
                  <div className="relative h-40">
                    <Image
                      src={image || "/placeholder.svg"}
                      alt={`${product.name} ${index + 1}`}
                      fill
                      className="h-full w-full object-cover object-center"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">{product.name}</h1>

            <div className="mt-3">
              <p className="text-3xl tracking-tight text-gray-900">{product.price}</p>
            </div>

            <div className="mt-3 flex items-center">
              <div className="flex items-center">
                {[0, 1, 2, 3, 4].map((rating) => (
                  <Star
                    key={rating}
                    className={`h-5 w-5 ${rating < 4 ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                  />
                ))}
                <span className="ml-2 text-sm text-gray-500">4.5 out of 5 stars</span>
              </div>
              <div className="ml-4 border-l border-gray-300 pl-4">
                <span className="text-sm text-gray-500">42 reviews</span>
              </div>
            </div>

            <div className="mt-6">
              <p className="text-base text-gray-700">{product.description}</p>
            </div>

            <div className="mt-8">
              <h3 className="text-sm font-medium text-gray-900">Size</h3>
              <div className="mt-2 grid grid-cols-4 gap-2">
                {product.sizes.map((size) => (
                  <Button key={size} variant="outline" className="text-sm">
                    {size}
                  </Button>
                ))}
              </div>
            </div>

            <div className="mt-8">
              <h3 className="text-sm font-medium text-gray-900">Quantity</h3>
              <div className="mt-2 flex items-center">
                <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => setQuantity(q => Math.max(1, q - 1))}>-</Button>
                <span className="mx-4 text-sm">{quantity}</span>
                <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => setQuantity(q => q + 1)}>+</Button>
              </div>
            </div>

            <div className="mt-8 flex gap-4">
              <Button className="flex-1" onClick={handleAddToCart}>
                <ShoppingCart className="mr-2 h-4 w-4" />
                Add to cart
              </Button>
              <Button variant="outline">
                <Heart className="mr-2 h-4 w-4" />
                Add to wishlist
              </Button>
            </div>

            <div className="mt-10">
              <Tabs defaultValue="details">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="details">Details</TabsTrigger>
                  <TabsTrigger value="care">Care</TabsTrigger>
                  <TabsTrigger value="materials">Materials</TabsTrigger>
                </TabsList>

                <TabsContent value="details" className="mt-4">
                  <ul className="list-disc pl-5 text-sm text-gray-700 space-y-2">
                    {product.details.map((detail, index) => (
                      <li key={index}>{detail}</li>
                    ))}
                  </ul>
                </TabsContent>

                <TabsContent value="care" className="mt-4">
                  <ul className="list-disc pl-5 text-sm text-gray-700 space-y-2">
                    {product.care.map((care, index) => (
                      <li key={index}>{care}</li>
                    ))}
                  </ul>
                </TabsContent>

                <TabsContent value="materials" className="mt-4">
                  <ul className="list-disc pl-5 text-sm text-gray-700 space-y-2">
                    {product.materials.map((material, index) => (
                      <li key={index}>{material}</li>
                    ))}
                  </ul>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}