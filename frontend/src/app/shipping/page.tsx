import React from 'react'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Truck, Clock, Globe, Shield } from 'lucide-react'

export default function ShippingPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl lg:text-5xl font-bold mb-4">Shipping Information</h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Fast, reliable shipping options to get your orders to you quickly and safely
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              <div className="text-center p-6 bg-card rounded-lg border">
                <div className="flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mx-auto mb-4">
                  <Truck className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Free Shipping</h3>
                <p className="text-sm text-muted-foreground">On orders over $50</p>
              </div>

              <div className="text-center p-6 bg-card rounded-lg border">
                <div className="flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mx-auto mb-4">
                  <Clock className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Fast Delivery</h3>
                <p className="text-sm text-muted-foreground">3-5 business days</p>
              </div>

              <div className="text-center p-6 bg-card rounded-lg border">
                <div className="flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mx-auto mb-4">
                  <Globe className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Worldwide</h3>
                <p className="text-sm text-muted-foreground">International shipping</p>
              </div>

              <div className="text-center p-6 bg-card rounded-lg border">
                <div className="flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mx-auto mb-4">
                  <Shield className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Secure</h3>
                <p className="text-sm text-muted-foreground">Package protection</p>
              </div>
            </div>

            <div className="space-y-8">
              <div className="bg-card rounded-lg border p-8">
                <h2 className="text-2xl font-bold mb-4">Shipping Options</h2>
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-3 border-b">
                    <div>
                      <h3 className="font-semibold">Standard Shipping</h3>
                      <p className="text-sm text-muted-foreground">3-5 business days</p>
                    </div>
                    <span className="font-semibold">Free on orders $50+</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b">
                    <div>
                      <h3 className="font-semibold">Express Shipping</h3>
                      <p className="text-sm text-muted-foreground">1-2 business days</p>
                    </div>
                    <span className="font-semibold">$9.99</span>
                  </div>
                  <div className="flex justify-between items-center py-3">
                    <div>
                      <h3 className="font-semibold">Overnight Shipping</h3>
                      <p className="text-sm text-muted-foreground">Next business day</p>
                    </div>
                    <span className="font-semibold">$19.99</span>
                  </div>
                </div>
              </div>

              <div className="bg-card rounded-lg border p-8">
                <h2 className="text-2xl font-bold mb-4">International Shipping</h2>
                <p className="text-muted-foreground mb-4">
                  We ship to most countries worldwide. International shipping rates and delivery times vary by destination.
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Delivery times: 7-21 business days depending on location</li>
                  <li>• Customs duties and taxes may apply</li>
                  <li>• Free international shipping on orders over $100</li>
                  <li>• Tracking available for all international orders</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
