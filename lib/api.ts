/* eslint-disable @typescript-eslint/no-explicit-any */
export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

// Helper function to ensure price is a number
function ensurePriceIsNumber(product: Product): Product {
  const price = typeof product.price === "string" ? parseFloat(product.price) : product.price;
  return {
    ...product,
    price: isNaN(price) ? 0 : price, // Fallback to 0 if price is invalid
  };
}

export async function getProducts(): Promise<Product[]> {
  try {
    const response = await fetch("https://ecommerce-c6014-default-rtdb.firebaseio.com/Products/products.json");

    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }

    const data: Product[] = await response.json(); // Strong typing here
    // Ensure all prices are numbers
    return (data || []).map(ensurePriceIsNumber);
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

export async function getProductById(id: number): Promise<Product | null> {
  try {
    const products = await getProducts();
    return products.find((product) => product.id === id) || null;
  } catch (error) {
    console.error("Error fetching product by ID:", error);
    return null;
  }
}

export async function getProductsByCategory(category: string): Promise<Product[]> {
  try {
    const products = await getProducts();
    return products.filter((product) => product.category.toLowerCase() === category.toLowerCase());
  } catch (error) {
    console.error("Error fetching products by category:", error);
    return [];
  }
}

export async function searchProducts(query: string): Promise<Product[]> {
  try {
    const products = await getProducts();
    const searchTerm = query.toLowerCase();

    return products.filter(
      (product) =>
        product.title.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm) ||
        product.category.toLowerCase().includes(searchTerm),
    );
  } catch (error) {
    console.error("Error searching products:", error);
    return [];
  }
}
