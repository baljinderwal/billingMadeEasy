import React from 'react'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { RotateCcw, Calendar, CheckCircle, XCircle } from 'lucide-react'

export default function ReturnsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl lg:text-5xl font-bold mb-4">Returns & Exchanges</h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                We want you to be completely satisfied with your purchase. Easy returns within 30 days.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <div className="text-center p-6 bg-card rounded-lg border">
                <div className="flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mx-auto mb-4">
                  <Calendar className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">30-Day Window</h3>
                <p className="text-sm text-muted-foreground">Return items within 30 days of delivery</p>
              </div>

              <div className="text-center p-6 bg-card rounded-lg border">
                <div className="flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mx-auto mb-4">
                  <RotateCcw className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Easy Process</h3>
                <p className="text-sm text-muted-foreground">Simple online return process</p>
              </div>

              <div className="text-center p-6 bg-card rounded-lg border">
                <div className="flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mx-auto mb-4">
                  <CheckCircle className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Full Refund</h3>
                <p className="text-sm text-muted-foreground">Get your money back quickly</p>
              </div>
            </div>

            <div className="space-y-8">
              <div className="bg-card rounded-lg border p-8">
                <h2 className="text-2xl font-bold mb-4">Return Policy</h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    We offer a 30-day return policy for most items. Items must be returned in their original condition 
                    with all tags attached and in original packaging.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                    <div>
                      <h3 className="font-semibold text-foreground mb-2 flex items-center">
                        <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                        Returnable Items
                      </h3>
                      <ul className="space-y-1 text-sm">
                        <li>• Clothing with tags attached</li>
                        <li>• Electronics in original packaging</li>
                        <li>• Home goods in new condition</li>
                        <li>• Books and media</li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-2 flex items-center">
                        <XCircle className="h-5 w-5 text-red-600 mr-2" />
                        Non-Returnable Items
                      </h3>
                      <ul className="space-y-1 text-sm">
                        <li>• Personalized items</li>
                        <li>• Perishable goods</li>
                        <li>• Intimate apparel</li>
                        <li>• Digital downloads</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-card rounded-lg border p-8">
                <h2 className="text-2xl font-bold mb-4">How to Return</h2>
                <div className="space-y-4">
                  <div className="flex items-start space-x-4">
                    <div className="flex items-center justify-center w-8 h-8 bg-primary text-primary-foreground rounded-full text-sm font-semibold">
                      1
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Start Your Return</h3>
                      <p className="text-sm text-muted-foreground">
                        Log into your account and select the order you want to return
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="flex items-center justify-center w-8 h-8 bg-primary text-primary-foreground rounded-full text-sm font-semibold">
                      2
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Print Return Label</h3>
                      <p className="text-sm text-muted-foreground">
                        We'll email you a prepaid return shipping label
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="flex items-center justify-center w-8 h-8 bg-primary text-primary-foreground rounded-full text-sm font-semibold">
                      3
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Ship It Back</h3>
                      <p className="text-sm text-muted-foreground">
                        Package your items and drop them off at any shipping location
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="flex items-center justify-center w-8 h-8 bg-primary text-primary-foreground rounded-full text-sm font-semibold">
                      4
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Get Your Refund</h3>
                      <p className="text-sm text-muted-foreground">
                        Refunds are processed within 3-5 business days after we receive your return
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
