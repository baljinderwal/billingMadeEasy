'use client'

import React from 'react'
import Link from 'next/link'
import { BarChart3, Users, ShoppingBag, DollarSign, TrendingUp, Package, Bell, Settings } from 'lucide-react'
import { Button } from '@/components/ui/button'

const adminModules = [
  {
    title: 'Dashboard',
    description: 'Real-time analytics and KPIs',
    icon: <BarChart3 className="h-8 w-8" />,
    href: '/admin/dashboard',
    color: 'bg-blue-500'
  },
  {
    title: 'Marketing',
    description: 'Campaigns, promotions, and referrals',
    icon: <TrendingUp className="h-8 w-8" />,
    href: '/admin/marketing',
    color: 'bg-green-500'
  },
  {
    title: 'Vendors',
    description: 'Multi-vendor marketplace management',
    icon: <Users className="h-8 w-8" />,
    href: '/admin/vendors',
    color: 'bg-purple-500'
  },
  {
    title: 'Analytics',
    description: 'Advanced reporting and insights',
    icon: <BarChart3 className="h-8 w-8" />,
    href: '/admin/analytics',
    color: 'bg-orange-500'
  },
  {
    title: 'Products',
    description: 'Product catalog management',
    icon: <Package className="h-8 w-8" />,
    href: '/admin/products',
    color: 'bg-indigo-500'
  },
  {
    title: 'Orders',
    description: 'Order management and fulfillment',
    icon: <ShoppingBag className="h-8 w-8" />,
    href: '/admin/orders',
    color: 'bg-red-500'
  },
  {
    title: 'Notifications',
    description: 'Communication and alerts',
    icon: <Bell className="h-8 w-8" />,
    href: '/admin/notifications',
    color: 'bg-yellow-500'
  },
  {
    title: 'Settings',
    description: 'System configuration',
    icon: <Settings className="h-8 w-8" />,
    href: '/admin/settings',
    color: 'bg-gray-500'
  }
]

const quickStats = [
  { label: 'Total Revenue', value: '$124,563', change: '+12.5%', positive: true },
  { label: 'Total Orders', value: '1,234', change: '+8.2%', positive: true },
  { label: 'Active Vendors', value: '89', change: '+15.3%', positive: true },
  { label: 'Conversion Rate', value: '3.2%', change: '-2.1%', positive: false }
]

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Manage your e-commerce platform with comprehensive admin tools</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {quickStats.map((stat, index) => (
            <div key={index} className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <div className={`text-sm font-medium ${stat.positive ? 'text-green-600' : 'text-red-600'}`}>
                  {stat.change}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {adminModules.map((module, index) => (
            <Link key={index} href={module.href}>
              <div className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow p-6 cursor-pointer group">
                <div className={`${module.color} text-white rounded-lg p-3 w-fit mb-4 group-hover:scale-110 transition-transform`}>
                  {module.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{module.title}</h3>
                <p className="text-gray-600 text-sm">{module.description}</p>
                <div className="mt-4">
                  <Button variant="outline" size="sm" className="w-full">
                    Access Module
                  </Button>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-12 bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Activity</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between py-3 border-b">
              <div className="flex items-center space-x-3">
                <div className="bg-green-100 text-green-600 rounded-full p-2">
                  <DollarSign className="h-4 w-4" />
                </div>
                <div>
                  <p className="font-medium">New order received</p>
                  <p className="text-sm text-gray-600">Order #12345 - $299.99</p>
                </div>
              </div>
              <span className="text-sm text-gray-500">2 minutes ago</span>
            </div>
            <div className="flex items-center justify-between py-3 border-b">
              <div className="flex items-center space-x-3">
                <div className="bg-blue-100 text-blue-600 rounded-full p-2">
                  <Users className="h-4 w-4" />
                </div>
                <div>
                  <p className="font-medium">New vendor application</p>
                  <p className="text-sm text-gray-600">Tech Solutions Inc applied</p>
                </div>
              </div>
              <span className="text-sm text-gray-500">15 minutes ago</span>
            </div>
            <div className="flex items-center justify-between py-3">
              <div className="flex items-center space-x-3">
                <div className="bg-purple-100 text-purple-600 rounded-full p-2">
                  <TrendingUp className="h-4 w-4" />
                </div>
                <div>
                  <p className="font-medium">Marketing campaign launched</p>
                  <p className="text-sm text-gray-600">Flash Sale campaign is now active</p>
                </div>
              </div>
              <span className="text-sm text-gray-500">1 hour ago</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
