'use client'

import React from 'react'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Star, ShoppingCart, Heart } from 'lucide-react'
import { useCart } from '@/hooks/use-cart'
import { cn, formatPrice } from '@/lib/utils'

const featuredProducts = [
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
    description: 'Experience crystal-clear audio with our premium wireless headphones featuring noise cancellation and 30-hour battery life.',
  },
  {
    id: '2',
    name: 'Smart Fitness Watch',
    price: 199,
    originalPrice: 249,
    rating: 4.6,
    reviewCount: 892,
    image: '/api/placeholder/300/300',
    category: 'Electronics',
    isNew: true,
    description: 'Track your fitness goals with this advanced smartwatch featuring heart rate monitoring, GPS, and water resistance.',
  },
  {
    id: '3',
    name: 'Organic Cotton T-Shirt',
    price: 29,
    originalPrice: 39,
    rating: 4.9,
    reviewCount: 567,
    image: '/api/placeholder/300/300',
    category: 'Fashion',
    isBestseller: true,
    description: 'Comfortable and sustainable organic cotton t-shirt available in multiple colors and sizes.',
  },
  {
    id: '4',
    name: 'Professional Camera Lens',
    price: 899,
    originalPrice: 1199,
    rating: 4.7,
    reviewCount: 234,
    image: '/api/placeholder/300/300',
    category: 'Photography',
    description: 'Professional-grade camera lens with superior optics for stunning photography results.',
  },
  {
    id: '5',
    name: 'Gaming Mechanical Keyboard',
    price: 149,
    originalPrice: 199,
    rating: 4.8,
    reviewCount: 1456,
    image: '/api/placeholder/300/300',
    category: 'Gaming',
    isNew: true,
    description: 'High-performance mechanical keyboard with RGB lighting and customizable keys for gaming enthusiasts.',
  },
  {
    id: '6',
    name: 'Home Aromatherapy Diffuser',
    price: 79,
    originalPrice: 99,
    rating: 4.5,
    reviewCount: 678,
    image: '/api/placeholder/300/300',
    category: 'Home & Garden',
    description: 'Create a relaxing atmosphere with this ultrasonic aromatherapy diffuser featuring multiple timer settings.',
  },
]

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const { addToCart } = useCart()
  const product = featuredProducts.find(p => p.id === params.id) || featuredProducts[0]

  const handleAddToCart = () => {
    addToCart({ productId: product.id, quantity: 1 })
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
              <ShoppingCart className="h-32 w-32 text-gray-400" />
            </div>
            <div className="space-y-6">
              <div>
                <Badge variant="secondary">{product.category}</Badge>
                {product.isBestseller && (
                  <Badge variant="default" className="ml-2">Bestseller</Badge>
                )}
                {product.isNew && (
                  <Badge variant="outline" className="ml-2">New</Badge>
                )}
                <h1 className="text-3xl font-bold mt-2">{product.name}</h1>
                <div className="flex items-center space-x-2 mt-4">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={cn(
                          "h-5 w-5",
                          i < Math.floor(product.rating) 
                            ? "fill-yellow-400 text-yellow-400" 
                            : "text-gray-300"
                        )} 
                      />
                    ))}
                  </div>
                  <span>{product.rating} ({product.reviewCount} reviews)</span>
                </div>
              </div>
              
              <p className="text-muted-foreground leading-relaxed">
                {product.description}
              </p>
              
              <div className="space-y-2">
                <div className="flex items-center space-x-4">
                  <span className="text-3xl font-bold text-primary">{formatPrice(product.price)}</span>
                  {product.originalPrice && (
                    <span className="text-xl text-muted-foreground line-through">{formatPrice(product.originalPrice)}</span>
                  )}
                </div>
              </div>
              
              <div className="flex space-x-4">
                <Button size="lg" onClick={handleAddToCart}>
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  Add to Cart
                </Button>
                <Button variant="outline" size="lg">
                  <Heart className="h-5 w-5 mr-2" />
                  Add to Wishlist
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
