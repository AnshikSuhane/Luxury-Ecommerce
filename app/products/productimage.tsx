'use client';

import Image from "next/image";
import React from "react";

interface ProductImageProps {
  src: string;
  alt: string;
}

const ProductImage = ({ src, alt }: ProductImageProps) => {
  return (
    <Image 
      src={src} 
      alt={alt} 
      fill 
      className="h-full w-full object-contain object-center" 
      onError={(e) => {
        const target = e.target as HTMLImageElement;
        target.src = "/placeholder.svg?height=500&width=500";
      }} 
    />
  );
};

export default ProductImage;