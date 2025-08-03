'use client'

import React from 'react'
import Link from 'next/link'
import { Star, ShoppingCart, Heart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useCart } from '@/hooks/use-cart'
import { formatPrice } from '@/lib/utils'

interface Product {
  id: string
  name: string
  price: number
  originalPrice?: number
  rating: number
  reviewCount: number
  image: string
  category: string
  isNew?: boolean
  isBestseller?: boolean
}

const featuredProducts: Product[] = [
  {
    id: '1',
    name: 'Premium Wireless Headphones',
    price: 299,
    originalPrice: 399,
    rating: 4.8,
    reviewCount: 1234,
    image: '/api/placeholder/300/300',
    category: 'Electronics',
    isBestseller: true,
  },
  {
    id: '2',
    name: 'Smart Fitness Watch',
    price: 199,
    rating: 4.6,
    reviewCount: 856,
    image: '/api/placeholder/300/300',
    category: 'Wearables',
    isNew: true,
  },
  {
    id: '3',
    name: 'Organic Cotton T-Shirt',
    price: 29,
    originalPrice: 39,
    rating: 4.9,
    reviewCount: 432,
    image: '/api/placeholder/300/300',
    category: 'Fashion',
  },
  {
    id: '4',
    name: 'Professional Camera Lens',
    price: 899,
    rating: 4.7,
    reviewCount: 267,
    image: '/api/placeholder/300/300',
    category: 'Photography',
    isBestseller: true,
  },
  {
    id: '5',
    name: 'Ergonomic Office Chair',
    price: 449,
    originalPrice: 599,
    rating: 4.5,
    reviewCount: 189,
    image: '/api/placeholder/300/300',
    category: 'Furniture',
  },
  {
    id: '6',
    name: 'Wireless Charging Pad',
    price: 49,
    rating: 4.4,
    reviewCount: 678,
    image: '/api/placeholder/300/300',
    category: 'Accessories',
    isNew: true,
  },
]

export function FeaturedProducts() {
  const { addToCart, isAddingToCart } = useCart()

  const handleAddToCart = (product: Product) => {
    addToCart({
      productId: product.id,
      quantity: 1,
    })
  }

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">Featured Products</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover our handpicked selection of premium products, carefully chosen for quality and value.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProducts.map((product) => (
            <div
              key={product.id}
              className="group bg-card rounded-lg border shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden"
            >
              <div className="relative aspect-square overflow-hidden">
                <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                  <ShoppingCart className="h-16 w-16 text-gray-400" />
                </div>
                
                <div className="absolute top-3 left-3 flex flex-col gap-2">
                  {product.isNew && (
                    <Badge variant="default" className="bg-green-500">
                      New
                    </Badge>
                  )}
                  {product.isBestseller && (
                    <Badge variant="default" className="bg-orange-500">
                      Bestseller
                    </Badge>
                  )}
                  {product.originalPrice && (
                    <Badge variant="destructive">
                      {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                    </Badge>
                  )}
                </div>

                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity bg-white/80 hover:bg-white"
                >
                  <Heart className="h-4 w-4" />
                </Button>

                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
              </div>

              <div className="p-6 space-y-4">
                <div className="space-y-2">
                  <div className="text-sm text-muted-foreground">{product.category}</div>
                  <Link href={`/products/${product.id}`}>
                    <h3 className="font-semibold text-lg hover:text-primary transition-colors line-clamp-2">
                      {product.name}
                    </h3>
                  </Link>
                </div>

                <div className="flex items-center space-x-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < Math.floor(product.rating)
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {product.rating} ({product.reviewCount})
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl font-bold text-primary">
                        {formatPrice(product.price)}
                      </span>
                      {product.originalPrice && (
                        <span className="text-sm text-muted-foreground line-through">
                          {formatPrice(product.originalPrice)}
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <Button
                    onClick={() => handleAddToCart(product)}
                    disabled={isAddingToCart}
                    size="sm"
                  >
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Add to Cart
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/products">
            <Button variant="outline" size="lg">
              View All Products
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
