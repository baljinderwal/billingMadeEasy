'use client'

import React, { useState } from 'react'
import { Mail, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export function NewsletterSignup() {
  const [email, setEmail] = useState('')
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setIsLoading(true)
    
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    setIsSubscribed(true)
    setIsLoading(false)
    setEmail('')
  }

  if (isSubscribed) {
    return (
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <div className="flex items-center justify-center w-16 h-16 bg-green-500 rounded-full mx-auto mb-6">
              <CheckCircle className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold mb-4">Thank You!</h2>
            <p className="text-lg opacity-90">
              You've successfully subscribed to our newsletter. Get ready for exclusive deals and updates!
            </p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          <div className="flex items-center justify-center w-16 h-16 bg-primary-foreground/10 rounded-full mx-auto mb-6">
            <Mail className="h-8 w-8" />
          </div>
          
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Stay in the Loop
          </h2>
          
          <p className="text-lg opacity-90 mb-8">
            Subscribe to our newsletter and be the first to know about new products, 
            exclusive deals, and special offers.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-1 bg-primary-foreground text-foreground"
            />
            <Button
              type="submit"
              disabled={isLoading}
              variant="secondary"
              className="sm:w-auto"
            >
              {isLoading ? 'Subscribing...' : 'Subscribe'}
            </Button>
          </form>

          <p className="text-sm opacity-75 mt-4">
            We respect your privacy. Unsubscribe at any time.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-12 pt-8 border-t border-primary-foreground/20">
            <div className="text-center">
              <div className="text-2xl font-bold">Weekly</div>
              <div className="text-sm opacity-75">New Product Updates</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">Exclusive</div>
              <div className="text-sm opacity-75">Subscriber-Only Deals</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">Early</div>
              <div className="text-sm opacity-75">Access to Sales</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
