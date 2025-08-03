import React from 'react'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { FeaturedProducts } from '@/components/home/featured-products'
import { Badge } from '@/components/ui/badge'
import { Trophy } from 'lucide-react'

export default function BestsellersPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <section className="py-16 bg-gradient-to-br from-yellow-50 to-amber-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <Badge variant="outline" className="mb-4">
                <Trophy className="h-4 w-4 mr-1" />
                Top Rated
              </Badge>
              <h1 className="text-4xl lg:text-5xl font-bold mb-4">Best Sellers</h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Our most popular products loved by thousands of customers
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
