/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/no-unescaped-entities */
"use client";
import React from "react";

import { 
  ArrowRight, 
  Star, 
  Clock, 
  Truck, 
  Shield, 
  ChevronRight, 
  Heart,
  Sparkles,
  Gift,
  Percent
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Category from "./category/page";
import Link from "next/link";

function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      
      
      {/* Hero Section */}
      <main className="flex-1">
        <section className="relative">
          {/* Hero Background with Video */}
          <div className="relative h-screen">
            <div 
              className="absolute inset-0 z-0"
              style={{
                backgroundImage: "url('https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070')",
                backgroundPosition: "center",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat"
              }}
            >
              <div className="absolute inset-0 bg-black/40" />
            </div>

            {/* Hero Content */}
            <div className="relative h-full flex items-center">
              <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-3xl">
                  <div className="flex items-center gap-2 mb-6">
                    <Badge variant="secondary" className="bg-white/10 backdrop-blur-sm text-white hover:bg-white/20">
                      New Season Collection 2024
                    </Badge>
                    <Badge variant="secondary" className="bg-white/10 backdrop-blur-sm text-white hover:bg-white/20">
                      Limited Edition
                    </Badge>
                  </div>
                  <h1 className="text-4xl md:text-7xl font-bold mb-6 leading-tight text-white">
                    Discover Your Style,<br />Define Your Elegance
                  </h1>
                  <p className="text-lg md:text-xl mb-8 text-white/90 leading-relaxed max-w-2xl">
                    Explore our new collection of premium fashion pieces designed to elevate your wardrobe.
                    Quality meets style in every stitch, crafted for those who appreciate refined elegance.
                    Join the fashion revolution and make a statement that's uniquely yours.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 mb-12">
                    <Button size="lg" className="bg-white text-black hover:bg-white/90">
                      Shop Women's Collection <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                    <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-black">
                      Shop Men's Collection <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-8 border-t border-white/20">
                    <div className="flex flex-col items-center text-center text-white">
                      <Star className="h-6 w-6 mb-2" />
                      <h4 className="font-medium">Premium Quality</h4>
                      <p className="text-sm text-white/70">Finest materials used</p>
                    </div>
                    <div className="flex flex-col items-center text-center text-white">
                      <Clock className="h-6 w-6 mb-2" />
                      <h4 className="font-medium">Fast Delivery</h4>
                      <p className="text-sm text-white/70">2-3 business days</p>
                    </div>
                    <div className="flex flex-col items-center text-center text-white">
                      <Truck className="h-6 w-6 mb-2" />
                      <h4 className="font-medium">Free Shipping</h4>
                      <p className="text-sm text-white/70">On orders over $100</p>
                    </div>
                    <div className="flex flex-col items-center text-center text-white">
                      <Shield className="h-6 w-6 mb-2" />
                      <h4 className="font-medium">Secure Payment</h4>
                      <p className="text-sm text-white/70">100% secure checkout</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white text-center">
              <p className="text-sm mb-2">Scroll to explore</p>
              <div className="w-1 h-8 bg-white/30 mx-auto rounded-full overflow-hidden">
                <div className="w-full h-1/2 bg-white animate-bounce" />
              </div>
            </div>
          </div>

          {/* New Season Collection */}
          <section className="py-24 bg-gradient-to-b from-black to-background">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <Badge variant="secondary" className="mb-4">Spring/Summer 2024</Badge>
                <h2 className="text-4xl font-bold mb-4 text-white/80">New Season Collection</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Embrace the warmth of the new season with our latest collection. 
                  Fresh colors, light fabrics, and timeless designs.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="relative h-[600px] group cursor-pointer">
                  <div 
                    className="absolute inset-0 rounded-lg overflow-hidden"
                    style={{
                      backgroundImage: "url('https://images.unsplash.com/photo-1475180098004-ca77a66827be?q=80&w=1472')",
                      backgroundPosition: "center",
                      backgroundSize: "cover"
                    }}
                  >
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
                  </div>
                  <div className="absolute inset-0 p-8 flex flex-col justify-end text-white">
                    <Badge className="w-fit mb-4 bg-white/20">Women's Collection</Badge>
                    <h3 className="text-3xl font-bold mb-2">Spring Essentials</h3>
                    <p className="mb-4 text-white/90">Discover our curated selection of must-have pieces for the season.</p>
                    <Link href={"/products"}>\
                    <Button variant="outline" className="w-fit border-white text-white hover:bg-white hover:text-black">
                      Shop Now <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                    </Link>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 gap-8">
                  <div className="relative h-[280px] group cursor-pointer">
                    <div 
                      className="absolute inset-0 rounded-lg overflow-hidden"
                      style={{
                        backgroundImage: "url('https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?q=80&w=1495')",
                        backgroundPosition: "center",
                        backgroundSize: "cover"
                      }}
                    >
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
                    </div>
                    <div className="absolute inset-0 p-6 flex flex-col justify-end text-white">
                      <h3 className="text-2xl font-bold mb-2">Accessories</h3>
                      <p className="mb-4 text-white/90">Complete your look with our latest accessories.</p>
                      <Link href={""}></Link>
                      <Button variant="outline" className="w-fit border-white text-white hover:bg-white hover:text-black">
                        Explore <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="relative h-[280px] group cursor-pointer">
                    <div 
                      className="absolute inset-0 rounded-lg overflow-hidden"
                      style={{
                        backgroundImage: "url('https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?q=80&w=1470')",
                        backgroundPosition: "center",
                        backgroundSize: "cover"
                      }}
                    >
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
                    </div>
                    <div className="absolute inset-0 p-6 flex flex-col justify-end text-white">
                      <h3 className="text-2xl font-bold mb-2">New Arrivals</h3>
                      <p className="mb-4 text-white/90">Be the first to shop our latest arrivals.</p>
                      <Button variant="outline" className="w-fit border-white text-white hover:bg-white hover:text-black">
                        Shop New <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Featured Categories */}
          <section className="py-24 bg-muted/30">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <Badge variant="secondary" className="mb-4">Curated Selection</Badge>
                <h2 className="text-4xl font-bold mb-4">Shop by Category</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Explore our carefully curated categories, featuring the finest selection
                  of fashion pieces for every style and occasion.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  {
                    title: "Luxury Collection",
                    image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070",
                    description: "Discover our exclusive luxury pieces, crafted with the finest materials and attention to detail.",
                    tag: "Premium"
                  },
                  {
                    title: "Summer Essentials",
                    image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=1470",
                    description: "Light & breezy styles perfect for the summer season. Stay cool and stylish.",
                    tag: "Season's Best"
                  },
                  {
                    title: "Designer Accessories",
                    image: "https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?q=80&w=1530",
                    description: "Elevate any outfit with our selection of premium designer accessories.",
                    tag: "Must-Have"
                  }
                ].map((category, index) => (
                  <div 
                    key={index}
                    className="group relative rounded-xl overflow-hidden bg-black cursor-pointer shadow-xl"
                  >
                    <img 
                      src={category.image} 
                      alt={category.title}
                      className="w-full h-[500px] object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent flex flex-col justify-end p-8">
                      <Badge variant="secondary" className="w-fit mb-4 bg-white/20 text-white">
                        {category.tag}
                      </Badge>
                      <h3 className="text-2xl font-semibold text-white mb-2">{category.title}</h3>
                      <p className="text-white/80 mb-6">{category.description}</p>
                      <Button variant="outline" className="border-white text-white w-fit hover:bg-white hover:text-black group">
                        Explore Collection <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Special Offers */}
          <section 
            className="py-24 relative"
            style={{
              backgroundImage: "url('https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=1471')",
              backgroundPosition: "center",
              backgroundSize: "cover",
              backgroundAttachment: "fixed"
            }}
          >
            <div className="absolute inset-0 bg-black/60" />
            <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-4xl mx-auto text-center text-white">
                <Badge variant="secondary" className="mb-4 bg-white/20">Limited Time</Badge>
                <h2 className="text-5xl font-bold mb-6">Special Offers</h2>
                <p className="text-xl mb-8 text-white/90">
                  Don't miss out on our exclusive deals. Limited time offers on selected items.
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
                  <div className="text-center">
                    <Percent className="h-8 w-8 mb-4 mx-auto" />
                    <h4 className="text-2xl font-bold mb-2">30% OFF</h4>
                    <p className="text-white/80">Selected Items</p>
                  </div>
                  <div className="text-center">
                    <Gift className="h-8 w-8 mb-4 mx-auto" />
                    <h4 className="text-2xl font-bold mb-2">Free Gift</h4>
                    <p className="text-white/80">Orders over $150</p>
                  </div>
                  <div className="text-center">
                    <Truck className="h-8 w-8 mb-4 mx-auto" />
                    <h4 className="text-2xl font-bold mb-2">Free Shipping</h4>
                    <p className="text-white/80">Worldwide</p>
                  </div>
                  <div className="text-center">
                    <Sparkles className="h-8 w-8 mb-4 mx-auto" />
                    <h4 className="text-2xl font-bold mb-2">New Arrivals</h4>
                    <p className="text-white/80">20% Off</p>
                  </div>
                </div>
                <Button size="lg" className="bg-white text-black hover:bg-white/90">
                  Shop All Deals <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </section>

          {/* Trending Now */}
          <section className="py-24">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <Badge variant="secondary" className="mb-4">Most Popular</Badge>
                <h2 className="text-4xl font-bold mb-4">Trending Now</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Discover what's hot right now. Our most popular pieces loved by fashion enthusiasts worldwide.
                  Each item is carefully selected to ensure you stay ahead of the trends.
                </p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {[
                  {
                    name: "Silk Evening Dress",
                    price: "$299",
                    image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?q=80&w=1476",
                    tag: "Best Seller"
                  },
                  {
                    name: "Designer Handbag",
                    price: "$459",
                    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=1409",
                    tag: "New"
                  },
                  {
                    name: "Premium Denim",
                    price: "$189",
                    image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=1374",
                    tag: "Limited"
                  },
                  {
                    name: "Crystal Necklace",
                    price: "$129",
                    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=1374",
                    tag: "Trending"
                  }
                ].map((item, index) => (
                  <div key={index} className="group cursor-pointer">
                    <div className="relative aspect-[3/4] rounded-xl overflow-hidden mb-4 shadow-lg">
                      <img 
                        src={item.image} 
                        alt={item.name}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <Badge 
                        variant="secondary" 
                        className="absolute top-4 left-4 bg-white/90 text-black"
                      >
                        {item.tag}
                      </Badge>
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="absolute bottom-4 left-4 right-4 flex gap-2">
                          <Button className="flex-1" variant="secondary">Quick View</Button>
                          <Button variant="secondary" size="icon">
                            <Heart className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                    <h4 className="font-medium text-lg mb-1">{item.name}</h4>
                    <p className="text-muted-foreground">{item.price}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Instagram Feed */}
          <section className="py-24 bg-muted/30">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <Badge variant="secondary" className="mb-4">@luxestyle</Badge>
                <h2 className="text-4xl font-bold mb-4">Style Inspiration</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Follow us on Instagram for daily style inspiration and behind-the-scenes content.
                </p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {[
                  "https://images.unsplash.com/photo-1581044777550-4cfa60707c03?q=80&w=1472",
                  "https://images.unsplash.com/photo-1496747611176-843222e1e57c?q=80&w=1473",
                  "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1476",
                  "https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?q=80&w=1495",
                  "https://images.unsplash.com/photo-1566206091558-7f218b696731?q=80&w=1476",
                  "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1470"
                ].map((image, index) => (
                  <div key={index} className="relative aspect-square group cursor-pointer">
                    <img 
                      src={image}
                      alt={`Instagram post ${index + 1}`}
                      className="w-full h-full object-cover rounded-lg"
                    />
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-lg">
                      <Heart className="h-8 w-8 text-white" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </section>
      </main>

      
    </div>
  );
}

export default Home;
