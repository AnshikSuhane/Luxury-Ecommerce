import Image from "next/image";
import Link from "next/link";
import { Badge } from "../ui/badge";


interface Product {
  id: string
  name: string
  price: string
  images: string[]
  isNew?: boolean
}

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
    return (
        <Link href={`/products/${product.id}`} className="group">
            <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                <div className="relative h-72">
                    <Image
                        src={product.images[0] || "/placeholder.svg"}
                        alt={product.name}
                        fill
                        className="h-full w-full object-cover object-center group-hover:opacity-75"
                    />
                    {product.isNew && <Badge className="absolute top-2 right-2">New</Badge>}
                </div>
            </div>
            <h3 className="mt-4 text-sm text-gray-700">{product.name}</h3>
            <p className="mt-1 text-lg font-medium text-gray-900">{product.price}</p>
        </Link>
    );
}