import React from 'react'
import { Shield, Truck, CreditCard, Headphones, Award, Users } from 'lucide-react'

interface TrustIndicator {
  icon: React.ReactNode
  title: string
  description: string
}

const trustIndicators: TrustIndicator[] = [
  {
    icon: <Shield className="h-8 w-8 text-green-600" />,
    title: 'Secure Shopping',
    description: 'Your data is protected with enterprise-grade security and SSL encryption.',
  },
  {
    icon: <Truck className="h-8 w-8 text-blue-600" />,
    title: 'Fast Delivery',
    description: 'Free shipping on orders over $50. Express delivery available.',
  },
  {
    icon: <CreditCard className="h-8 w-8 text-purple-600" />,
    title: 'Flexible Payments',
    description: 'Multiple payment options including cards, UPI, wallets, and BNPL.',
  },
  {
    icon: <Headphones className="h-8 w-8 text-orange-600" />,
    title: '24/7 Support',
    description: 'Round-the-clock customer support via chat, email, and phone.',
  },
  {
    icon: <Award className="h-8 w-8 text-yellow-600" />,
    title: 'Quality Guarantee',
    description: '30-day return policy and quality assurance on all products.',
  },
  {
    icon: <Users className="h-8 w-8 text-indigo-600" />,
    title: 'Trusted by Thousands',
    description: 'Join over 50,000 satisfied customers who trust our platform.',
  },
]

export function TrustIndicators() {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">Why Choose Us?</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We're committed to providing you with the best shopping experience possible.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {trustIndicators.map((indicator, index) => (
            <div
              key={index}
              className="group text-center p-6 rounded-lg border bg-card hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-center justify-center w-16 h-16 bg-muted rounded-full mx-auto mb-4 group-hover:scale-110 transition-transform">
                {indicator.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3">{indicator.title}</h3>
              <p className="text-muted-foreground leading-relaxed">
                {indicator.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-gradient-to-r from-primary/10 via-secondary/10 to-primary/10 rounded-2xl p-8 lg:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 text-center">
            <div className="space-y-2">
              <div className="text-3xl lg:text-4xl font-bold text-primary">50K+</div>
              <div className="text-muted-foreground">Happy Customers</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl lg:text-4xl font-bold text-primary">10K+</div>
              <div className="text-muted-foreground">Products Available</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl lg:text-4xl font-bold text-primary">99.9%</div>
              <div className="text-muted-foreground">Uptime Guarantee</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl lg:text-4xl font-bold text-primary">4.9/5</div>
              <div className="text-muted-foreground">Customer Rating</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
