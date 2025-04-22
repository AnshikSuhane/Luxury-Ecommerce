import Link from "next/link"
import { CheckCircle, Package, ShoppingBag } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

export default function ConfirmationPage() {
  // Generate a random order number
  const orderNumber = `LX-${Math.floor(100000 + Math.random() * 900000)}`

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="max-w-xl mx-auto text-center">
          <div className="inline-flex h-24 w-24 items-center justify-center rounded-full bg-green-100">
            <CheckCircle className="h-12 w-12 text-green-600" />
          </div>
          <h1 className="mt-6 text-3xl font-bold tracking-tight text-gray-900">Thank you for your order!</h1>
          <p className="mt-2 text-lg text-gray-500">Your order has been placed and is being processed.</p>
        </div>

        <div className="mt-12 bg-gray-50 rounded-lg p-6">
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-medium text-gray-900">Order Information</h2>
              <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">Order number</p>
                  <p className="mt-1 text-base font-medium text-gray-900">{orderNumber}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Order date</p>
                  <p className="mt-1 text-base text-gray-900">{new Date().toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Payment method</p>
                  <p className="mt-1 text-base text-gray-900">Credit Card</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Shipping method</p>
                  <p className="mt-1 text-base text-gray-900">Standard Shipping</p>
                </div>
              </div>
            </div>

            <Separator />

            <div>
              <h2 className="text-lg font-medium text-gray-900">Shipping Information</h2>
              <div className="mt-4">
                <p className="text-base text-gray-900">John Doe</p>
                <p className="text-base text-gray-900">123 Main St</p>
                <p className="text-base text-gray-900">Apt 4B</p>
                <p className="text-base text-gray-900">New York, NY 10001</p>
                <p className="text-base text-gray-900">United States</p>
              </div>
            </div>

            <Separator />

            <div>
              <h2 className="text-lg font-medium text-gray-900">Order Summary</h2>
              <div className="mt-4 space-y-4">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-600">Subtotal</p>
                  <p className="text-sm font-medium text-gray-900">$132.25</p>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-600">Shipping</p>
                  <p className="text-sm font-medium text-gray-900">$5.99</p>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-600">Tax</p>
                  <p className="text-sm font-medium text-gray-900">$10.58</p>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <p className="text-base font-medium text-gray-900">Total</p>
                  <p className="text-base font-medium text-gray-900">$148.82</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 space-y-4">
          <div className="rounded-md bg-blue-50 p-4">
            <div className="flex">
              <Package className="h-5 w-5 text-blue-400" />
              <div className="ml-3">
                <h3 className="text-sm font-medium text-blue-800">Shipping Update</h3>
                <div className="mt-2 text-sm text-blue-700">
                  <p>
                    You will receive an email with your order confirmation and tracking information once your order
                    ships.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center space-x-4">
            <Button asChild variant="outline">
              <Link href="/account">
                <ShoppingBag className="mr-2 h-4 w-4" />
                View Order History
              </Link>
            </Button>
            <Button asChild>
              <Link href="/">Continue Shopping</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
