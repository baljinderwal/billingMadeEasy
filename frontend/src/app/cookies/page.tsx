import React from 'react'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Cookie, Settings, BarChart, Shield } from 'lucide-react'

export default function CookiesPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <div className="flex items-center justify-center w-20 h-20 bg-primary/10 rounded-full mx-auto mb-6">
                <Cookie className="h-10 w-10 text-primary" />
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold mb-4">Cookie Policy</h1>
              <p className="text-lg text-muted-foreground">
                Last updated: January 1, 2025
              </p>
            </div>

            <div className="prose prose-gray max-w-none">
              <div className="bg-card rounded-lg border p-8 mb-8">
                <h2 className="text-2xl font-bold mb-4">What Are Cookies?</h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    Cookies are small text files that are placed on your computer or mobile device when you visit 
                    our website. They help us provide you with a better experience by remembering your preferences 
                    and understanding how you use our site.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-card rounded-lg border p-6 text-center">
                  <div className="flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mx-auto mb-4">
                    <Settings className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">Essential Cookies</h3>
                  <p className="text-sm text-muted-foreground">Required for basic site functionality</p>
                </div>

                <div className="bg-card rounded-lg border p-6 text-center">
                  <div className="flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mx-auto mb-4">
                    <BarChart className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">Analytics Cookies</h3>
                  <p className="text-sm text-muted-foreground">Help us understand site usage</p>
                </div>

                <div className="bg-card rounded-lg border p-6 text-center">
                  <div className="flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mx-auto mb-4">
                    <Shield className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">Security Cookies</h3>
                  <p className="text-sm text-muted-foreground">Protect against fraud and abuse</p>
                </div>
              </div>

              <div className="bg-card rounded-lg border p-8 mb-8">
                <h2 className="text-2xl font-bold mb-4">Types of Cookies We Use</h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Essential Cookies</h3>
                    <p className="text-muted-foreground mb-2">
                      These cookies are necessary for the website to function properly. They enable core functionality 
                      such as security, network management, and accessibility.
                    </p>
                    <ul className="space-y-1 text-sm text-muted-foreground ml-6">
                      <li>• Session management</li>
                      <li>• Shopping cart functionality</li>
                      <li>• User authentication</li>
                      <li>• Security features</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-2">Analytics Cookies</h3>
                    <p className="text-muted-foreground mb-2">
                      These cookies help us understand how visitors interact with our website by collecting and 
                      reporting information anonymously.
                    </p>
                    <ul className="space-y-1 text-sm text-muted-foreground ml-6">
                      <li>• Page views and traffic sources</li>
                      <li>• User behavior patterns</li>
                      <li>• Site performance metrics</li>
                      <li>• Error tracking</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-2">Marketing Cookies</h3>
                    <p className="text-muted-foreground mb-2">
                      These cookies are used to track visitors across websites to display relevant advertisements 
                      and measure campaign effectiveness.
                    </p>
                    <ul className="space-y-1 text-sm text-muted-foreground ml-6">
                      <li>• Personalized advertisements</li>
                      <li>• Social media integration</li>
                      <li>• Campaign tracking</li>
                      <li>• Retargeting</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-card rounded-lg border p-8 mb-8">
                <h2 className="text-2xl font-bold mb-4">Managing Your Cookie Preferences</h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    You can control and manage cookies in various ways. Please note that removing or blocking 
                    cookies can impact your user experience and parts of our website may no longer be fully accessible.
                  </p>
                  <div className="space-y-3">
                    <p><strong>Browser Settings:</strong> Most browsers allow you to control cookies through their settings.</p>
                    <p><strong>Cookie Banner:</strong> You can adjust your preferences using our cookie consent banner.</p>
                    <p><strong>Opt-out Links:</strong> Some third-party services provide direct opt-out mechanisms.</p>
                  </div>
                </div>
              </div>

              <div className="bg-card rounded-lg border p-8">
                <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
                <div className="text-muted-foreground">
                  <p className="mb-4">
                    If you have any questions about our use of cookies, please contact us:
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
