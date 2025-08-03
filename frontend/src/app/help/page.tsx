import React from 'react'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search, MessageCircle, Phone, Mail, Clock } from 'lucide-react'
import Link from 'next/link'

const faqItems = [
  {
    question: 'How do I track my order?',
    answer: 'You can track your order by visiting the "Track Order" page and entering your order number and email address.'
  },
  {
    question: 'What is your return policy?',
    answer: 'We offer a 30-day return policy for most items. Items must be in original condition with tags attached.'
  },
  {
    question: 'How long does shipping take?',
    answer: 'Standard shipping takes 3-5 business days. Express shipping is available for 1-2 business days.'
  },
  {
    question: 'Do you ship internationally?',
    answer: 'Yes, we ship to most countries worldwide. Shipping costs and delivery times vary by location.'
  },
  {
    question: 'How can I change or cancel my order?',
    answer: 'Orders can be modified or cancelled within 1 hour of placement. Contact customer service for assistance.'
  }
]

export default function HelpPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl lg:text-5xl font-bold mb-4">Help Center</h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Find answers to common questions or get in touch with our support team
              </p>
            </div>

            <div className="mb-12">
              <div className="relative max-w-2xl mx-auto">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  placeholder="Search for help topics..."
                  className="pl-12 py-6 text-lg"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
              <Link href="/contact">
                <div className="bg-card rounded-lg border p-6 text-center hover:shadow-lg transition-shadow cursor-pointer">
                  <div className="flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mx-auto mb-4">
                    <MessageCircle className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Live Chat</h3>
                  <p className="text-muted-foreground">
                    Chat with our support team in real-time
                  </p>
                </div>
              </Link>

              <Link href="/contact">
                <div className="bg-card rounded-lg border p-6 text-center hover:shadow-lg transition-shadow cursor-pointer">
                  <div className="flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mx-auto mb-4">
                    <Phone className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Phone Support</h3>
                  <p className="text-muted-foreground">
                    Call us at +1 (555) 123-4567
                  </p>
                </div>
              </Link>

              <Link href="/contact">
                <div className="bg-card rounded-lg border p-6 text-center hover:shadow-lg transition-shadow cursor-pointer">
                  <div className="flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mx-auto mb-4">
                    <Mail className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Email Support</h3>
                  <p className="text-muted-foreground">
                    Send us an email and we'll respond within 24 hours
                  </p>
                </div>
              </Link>
            </div>

            <div className="mb-12">
              <h2 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
              <div className="space-y-4">
                {faqItems.map((item, index) => (
                  <div key={index} className="bg-card rounded-lg border p-6">
                    <h3 className="text-lg font-semibold mb-2">{item.question}</h3>
                    <p className="text-muted-foreground">{item.answer}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-primary/5 rounded-lg p-8 text-center">
              <Clock className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-2">Support Hours</h3>
              <p className="text-muted-foreground mb-4">
                Monday - Friday: 9:00 AM - 8:00 PM EST<br />
                Saturday - Sunday: 10:00 AM - 6:00 PM EST
              </p>
              <Link href="/contact">
                <Button size="lg">Contact Support</Button>
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
