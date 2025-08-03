import React from 'react'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { FeaturedProducts } from '@/components/home/featured-products'
import { Badge } from '@/components/ui/badge'
import { Timer, Percent } from 'lucide-react'

export default function DealsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <section className="py-16 bg-gradient-to-br from-red-50 to-orange-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <Badge variant="destructive" className="mb-4">
                <Percent className="h-4 w-4 mr-1" />
                Limited Time Offers
              </Badge>
              <h1 className="text-4xl lg:text-5xl font-bold mb-4">Special Deals</h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Don't miss out on these amazing discounts and special offers
              </p>
              <div className="flex items-center justify-center mt-6 space-x-2 text-sm text-muted-foreground">
                <Timer className="h-4 w-4" />
                <span>Deals refresh daily - Check back often!</span>
              </div>
            </div>
          </div>
        </section>
        <FeaturedProducts />
      </main>
      <Footer />
    </div>
  )
}
