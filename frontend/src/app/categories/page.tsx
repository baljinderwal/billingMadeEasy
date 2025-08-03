import React from 'react'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { CategoryShowcase } from '@/components/home/category-showcase'

export default function CategoriesPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h1 className="text-4xl lg:text-5xl font-bold mb-4">All Categories</h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Browse our diverse range of product categories
              </p>
            </div>
          </div>
        </section>
        <CategoryShowcase />
      </main>
      <Footer />
    </div>
  )
}
