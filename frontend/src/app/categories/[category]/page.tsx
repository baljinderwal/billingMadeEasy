import React from 'react'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { FeaturedProducts } from '@/components/home/featured-products'

const categoryNames: Record<string, string> = {
  'electronics': 'Electronics',
  'fashion': 'Fashion',
  'home-garden': 'Home & Garden',
  'photography': 'Photography',
  'gaming': 'Gaming',
  'books': 'Books'
}

export default function CategoryPage({ params }: { params: { category: string } }) {
  const categoryName = categoryNames[params.category] || 'Category'
  
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h1 className="text-4xl lg:text-5xl font-bold mb-4">{categoryName}</h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Explore our {categoryName.toLowerCase()} collection
              </p>
            </div>
          </div>
        </section>
        <FeaturedProducts />
      </main>
      <Footer />
    </div>
  )
}
