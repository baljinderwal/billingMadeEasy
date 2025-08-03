'use client'

import React, { useState } from 'react'
import { Plus, Search, Filter, MoreHorizontal, Store, Users, DollarSign, Package } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'

const vendors = [
  {
    id: 1,
    businessName: 'Tech Solutions Inc',
    contactPerson: 'John Doe',
    email: 'john@techsolutions.com',
    phone: '+1234567890',
    kycStatus: 'approved',
    status: 'active',
    totalSales: '$45,230',
    totalOrders: 156,
    commission: '10%',
    rating: 4.8,
    joinedAt: '2024-01-15'
  },
  {
    id: 2,
    businessName: 'Fashion Forward',
    contactPerson: 'Jane Smith',
    email: 'jane@fashionforward.com',
    phone: '+1234567891',
    kycStatus: 'approved',
    status: 'active',
    totalSales: '$32,150',
    totalOrders: 89,
    commission: '12%',
    rating: 4.6,
    joinedAt: '2024-02-20'
  },
  {
    id: 3,
    businessName: 'Home Essentials',
    contactPerson: 'Bob Johnson',
    email: 'bob@homeessentials.com',
    phone: '+1234567892',
    kycStatus: 'under_review',
    status: 'inactive',
    totalSales: '$12,890',
    totalOrders: 34,
    commission: '8%',
    rating: 4.2,
    joinedAt: '2024-03-10'
  }
]

const vendorStats = [
  { label: 'Total Vendors', value: '89', change: '+5 this month', icon: <Store className="h-5 w-5" /> },
  { label: 'Active Vendors', value: '67', change: '+3 this week', icon: <Users className="h-5 w-5" /> },
  { label: 'Total Commission', value: '$12,450', change: '+$1,230 this month', icon: <DollarSign className="h-5 w-5" /> },
  { label: 'Vendor Products', value: '2,156', change: '+89 this week', icon: <Package className="h-5 w-5" /> }
]

const applications = [
  {
    id: 1,
    businessName: 'New Electronics Store',
    contactPerson: 'Alice Brown',
    email: 'alice@newelectronics.com',
    businessType: 'company',
    submittedAt: '2024-03-15',
    status: 'pending'
  },
  {
    id: 2,
    businessName: 'Artisan Crafts',
    contactPerson: 'Charlie Wilson',
    email: 'charlie@artisancrafts.com',
    businessType: 'individual',
    submittedAt: '2024-03-12',
    status: 'under_review'
  }
]

export default function VendorsPage() {
  const [activeTab, setActiveTab] = useState('vendors')

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
      case 'approved':
        return 'bg-green-100 text-green-800'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'under_review':
        return 'bg-blue-100 text-blue-800'
      case 'inactive':
      case 'rejected':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Vendor Management</h1>
          <p className="text-gray-600">Manage vendors, applications, and marketplace operations</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {vendorStats.map((stat, index) => (
            <div key={index} className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-blue-100 text-blue-600 rounded-lg p-2">
                  {stat.icon}
                </div>
              </div>
              <h3 className="text-sm font-medium text-gray-600 mb-1">{stat.label}</h3>
              <p className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</p>
              <p className="text-sm text-green-600">{stat.change}</p>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-lg shadow">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              <button
                onClick={() => setActiveTab('vendors')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'vendors'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Vendors
              </button>
              <button
                onClick={() => setActiveTab('applications')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'applications'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Applications
              </button>
              <button
                onClick={() => setActiveTab('commissions')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'commissions'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Commissions
              </button>
              <button
                onClick={() => setActiveTab('payouts')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'payouts'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Payouts
              </button>
            </nav>
          </div>

          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder={`Search ${activeTab}...`}
                    className="pl-10 w-64"
                  />
                </div>
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
              </div>
              {activeTab === 'vendors' && (
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Invite Vendor
                </Button>
              )}
            </div>

            {activeTab === 'vendors' && (
              <div className="space-y-4">
                {vendors.map((vendor) => (
                  <div key={vendor.id} className="border rounded-lg p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-4">
                        <div className="bg-blue-100 text-blue-600 rounded-lg p-2">
                          <Store className="h-5 w-5" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">{vendor.businessName}</h3>
                          <p className="text-sm text-gray-600">{vendor.contactPerson} • {vendor.email}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge className={getStatusColor(vendor.kycStatus)}>
                          KYC: {vendor.kycStatus}
                        </Badge>
                        <Badge className={getStatusColor(vendor.status)}>
                          {vendor.status}
                        </Badge>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-6 gap-4 text-sm">
                      <div>
                        <p className="text-gray-600">Total Sales</p>
                        <p className="font-medium text-green-600">{vendor.totalSales}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Orders</p>
                        <p className="font-medium">{vendor.totalOrders}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Commission</p>
                        <p className="font-medium">{vendor.commission}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Rating</p>
                        <p className="font-medium">{vendor.rating > 0 ? `${vendor.rating}/5` : 'No ratings'}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Joined</p>
                        <p className="font-medium">{vendor.joinedAt}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Phone</p>
                        <p className="font-medium">{vendor.phone}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'applications' && (
              <div className="space-y-4">
                {applications.map((application) => (
                  <div key={application.id} className="border rounded-lg p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-4">
                        <div className="bg-yellow-100 text-yellow-600 rounded-lg p-2">
                          <Store className="h-5 w-5" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">{application.businessName}</h3>
                          <p className="text-sm text-gray-600">{application.contactPerson} • {application.email}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge className={getStatusColor(application.status)}>
                          {application.status}
                        </Badge>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="text-gray-600">Business Type</p>
                        <p className="font-medium capitalize">{application.businessType}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Submitted</p>
                        <p className="font-medium">{application.submittedAt}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Actions</p>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline">Review</Button>
                          <Button size="sm">Approve</Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'commissions' && (
              <div className="text-center py-12">
                <DollarSign className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Commission Management</h3>
                <p className="text-gray-600 mb-6">Track and manage vendor commissions and payouts</p>
                <Button>View Commission Reports</Button>
              </div>
            )}

            {activeTab === 'payouts' && (
              <div className="text-center py-12">
                <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Payout Management</h3>
                <p className="text-gray-600 mb-6">Process and track vendor payouts</p>
                <Button>Process Payouts</Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
