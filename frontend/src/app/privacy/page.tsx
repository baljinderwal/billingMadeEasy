import React from 'react'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Shield, Eye, Lock, Users } from 'lucide-react'

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <div className="flex items-center justify-center w-20 h-20 bg-primary/10 rounded-full mx-auto mb-6">
                <Shield className="h-10 w-10 text-primary" />
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold mb-4">Privacy Policy</h1>
              <p className="text-lg text-muted-foreground">
                Last updated: January 1, 2025
              </p>
            </div>

            <div className="prose prose-gray max-w-none">
              <div className="bg-card rounded-lg border p-8 mb-8">
                <h2 className="text-2xl font-bold mb-4 flex items-center">
                  <Eye className="h-6 w-6 mr-2" />
                  Information We Collect
                </h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    We collect information you provide directly to us, such as when you create an account, 
                    make a purchase, or contact us for support.
                  </p>
                  <ul className="space-y-2 ml-6">
                    <li>• Personal information (name, email, phone number)</li>
                    <li>• Billing and shipping addresses</li>
                    <li>• Payment information (processed securely by our payment partners)</li>
                    <li>• Order history and preferences</li>
                    <li>• Communications with customer service</li>
                  </ul>
                </div>
              </div>

              <div className="bg-card rounded-lg border p-8 mb-8">
                <h2 className="text-2xl font-bold mb-4 flex items-center">
                  <Users className="h-6 w-6 mr-2" />
                  How We Use Your Information
                </h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>We use the information we collect to:</p>
                  <ul className="space-y-2 ml-6">
                    <li>• Process and fulfill your orders</li>
                    <li>• Provide customer service and support</li>
                    <li>• Send you order confirmations and shipping updates</li>
                    <li>• Improve our products and services</li>
                    <li>• Send promotional emails (with your consent)</li>
                    <li>• Prevent fraud and ensure security</li>
                  </ul>
                </div>
              </div>

              <div className="bg-card rounded-lg border p-8 mb-8">
                <h2 className="text-2xl font-bold mb-4 flex items-center">
                  <Lock className="h-6 w-6 mr-2" />
                  Information Security
                </h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    We take the security of your personal information seriously and use industry-standard 
                    measures to protect it:
                  </p>
                  <ul className="space-y-2 ml-6">
                    <li>• SSL encryption for all data transmission</li>
                    <li>• Secure payment processing through certified partners</li>
                    <li>• Regular security audits and updates</li>
                    <li>• Limited access to personal information by employees</li>
                    <li>• Secure data storage with backup and recovery systems</li>
                  </ul>
                </div>
              </div>

              <div className="bg-card rounded-lg border p-8 mb-8">
                <h2 className="text-2xl font-bold mb-4">Your Rights</h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>You have the right to:</p>
                  <ul className="space-y-2 ml-6">
                    <li>• Access your personal information</li>
                    <li>• Correct inaccurate information</li>
                    <li>• Delete your account and personal data</li>
                    <li>• Opt out of marketing communications</li>
                    <li>• Request a copy of your data</li>
                  </ul>
                  <p className="mt-4">
                    To exercise these rights, please contact us at privacy@billingmadeeasy.com
                  </p>
                </div>
              </div>

              <div className="bg-card rounded-lg border p-8">
                <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
                <div className="text-muted-foreground">
                  <p className="mb-4">
                    If you have any questions about this Privacy Policy, please contact us:
                  </p>
                  <div className="space-y-2">
                    <p>Email: privacy@billingmadeeasy.com</p>
                    <p>Phone: +1 (555) 123-4567</p>
                    <p>Address: 123 Commerce Street, Business City, BC 12345</p>
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
