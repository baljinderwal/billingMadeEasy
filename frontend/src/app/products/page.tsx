import React from 'react'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { FeaturedProducts } from '@/components/home/featured-products'

export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h1 className="text-4xl lg:text-5xl font-bold mb-4">All Products</h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Discover our complete collection of premium products
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
