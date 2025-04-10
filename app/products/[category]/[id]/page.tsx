import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, Heart, ShoppingCart, Star } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Product {
  id: string;
  name: string;
  price: string;
  description: string;
  images: string[];
  sizes: string[];
  details: string[];
  care: string[];
  materials: string[];
  rating: number;
  reviews: number;
}

interface ProductPageProps {
  params: {
    id: string;
  };
}

async function getProduct(id: string): Promise<Product | undefined> {
  try {
    const response = await fetch(
      `https://ecommerce-c6014-default-rtdb.firebaseio.com/Products/products/${id}.json`
    );
    if (!response.ok) {
      if (response.status === 404) {
        return undefined;
      }
      throw new Error(
        `Failed to fetch product with id ${id}: ${response.status}`
      );
    }
    const data = await response.json();
    return data as Product;
  } catch (error) {
    console.error("Error fetching product:", error);
    return undefined;
  }
}

interface ProductPageProps {
  params: {
    id: string;
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
   
  const product = await getProduct(params.id); // This line should now work

  if (!product) {
    notFound();
  }

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-6">
          <Link
            href="/products"
            className="flex items-center text-sm text-gray-500 hover:text-gray-700"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to products
          </Link>
        </div>

        <div className="lg:grid lg:grid-cols-2 lg:gap-x-8">
          {/* Product images */}
          <div className="flex flex-col gap-4">
            <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg">
              <div className="relative h-96 lg:h-[500px]">
                <Image
                  src={product.images[0] || "/placeholder.svg"}
                  alt={product.name}
                  fill
                  className="h-full w-full object-cover object-center"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {product.images.slice(0, 2).map((image, index) => (
                <div
                  key={index}
                  className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg"
                >
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

          {/* Product details */}
          <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              {product.name}
            </h1>

            <div className="mt-3">
              <h2 className="sr-only">Product information</h2>
              <p className="text-3xl tracking-tight text-gray-900">
                {product.price}
              </p>
            </div>

            <div className="mt-3 flex items-center">
              <div className="flex items-center">
                {[0, 1, 2, 3, 4].map((rating) => (
                  <Star
                    key={rating}
                    className={`h-5 w-5 ${
                      rating < Math.floor(product.rating)
                        ? "text-yellow-400 fill-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
                <span className="ml-2 text-sm text-gray-500">
                  {product.rating} out of 5 stars
                </span>
              </div>
              <div className="ml-4 border-l border-gray-300 pl-4">
                <span className="text-sm text-gray-500">
                  {product.reviews} reviews
                </span>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="sr-only">Description</h3>
              <p className="text-base text-gray-700">{product.description}</p>
            </div>

            <div className="mt-8">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-gray-900">Size</h3>
              </div>

              <div className="mt-2 grid grid-cols-4 gap-2">
                {product.sizes.map((size) => (
                  <Button key={size} variant="outline" className="text-sm">
                    {size}
                  </Button>
                ))}
              </div>
            </div>

            <div className="mt-8">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-gray-900">Quantity</h3>
              </div>

              <div className="mt-2 flex items-center">
                <Button variant="outline" size="icon" className="h-8 w-8">
                  -
                </Button>
                <span className="mx-4 text-sm">1</span>
                <Button variant="outline" size="icon" className="h-8 w-8">
                  +
                </Button>
              </div>
            </div>

            <div className="mt-8 flex gap-4">
              <Button className="flex-1">
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