import React from 'react'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { TrustIndicators } from '@/components/home/trust-indicators'
import { Button } from '@/components/ui/button'
import { ArrowRight, Users, Award, Globe } from 'lucide-react'
import Link from 'next/link'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h1 className="text-4xl lg:text-6xl font-bold mb-6">About billingMadeEasy</h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                We're revolutionizing e-commerce with our comprehensive, production-ready platform 
                that empowers businesses of all sizes to succeed in the digital marketplace.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
              <div className="space-y-6">
                <h2 className="text-3xl font-bold">Our Mission</h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  To make e-commerce accessible, reliable, and profitable for every business. 
                  We believe that great technology should empower entrepreneurs and enterprises 
                  alike to focus on what they do best - serving their customers.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Our platform combines cutting-edge technology with user-friendly design, 
                  ensuring that you can build, manage, and scale your online business with confidence.
                </p>
                <Link href="/products">
                  <Button size="lg">
                    Explore Our Platform
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </div>
              <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl p-8 lg:p-12">
                <div className="grid grid-cols-1 gap-8">
                  <div className="text-center">
                    <div className="flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mx-auto mb-4">
                      <Users className="h-8 w-8 text-primary" />
                    </div>
                    <div className="text-3xl font-bold text-primary">50K+</div>
                    <div className="text-muted-foreground">Happy Customers</div>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mx-auto mb-4">
                      <Award className="h-8 w-8 text-primary" />
                    </div>
                    <div className="text-3xl font-bold text-primary">99.9%</div>
                    <div className="text-muted-foreground">Uptime Guarantee</div>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mx-auto mb-4">
                      <Globe className="h-8 w-8 text-primary" />
                    </div>
                    <div className="text-3xl font-bold text-primary">Global</div>
                    <div className="text-muted-foreground">Reach & Support</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <TrustIndicators />
      </main>
      <Footer />
    </div>
  )
}
