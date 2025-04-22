/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/no-unescaped-entities */
"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

interface FirebaseProduct {
  id: string;
  name: string;
  price: string;
  images: string[];
}

interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCartItems = () => {
      const savedCart = typeof window !== "undefined" ? localStorage.getItem("cart") : null;
      if (savedCart) {
        try {
          const parsedCart: CartItem[] = JSON.parse(savedCart);
          setCartItems(parsedCart);
        } catch (error) {
          console.error("Failed to parse cart data:", error);
          toast.error("Failed to load cart items");
        }
      }
    };

    const fetchProducts = async () => {
      try {
        const res = await fetch(
          "https://ecommerce-c6014-default-rtdb.firebaseio.com/Products/products.json"
        );
        const data = await res.json();
        const products: FirebaseProduct[] = Object.entries(data).map(
          ([key, value]: any) => ({
            id: key,
            ...value,
          })
        );

        const initialCartItems: CartItem[] = products.slice(0, 2).map((product) => ({
          id: product.id,
          name: product.name,
          price: parseFloat(product.price.replace("$", "")),
          image: product.images[0] || "/placeholder.svg",
          quantity: 1,
        }));

        setCartItems(initialCartItems);
      } catch (error) {
        console.error("Failed to fetch product data:", error);
        toast.error("Failed to load products");
      } finally {
        loadCartItems(); // Ensure we load cart items after fetching products.
        setLoading(false);
      }
    };

    loadCartItems();
    fetchProducts();
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("cart", JSON.stringify(cartItems));
    }
  }, [cartItems]);

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    setCartItems((items) =>
      items.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item))
    );
  };

  const removeItem = (id: string) => {
    setCartItems((items) => items.filter((item) => item.id !== id));
    toast.success("Item removed from cart");
  };

  const handleCheckout = () => {
    // Process checkout logic here
    toast.success("Order placed successfully!", {
      description: "Your items will be shipped soon.",
      duration: 5000,
    });
    setCartItems([]);
  };

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const shipping = 12.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  if (loading) {
    return <div className="p-10 text-lg font-semibold">Loading cart...</div>;
  }

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Shopping Cart</h1>

        {cartItems.length > 0 ? (
          <div className="mt-12 lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start">
            {/* Cart Items List */}
            <div className="lg:col-span-7">
              <ul role="list" className="divide-y divide-gray-200 border-t border-b border-gray-200">
                {cartItems.map((item) => (
                  <li key={item.id} className="flex py-6 sm:py-8">
                    <div className="flex-shrink-0">
                      <div className="relative h-24 w-24 sm:h-32 sm:w-32">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="h-full w-full rounded-md object-cover object-center"
                        />
                      </div>
                    </div>

                    <div className="ml-4 flex flex-1 flex-col sm:ml-6">
                      <div className="flex justify-between">
                        <h4 className="text-sm font-medium text-gray-900">
                          <Link href={`/products/${item.id}`} className="hover:underline">
                            {item.name}
                          </Link>
                        </h4>
                        <p className="ml-4 text-sm font-medium text-gray-900">${item.price.toFixed(2)}</p>
                      </div>

                      <div className="mt-4 flex flex-1 items-end justify-between">
                        <div className="flex items-center border rounded-md">
                          <button
                            type="button"
                            className="p-2"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          >
                            <Minus className="h-4 w-4" />
                            <span className="sr-only">Decrease quantity</span>
                          </button>
                          <span className="px-2 text-sm">{item.quantity}</span>
                          <button
                            type="button"
                            className="p-2"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            <Plus className="h-4 w-4" />
                            <span className="sr-only">Increase quantity</span>
                          </button>
                        </div>

                        <button
                          type="button"
                          className="text-sm font-medium text-red-600 hover:text-red-500 flex items-center"
                          onClick={() => removeItem(item.id)}
                        >
                          <Trash2 className="h-4 w-4 mr-1" />
                          Remove
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="mt-6">
                <Link
                  href="/products"
                  className="text-sm font-medium text-primary hover:text-primary/80 flex items-center"
                >
                  <ArrowLeft className="h-4 w-4 mr-1" />
                  Continue Shopping
                </Link>
              </div>
            </div>

            {/* Summary Section */}
            <div className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8">
              <h2 className="text-lg font-medium text-gray-900">Order summary</h2>

              <div className="mt-6 space-y-4">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-600">Subtotal</p>
                  <p className="text-sm font-medium text-gray-900">${subtotal.toFixed(2)}</p>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-600">Shipping estimate</p>
                  <p className="text-sm font-medium text-gray-900">${shipping.toFixed(2)}</p>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-600">Tax estimate</p>
                  <p className="text-sm font-medium text-gray-900">${tax.toFixed(2)}</p>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <p className="text-base font-medium text-gray-900">Order total</p>
                  <p className="text-base font-medium text-gray-900">${total.toFixed(2)}</p>
                </div>
              </div>

              <div className="mt-6">
                <Button
                  className="w-full"
                  onClick={handleCheckout}
                >
                  Checkout
                </Button>
              </div>

              <div className="mt-6 text-center text-sm text-gray-500">
                <p>
                  or{" "}
                  <Link href="/checkout" className="font-medium text-primary hover:text-primary/80">
                    Continue to Checkout
                  </Link>
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="mt-12 text-center">
            <ShoppingBag className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-lg font-medium text-gray-900">Your cart is empty</h3>
            <p className="mt-1 text-sm text-gray-500">
              Looks like you haven't added any products to your cart yet.
            </p>
            <div className="mt-6">
              <Link href="/products">
                <Button>Continue Shopping</Button>
              </Link>
            </div>
          </div>
        )} 
      </div>
    </div>
  );
}