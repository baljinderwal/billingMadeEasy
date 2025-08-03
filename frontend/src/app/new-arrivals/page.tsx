import React from 'react'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { FeaturedProducts } from '@/components/home/featured-products'
import { Badge } from '@/components/ui/badge'
import { Sparkles } from 'lucide-react'

export default function NewArrivalsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <section className="py-16 bg-gradient-to-br from-blue-50 to-indigo-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <Badge variant="outline" className="mb-4">
                <Sparkles className="h-4 w-4 mr-1" />
                Fresh Arrivals
              </Badge>
              <h1 className="text-4xl lg:text-5xl font-bold mb-4">New Arrivals</h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Discover the latest products that just arrived in our store
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
