import React from 'react'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { FileText, Scale, AlertTriangle, CheckCircle } from 'lucide-react'

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <div className="flex items-center justify-center w-20 h-20 bg-primary/10 rounded-full mx-auto mb-6">
                <Scale className="h-10 w-10 text-primary" />
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold mb-4">Terms of Service</h1>
              <p className="text-lg text-muted-foreground">
                Last updated: January 1, 2025
              </p>
            </div>

            <div className="prose prose-gray max-w-none">
              <div className="bg-card rounded-lg border p-8 mb-8">
                <h2 className="text-2xl font-bold mb-4 flex items-center">
                  <FileText className="h-6 w-6 mr-2" />
                  Agreement to Terms
                </h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    By accessing and using billingMadeEasy, you accept and agree to be bound by the terms 
                    and provision of this agreement. If you do not agree to abide by the above, please do 
                    not use this service.
                  </p>
                </div>
              </div>

              <div className="bg-card rounded-lg border p-8 mb-8">
                <h2 className="text-2xl font-bold mb-4 flex items-center">
                  <CheckCircle className="h-6 w-6 mr-2" />
                  Use License
                </h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    Permission is granted to temporarily download one copy of the materials on billingMadeEasy's 
                    website for personal, non-commercial transitory viewing only.
                  </p>
                  <p>This is the grant of a license, not a transfer of title, and under this license you may not:</p>
                  <ul className="space-y-2 ml-6">
                    <li>• Modify or copy the materials</li>
                    <li>• Use the materials for any commercial purpose or for any public display</li>
                    <li>• Attempt to reverse engineer any software contained on the website</li>
                    <li>• Remove any copyright or other proprietary notations from the materials</li>
                  </ul>
                </div>
              </div>

              <div className="bg-card rounded-lg border p-8 mb-8">
                <h2 className="text-2xl font-bold mb-4">Account Terms</h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>When you create an account with us, you must provide information that is accurate, complete, and current at all times.</p>
                  <ul className="space-y-2 ml-6">
                    <li>• You are responsible for safeguarding your password</li>
                    <li>• You must not share your account with others</li>
                    <li>• You must notify us immediately of any unauthorized use</li>
                    <li>• We reserve the right to terminate accounts that violate these terms</li>
                  </ul>
                </div>
              </div>

              <div className="bg-card rounded-lg border p-8 mb-8">
                <h2 className="text-2xl font-bold mb-4">Payment Terms</h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>All purchases are subject to the following terms:</p>
                  <ul className="space-y-2 ml-6">
                    <li>• Payment is due at the time of purchase</li>
                    <li>• We accept major credit cards and other payment methods as displayed</li>
                    <li>• Prices are subject to change without notice</li>
                    <li>• All sales are final unless otherwise stated in our return policy</li>
                    <li>• We reserve the right to refuse or cancel orders</li>
                  </ul>
                </div>
              </div>

              <div className="bg-card rounded-lg border p-8 mb-8">
                <h2 className="text-2xl font-bold mb-4 flex items-center">
                  <AlertTriangle className="h-6 w-6 mr-2" />
                  Disclaimer
                </h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    The materials on billingMadeEasy's website are provided on an 'as is' basis. billingMadeEasy 
                    makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties 
                    including without limitation, implied warranties or conditions of merchantability, fitness for a 
                    particular purpose, or non-infringement of intellectual property or other violation of rights.
                  </p>
                </div>
              </div>

              <div className="bg-card rounded-lg border p-8">
                <h2 className="text-2xl font-bold mb-4">Contact Information</h2>
                <div className="text-muted-foreground">
                  <p className="mb-4">
                    If you have any questions about these Terms of Service, please contact us:
                  </p>
                  <div className="space-y-2">
                    <p>Email: legal@billingmadeeasy.com</p>
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
