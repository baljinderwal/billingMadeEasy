import React, { Suspense } from 'react'
import { HeroSection } from '@/components/home/hero-section'
import { FeaturedProducts } from '@/components/home/featured-products'
import { CategoryShowcase } from '@/components/home/category-showcase'
import { TrustIndicators } from '@/components/home/trust-indicators'
import { NewsletterSignup } from '@/components/home/newsletter-signup'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { LoadingSpinner } from '@/components/ui/loading-spinner'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <Suspense fallback={<LoadingSpinner />}>
          <FeaturedProducts />
        </Suspense>
        <CategoryShowcase />
        <TrustIndicators />
        <NewsletterSignup />
      </main>
      <Footer />
    </div>
  )
}
