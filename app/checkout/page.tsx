// "use client"

// import type React from "react"

// import { useState, useEffect } from "react"
// import Image from "next/image"
// import Link from "next/link"
// import { useRouter } from "next/navigation"
// import { Check, ChevronRight, CreditCard, Info, Loader2, MapPin, ShoppingBag } from "lucide-react"

// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
// import { Separator } from "@/components/ui/separator"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// // import { useToast } from "@/hooks/use-toast"
// import type { Product } from "@/lib/api"

// interface CartItem extends Product {
//   quantity: number
// }

// interface ShippingInfo {
//   firstName: string
//   lastName: string
//   address: string
//   apartment?: string
//   city: string
//   state: string
//   zipCode: string
//   phone: string
//   email: string
// }

// interface PaymentInfo {
//   cardNumber: string
//   nameOnCard: string
//   expiryDate: string
//   cvv: string
// }

// export default function CheckoutPage() {
//   const router = useRouter()
//   const { toast } = useToast()
//   const [cartItems, setCartItems] = useState<CartItem[]>([])
//   const [isLoading, setIsLoading] = useState(true)
//   const [isSubmitting, setIsSubmitting] = useState(false)
//   const [shippingMethod, setShippingMethod] = useState("standard")
//   const [paymentMethod, setPaymentMethod] = useState("credit")
//   const [step, setStep] = useState(1)

//   const [shippingInfo, setShippingInfo] = useState<ShippingInfo>({
//     firstName: "",
//     lastName: "",
//     address: "",
//     apartment: "",
//     city: "",
//     state: "",
//     zipCode: "",
//     phone: "",
//     email: "",
//   })

//   const [paymentInfo, setPaymentInfo] = useState<PaymentInfo>({
//     cardNumber: "",
//     nameOnCard: "",
//     expiryDate: "",
//     cvv: "",
//   })

//   useEffect(() => {
//     // Fetch products from API and simulate cart items
//     const fetchCartItems = async () => {
//       try {
//         const response = await fetch("https://ecommerce-c6014-default-rtdb.firebaseio.com/Products/products.json")
//         if (!response.ok) {
//           throw new Error("Failed to fetch products")
//         }

//         const products = await response.json()

//         // Simulate cart with first two products
//         if (products && products.length > 0) {
//           const cartProducts = products.slice(0, 2).map((product: Product, index: number) => ({
//             ...product,
//             quantity: index + 1, // First item quantity 1, second item quantity 2
//           }))

//           setCartItems(cartProducts)
//         }

//         setIsLoading(false)
//       } catch (error) {
//         console.error("Error fetching cart items:", error)
//         setIsLoading(false)
//       }
//     }

//     fetchCartItems()
//   }, [])

//   const getItemPrice = (price: number | string): number => {
//     return typeof price === "number" ? price : Number.parseFloat(price.toString())
//   }

//   const subtotal = cartItems.reduce((total, item) => {
//     return total + getItemPrice(item.price) * item.quantity
//   }, 0)

//   const shippingCost = shippingMethod === "standard" ? 5.99 : shippingMethod === "express" ? 12.99 : 24.99
//   const tax = subtotal * 0.08
//   const total = subtotal + shippingCost + tax

//   const handleShippingInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target
//     setShippingInfo((prev) => ({ ...prev, [name]: value }))
//   }

//   const handlePaymentInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target
//     setPaymentInfo((prev) => ({ ...prev, [name]: value }))
//   }

//   const handleShippingSubmit = (e: React.FormEvent) => {
//     e.preventDefault()
//     // Validate shipping info
//     if (
//       !shippingInfo.firstName ||
//       !shippingInfo.lastName ||
//       !shippingInfo.address ||
//       !shippingInfo.city ||
//       !shippingInfo.state ||
//       !shippingInfo.zipCode ||
//       !shippingInfo.phone ||
//       !shippingInfo.email
//     ) {
//       toast({
//         title: "Missing information",
//         description: "Please fill in all required fields.",
//         variant: "destructive",
//       })
//       return
//     }

//     // Move to payment step
//     setStep(2)
//   }

//   const handlePaymentSubmit = (e: React.FormEvent) => {
//     e.preventDefault()

//     // Validate payment info if credit card is selected
//     if (paymentMethod === "credit") {
//       if (!paymentInfo.cardNumber || !paymentInfo.nameOnCard || !paymentInfo.expiryDate || !paymentInfo.cvv) {
//         toast({
//           title: "Missing information",
//           description: "Please fill in all payment details.",
//           variant: "destructive",
//         })
//         return
//       }
//     }

//     // Move to review step
//     setStep(3)
//   }

//   const handlePlaceOrder = async () => {
//     setIsSubmitting(true)

//     // Simulate API call to place order
//     try {
//       await new Promise((resolve) => setTimeout(resolve, 2000))

//       toast({
//         title: "Order placed successfully!",
//         description: "Thank you for your purchase.",
//         variant: "default",
//       })

//       // Redirect to confirmation page
//       router.push("/checkout/confirmation")
//     } catch (error) {
//       // toast({
//       //   title: "Error placing order",
//       //   description: "Please try again later.",
//       //   variant: "destructive",
//       // })
//       // setIsSubmitting(false)
//       console.log(error)
//     }
//   }

//   if (isLoading) {
//     return (
//       <div className="container mx-auto py-16 px-4 text-center">
//         <Loader2 className="h-8 w-8 animate-spin mx-auto" />
//         <p className="mt-4">Loading checkout information...</p>
//       </div>
//     )
//   }

//   if (cartItems.length === 0) {
//     return (
//       <div className="container mx-auto py-16 px-4 text-center">
//         <ShoppingBag className="mx-auto h-12 w-12 text-gray-400" />
//         <h3 className="mt-2 text-lg font-medium text-gray-900">Your cart is empty</h3>
//         <p className="mt-1 text-sm text-gray-500">Add some products to your cart before checking out.</p>
//         <div className="mt-6">
//           <Link href="/products">
//             <Button>Browse Products</Button>
//           </Link>
//         </div>
//       </div>
//     )
//   }

//   return (
//     <div className="bg-white">
//       <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
//         <div className="mx-auto max-w-2xl lg:max-w-none">
//           <h1 className="text-3xl font-bold tracking-tight text-gray-900">Checkout</h1>

//           {/* Checkout Steps */}
//           <div className="mt-8">
//             <div className="flex items-center justify-between mb-8">
//               <div className="flex items-center">
//                 <div
//                   className={`flex h-8 w-8 items-center justify-center rounded-full ${step >= 1 ? "bg-primary text-white" : "bg-gray-200 text-gray-500"}`}
//                 >
//                   {step > 1 ? <Check className="h-5 w-5" /> : "1"}
//                 </div>
//                 <span className="ml-2 text-sm font-medium">Shipping</span>
//               </div>
//               <ChevronRight className="h-4 w-4 text-gray-400" />
//               <div className="flex items-center">
//                 <div
//                   className={`flex h-8 w-8 items-center justify-center rounded-full ${step >= 2 ? "bg-primary text-white" : "bg-gray-200 text-gray-500"}`}
//                 >
//                   {step > 2 ? <Check className="h-5 w-5" /> : "2"}
//                 </div>
//                 <span className="ml-2 text-sm font-medium">Payment</span>
//               </div>
//               <ChevronRight className="h-4 w-4 text-gray-400" />
//               <div className="flex items-center">
//                 <div
//                   className={`flex h-8 w-8 items-center justify-center rounded-full ${step >= 3 ? "bg-primary text-white" : "bg-gray-200 text-gray-500"}`}
//                 >
//                   {step > 3 ? <Check className="h-5 w-5" /> : "3"}
//                 </div>
//                 <span className="ml-2 text-sm font-medium">Review</span>
//               </div>
//             </div>

//             <div className="lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start">
//               <div className="lg:col-span-7">
//                 {/* Step 1: Shipping Information */}
//                 {step === 1 && (
//                   <div className="bg-white p-6 rounded-lg border">
//                     <h2 className="text-lg font-medium text-gray-900 mb-6">Shipping Information</h2>
//                     <form onSubmit={handleShippingSubmit}>
//                       <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
//                         <div>
//                           <Label htmlFor="firstName">
//                             First name <span className="text-red-500">*</span>
//                           </Label>
//                           <Input
//                             id="firstName"
//                             name="firstName"
//                             value={shippingInfo.firstName}
//                             onChange={handleShippingInfoChange}
//                             className="mt-1"
//                             required
//                           />
//                         </div>

//                         <div>
//                           <Label htmlFor="lastName">
//                             Last name <span className="text-red-500">*</span>
//                           </Label>
//                           <Input
//                             id="lastName"
//                             name="lastName"
//                             value={shippingInfo.lastName}
//                             onChange={handleShippingInfoChange}
//                             className="mt-1"
//                             required
//                           />
//                         </div>

//                         <div className="sm:col-span-2">
//                           <Label htmlFor="address">
//                             Address <span className="text-red-500">*</span>
//                           </Label>
//                           <Input
//                             id="address"
//                             name="address"
//                             value={shippingInfo.address}
//                             onChange={handleShippingInfoChange}
//                             className="mt-1"
//                             required
//                           />
//                         </div>

//                         <div className="sm:col-span-2">
//                           <Label htmlFor="apartment">Apartment, suite, etc.</Label>
//                           <Input
//                             id="apartment"
//                             name="apartment"
//                             value={shippingInfo.apartment}
//                             onChange={handleShippingInfoChange}
//                             className="mt-1"
//                           />
//                         </div>

//                         <div>
//                           <Label htmlFor="city">
//                             City <span className="text-red-500">*</span>
//                           </Label>
//                           <Input
//                             id="city"
//                             name="city"
//                             value={shippingInfo.city}
//                             onChange={handleShippingInfoChange}
//                             className="mt-1"
//                             required
//                           />
//                         </div>

//                         <div>
//                           <Label htmlFor="state">
//                             State / Province <span className="text-red-500">*</span>
//                           </Label>
//                           <Input
//                             id="state"
//                             name="state"
//                             value={shippingInfo.state}
//                             onChange={handleShippingInfoChange}
//                             className="mt-1"
//                             required
//                           />
//                         </div>

//                         <div>
//                           <Label htmlFor="zipCode">
//                             ZIP / Postal code <span className="text-red-500">*</span>
//                           </Label>
//                           <Input
//                             id="zipCode"
//                             name="zipCode"
//                             value={shippingInfo.zipCode}
//                             onChange={handleShippingInfoChange}
//                             className="mt-1"
//                             required
//                           />
//                         </div>

//                         <div>
//                           <Label htmlFor="phone">
//                             Phone <span className="text-red-500">*</span>
//                           </Label>
//                           <Input
//                             id="phone"
//                             name="phone"
//                             type="tel"
//                             value={shippingInfo.phone}
//                             onChange={handleShippingInfoChange}
//                             className="mt-1"
//                             required
//                           />
//                         </div>

//                         <div className="sm:col-span-2">
//                           <Label htmlFor="email">
//                             Email <span className="text-red-500">*</span>
//                           </Label>
//                           <Input
//                             id="email"
//                             name="email"
//                             type="email"
//                             value={shippingInfo.email}
//                             onChange={handleShippingInfoChange}
//                             className="mt-1"
//                             required
//                           />
//                         </div>
//                       </div>

//                       <div className="mt-8">
//                         <h3 className="text-base font-medium text-gray-900 mb-4">Shipping Method</h3>
//                         <RadioGroup value={shippingMethod} onValueChange={setShippingMethod} className="space-y-4">
//                           <div className="flex items-center justify-between border rounded-md p-4">
//                             <div className="flex items-center">
//                               <RadioGroupItem value="standard" id="standard" />
//                               <Label htmlFor="standard" className="ml-3 cursor-pointer">
//                                 <span className="font-medium">Standard Shipping</span>
//                                 <p className="text-sm text-gray-500">3-5 business days</p>
//                               </Label>
//                             </div>
//                             <span className="text-sm font-medium">$5.99</span>
//                           </div>
//                           <div className="flex items-center justify-between border rounded-md p-4">
//                             <div className="flex items-center">
//                               <RadioGroupItem value="express" id="express" />
//                               <Label htmlFor="express" className="ml-3 cursor-pointer">
//                                 <span className="font-medium">Express Shipping</span>
//                                 <p className="text-sm text-gray-500">2 business days</p>
//                               </Label>
//                             </div>
//                             <span className="text-sm font-medium">$12.99</span>
//                           </div>
//                           <div className="flex items-center justify-between border rounded-md p-4">
//                             <div className="flex items-center">
//                               <RadioGroupItem value="overnight" id="overnight" />
//                               <Label htmlFor="overnight" className="ml-3 cursor-pointer">
//                                 <span className="font-medium">Overnight Shipping</span>
//                                 <p className="text-sm text-gray-500">Next business day</p>
//                               </Label>
//                             </div>
//                             <span className="text-sm font-medium">$24.99</span>
//                           </div>
//                         </RadioGroup>
//                       </div>

//                       <div className="mt-8 flex justify-end">
//                         <Button type="submit">Continue to Payment</Button>
//                       </div>
//                     </form>
//                   </div>
//                 )}

//                 {/* Step 2: Payment Information */}
//                 {step === 2 && (
//                   <div className="bg-white p-6 rounded-lg border">
//                     <h2 className="text-lg font-medium text-gray-900 mb-6">Payment Method</h2>
//                     <form onSubmit={handlePaymentSubmit}>
//                       <Tabs defaultValue="credit" onValueChange={setPaymentMethod}>
//                         <TabsList className="grid w-full grid-cols-2">
//                           <TabsTrigger value="credit">Credit Card</TabsTrigger>
//                           <TabsTrigger value="paypal">PayPal</TabsTrigger>
//                         </TabsList>
//                         <TabsContent value="credit" className="mt-6">
//                           <div className="space-y-6">
//                             <div>
//                               <Label htmlFor="cardNumber">
//                                 Card number <span className="text-red-500">*</span>
//                               </Label>
//                               <div className="relative mt-1">
//                                 <Input
//                                   id="cardNumber"
//                                   name="cardNumber"
//                                   placeholder="1234 5678 9012 3456"
//                                   value={paymentInfo.cardNumber}
//                                   onChange={handlePaymentInfoChange}
//                                   required
//                                 />
//                                 <CreditCard className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
//                               </div>
//                             </div>

//                             <div>
//                               <Label htmlFor="nameOnCard">
//                                 Name on card <span className="text-red-500">*</span>
//                               </Label>
//                               <Input
//                                 id="nameOnCard"
//                                 name="nameOnCard"
//                                 placeholder="John Doe"
//                                 value={paymentInfo.nameOnCard}
//                                 onChange={handlePaymentInfoChange}
//                                 className="mt-1"
//                                 required
//                               />
//                             </div>

//                             <div className="grid grid-cols-2 gap-x-4">
//                               <div>
//                                 <Label htmlFor="expiryDate">
//                                   Expiry date (MM/YY) <span className="text-red-500">*</span>
//                                 </Label>
//                                 <Input
//                                   id="expiryDate"
//                                   name="expiryDate"
//                                   placeholder="MM/YY"
//                                   value={paymentInfo.expiryDate}
//                                   onChange={handlePaymentInfoChange}
//                                   className="mt-1"
//                                   required
//                                 />
//                               </div>
//                               <div>
//                                 <Label htmlFor="cvv">
//                                   CVV <span className="text-red-500">*</span>
//                                   <span className="ml-1 inline-flex items-center">
//                                     <Info className="h-4 w-4 text-gray-400" />
//                                   </span>
//                                 </Label>
//                                 <Input
//                                   id="cvv"
//                                   name="cvv"
//                                   placeholder="123"
//                                   value={paymentInfo.cvv}
//                                   onChange={handlePaymentInfoChange}
//                                   className="mt-1"
//                                   required
//                                 />
//                               </div>
//                             </div>
//                           </div>
//                         </TabsContent>
//                         <TabsContent value="paypal" className="mt-6">
//                           <div className="text-center py-12 border rounded-md">
//                             <Image
//                               src="/placeholder.svg?height=60&width=120&text=PayPal"
//                               alt="PayPal"
//                               width={120}
//                               height={60}
//                               className="mx-auto"
//                             />
//                             <p className="mt-4 text-sm text-gray-500">
//                               You will be redirected to PayPal to complete your payment.
//                             </p>
//                           </div>
//                         </TabsContent>
//                       </Tabs>

//                       <div className="mt-8 flex justify-between">
//                         <Button variant="outline" type="button" onClick={() => setStep(1)}>
//                           Back to Shipping
//                         </Button>
//                         <Button type="submit">Review Order</Button>
//                       </div>
//                     </form>
//                   </div>
//                 )}

//                 {/* Step 3: Review Order */}
//                 {step === 3 && (
//                   <div className="bg-white p-6 rounded-lg border">
//                     <h2 className="text-lg font-medium text-gray-900 mb-6">Review Your Order</h2>

//                     <div className="space-y-6">
//                       <div>
//                         <h3 className="text-base font-medium text-gray-900 flex items-center">
//                           <MapPin className="h-5 w-5 mr-2 text-gray-400" />
//                           Shipping Information
//                         </h3>
//                         <div className="mt-2 text-sm text-gray-500">
//                           <p>
//                             {shippingInfo.firstName} {shippingInfo.lastName}
//                           </p>
//                           <p>{shippingInfo.address}</p>
//                           {shippingInfo.apartment && <p>{shippingInfo.apartment}</p>}
//                           <p>
//                             {shippingInfo.city}, {shippingInfo.state} {shippingInfo.zipCode}
//                           </p>
//                           <p>{shippingInfo.phone}</p>
//                           <p>{shippingInfo.email}</p>
//                         </div>
//                         <div className="mt-2">
//                           <Button variant="link" className="p-0 h-auto" onClick={() => setStep(1)}>
//                             Edit
//                           </Button>
//                         </div>
//                       </div>

//                       <Separator />

//                       <div>
//                         <h3 className="text-base font-medium text-gray-900 flex items-center">
//                           <CreditCard className="h-5 w-5 mr-2 text-gray-400" />
//                           Payment Method
//                         </h3>
//                         <div className="mt-2 text-sm text-gray-500">
//                           {paymentMethod === "credit" ? (
//                             <>
//                               <p>Credit Card ending in {paymentInfo.cardNumber.slice(-4)}</p>
//                               <p>Expires {paymentInfo.expiryDate}</p>
//                             </>
//                           ) : (
//                             <p>PayPal</p>
//                           )}
//                         </div>
//                         <div className="mt-2">
//                           <Button variant="link" className="p-0 h-auto" onClick={() => setStep(2)}>
//                             Edit
//                           </Button>
//                         </div>
//                       </div>

//                       <Separator />

//                       <div>
//                         <h3 className="text-base font-medium text-gray-900 mb-4">Order Items</h3>
//                         <ul className="divide-y divide-gray-200">
//                           {cartItems.map((item) => (
//                             <li key={item.id} className="py-4 flex">
//                               <div className="flex-shrink-0">
//                                 <div className="relative h-16 w-16">
//                                   <Image
//                                     src={item.image || "/placeholder.svg?height=100&width=100"}
//                                     alt={item.title}
//                                     fill
//                                     className="rounded-md object-cover object-center"
//                                     onError={(e) => {
//                                       const target = e.target as HTMLImageElement
//                                       target.src = "/placeholder.svg?height=100&width=100"
//                                     }}
//                                   />
//                                 </div>
//                               </div>
//                               <div className="ml-4 flex-1 flex flex-col">
//                                 <div>
//                                   <div className="flex justify-between text-sm font-medium text-gray-900">
//                                     <h4 className="line-clamp-1">{item.title}</h4>
//                                     <p className="ml-4">
//                                       ${typeof item.price === "number" ? item.price.toFixed(2) : item.price}
//                                     </p>
//                                   </div>
//                                 </div>
//                                 <div className="mt-1 flex-1 flex items-end justify-between text-sm">
//                                   <p className="text-gray-500">Qty {item.quantity}</p>
//                                 </div>
//                               </div>
//                             </li>
//                           ))}
//                         </ul>
//                       </div>
//                     </div>

//                     <div className="mt-8 flex justify-between">
//                       <Button variant="outline" type="button" onClick={() => setStep(2)}>
//                         Back to Payment
//                       </Button>
//                       <Button onClick={handlePlaceOrder} disabled={isSubmitting}>
//                         {isSubmitting ? (
//                           <>
//                             <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                             Processing...
//                           </>
//                         ) : (
//                           "Place Order"
//                         )}
//                       </Button>
//                     </div>
//                   </div>
//                 )}
//               </div>

//               {/* Order Summary */}
//               <div className="mt-10 lg:mt-0 lg:col-span-5">
//                 <div className="bg-gray-50 rounded-lg p-6">
//                   <h2 className="text-lg font-medium text-gray-900">Order Summary</h2>

//                   <div className="mt-6 space-y-4">
//                     <div className="flex items-center justify-between">
//                       <p className="text-sm text-gray-600">Subtotal</p>
//                       <p className="text-sm font-medium text-gray-900">${subtotal.toFixed(2)}</p>
//                     </div>
//                     <div className="flex items-center justify-between">
//                       <p className="text-sm text-gray-600">Shipping</p>
//                       <p className="text-sm font-medium text-gray-900">${shippingCost.toFixed(2)}</p>
//                     </div>
//                     <div className="flex items-center justify-between">
//                       <p className="text-sm text-gray-600">Tax</p>
//                       <p className="text-sm font-medium text-gray-900">${tax.toFixed(2)}</p>
//                     </div>
//                     <Separator />
//                     <div className="flex items-center justify-between">
//                       <p className="text-base font-medium text-gray-900">Order total</p>
//                       <p className="text-base font-medium text-gray-900">${total.toFixed(2)}</p>
//                     </div>
//                   </div>

//                   <div className="mt-6">
//                     <div className="rounded-md bg-gray-100 p-4">
//                       <div className="flex items-start">
//                         <Info className="h-5 w-5 text-gray-400 mt-0.5" />
//                         <div className="ml-3 text-sm text-gray-600">
//                           <p>
//                             Your personal data will be used to process your order, support your experience throughout
//                             this website, and for other purposes described in our privacy policy.
//                           </p>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }
