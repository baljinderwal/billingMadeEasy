import React from 'react'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Package, Search, Truck } from 'lucide-react'

export default function TrackOrderPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-12">
              <div className="flex items-center justify-center w-20 h-20 bg-primary/10 rounded-full mx-auto mb-6">
                <Package className="h-10 w-10 text-primary" />
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold mb-4">Track Your Order</h1>
              <p className="text-lg text-muted-foreground">
                Enter your order details below to track your package
              </p>
            </div>

            <div className="bg-card rounded-lg border p-8 mb-8">
              <form className="space-y-6">
                <div className="space-y-2">
                  <label htmlFor="orderNumber" className="text-sm font-medium">
                    Order Number
                  </label>
                  <Input
                    id="orderNumber"
                    placeholder="Enter your order number (e.g., #12345)"
                    className="text-lg py-3"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">
                    Email Address
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter the email used for your order"
                    className="text-lg py-3"
                  />
                </div>

                <Button type="submit" className="w-full" size="lg">
                  <Search className="h-5 w-5 mr-2" />
                  Track Order
                </Button>
              </form>
            </div>

            <div className="bg-muted/30 rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <Truck className="h-6 w-6 mr-2" />
                Need Help?
              </h2>
              <div className="space-y-3 text-sm text-muted-foreground">
                <p>
                  <strong>Can't find your order number?</strong> Check your email confirmation 
                  or account order history.
                </p>
                <p>
                  <strong>Still having trouble?</strong> Contact our customer support team 
                  at support@billingmadeeasy.com or call +1 (555) 123-4567.
                </p>
                <p>
                  <strong>Order processing:</strong> Orders typically ship within 1-2 business days 
                  and you'll receive tracking information via email.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
