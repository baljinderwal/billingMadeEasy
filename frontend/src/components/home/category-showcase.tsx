import React from 'react'
import Link from 'next/link'
import { ArrowRight, Smartphone, Shirt, Home, Camera, Gamepad2, Book } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface Category {
  id: string
  name: string
  description: string
  icon: React.ReactNode
  productCount: number
  image: string
  href: string
}

const categories: Category[] = [
  {
    id: '1',
    name: 'Electronics',
    description: 'Latest gadgets and tech',
    icon: <Smartphone className="h-8 w-8" />,
    productCount: 2450,
    image: '/api/placeholder/400/300',
    href: '/categories/electronics',
  },
  {
    id: '2',
    name: 'Fashion',
    description: 'Trendy clothing and accessories',
    icon: <Shirt className="h-8 w-8" />,
    productCount: 3200,
    image: '/api/placeholder/400/300',
    href: '/categories/fashion',
  },
  {
    id: '3',
    name: 'Home & Garden',
    description: 'Everything for your home',
    icon: <Home className="h-8 w-8" />,
    productCount: 1800,
    image: '/api/placeholder/400/300',
    href: '/categories/home-garden',
  },
  {
    id: '4',
    name: 'Photography',
    description: 'Cameras and equipment',
    icon: <Camera className="h-8 w-8" />,
    productCount: 890,
    image: '/api/placeholder/400/300',
    href: '/categories/photography',
  },
  {
    id: '5',
    name: 'Gaming',
    description: 'Games and consoles',
    icon: <Gamepad2 className="h-8 w-8" />,
    productCount: 1200,
    image: '/api/placeholder/400/300',
    href: '/categories/gaming',
  },
  {
    id: '6',
    name: 'Books',
    description: 'Knowledge and entertainment',
    icon: <Book className="h-8 w-8" />,
    productCount: 5600,
    image: '/api/placeholder/400/300',
    href: '/categories/books',
  },
]

export function CategoryShowcase() {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">Shop by Category</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore our diverse range of categories and find exactly what you're looking for.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category) => (
            <Link key={category.id} href={category.href}>
              <div className="group bg-card rounded-xl border shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden cursor-pointer">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center">
                    <div className="text-primary/60">
                      {category.icon}
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="bg-white/90 rounded-full p-2">
                      <ArrowRight className="h-4 w-4 text-primary" />
                    </div>
                  </div>
                </div>

                <div className="p-6 space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
                      {category.name}
                    </h3>
                    <div className="text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                      {category.icon}
                    </div>
                  </div>
                  
                  <p className="text-muted-foreground">
                    {category.description}
                  </p>
                  
                  <div className="flex items-center justify-between pt-2">
                    <span className="text-sm text-muted-foreground">
                      {category.productCount.toLocaleString()} products
                    </span>
                    <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                      Explore
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/categories">
            <Button variant="outline" size="lg">
              View All Categories
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
