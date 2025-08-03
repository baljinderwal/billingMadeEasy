'use client'

import React, { useState } from 'react'
import { BarChart3, DollarSign, ShoppingBag, Users, TrendingUp, Download, FileText } from 'lucide-react'
import { Button } from '@/components/ui/button'

const analyticsStats = [
  { label: 'Total Revenue', value: '$124,563', change: '+12.5%', icon: <DollarSign className="h-5 w-5" /> },
  { label: 'Total Orders', value: '1,234', change: '+8.2%', icon: <ShoppingBag className="h-5 w-5" /> },
  { label: 'Unique Visitors', value: '45,231', change: '+18.9%', icon: <Users className="h-5 w-5" /> },
  { label: 'Conversion Rate', value: '3.2%', change: '-2.1%', icon: <TrendingUp className="h-5 w-5" /> }
]

const reports = [
  {
    id: 1,
    name: 'Sales Performance Report',
    description: 'Comprehensive sales analytics and trends',
    lastGenerated: '2024-03-15 10:30 AM',
    type: 'sales'
  },
  {
    id: 2,
    name: 'Customer Behavior Analysis',
    description: 'Customer journey and engagement metrics',
    lastGenerated: '2024-03-15 09:15 AM',
    type: 'customer'
  },
  {
    id: 3,
    name: 'Product Performance Report',
    description: 'Top performing products and categories',
    lastGenerated: '2024-03-14 05:45 PM',
    type: 'product'
  },
  {
    id: 4,
    name: 'Vendor Commission Report',
    description: 'Vendor sales and commission tracking',
    lastGenerated: '2024-03-14 02:20 PM',
    type: 'vendor'
  }
]

export default function AnalyticsPage() {
  const [activeTab, setActiveTab] = useState('overview')

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Advanced Analytics</h1>
          <p className="text-gray-600">Deep insights and comprehensive reporting for your business</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {analyticsStats.map((stat, index) => (
            <div key={index} className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-blue-100 text-blue-600 rounded-lg p-2">
                  {stat.icon}
                </div>
                <div className={`text-sm font-medium ${stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                  {stat.change}
                </div>
              </div>
              <h3 className="text-sm font-medium text-gray-600 mb-1">{stat.label}</h3>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-lg shadow">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              <button
                onClick={() => setActiveTab('overview')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'overview'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveTab('sales')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'sales'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Sales Analytics
              </button>
              <button
                onClick={() => setActiveTab('customers')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'customers'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Customer Insights
              </button>
              <button
                onClick={() => setActiveTab('reports')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'reports'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Reports
              </button>
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'overview' && (
              <div className="space-y-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Revenue Trend</h3>
                    <div className="h-64 bg-white rounded-lg flex items-center justify-center">
                      <div className="text-center">
                        <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                        <p className="text-gray-500">Revenue chart would be displayed here</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Volume</h3>
                    <div className="h-64 bg-white rounded-lg flex items-center justify-center">
                      <div className="text-center">
                        <ShoppingBag className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                        <p className="text-gray-500">Order volume chart would be displayed here</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Customer Acquisition</h3>
                  <div className="h-64 bg-white rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <Users className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                      <p className="text-gray-500">Customer acquisition chart would be displayed here</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'sales' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2 bg-gray-50 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Sales Performance</h3>
                    <div className="h-80 bg-white rounded-lg flex items-center justify-center">
                      <div className="text-center">
                        <TrendingUp className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                        <p className="text-gray-500">Sales performance chart would be displayed here</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="bg-white border rounded-lg p-4">
                      <h4 className="font-medium text-gray-900 mb-2">Top Categories</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Electronics</span>
                          <span className="text-sm font-medium">$45,230</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Fashion</span>
                          <span className="text-sm font-medium">$32,150</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Home & Garden</span>
                          <span className="text-sm font-medium">$28,890</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white border rounded-lg p-4">
                      <h4 className="font-medium text-gray-900 mb-2">Sales Metrics</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Avg Order Value</span>
                          <span className="text-sm font-medium">$89.50</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Orders Today</span>
                          <span className="text-sm font-medium">47</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Revenue Today</span>
                          <span className="text-sm font-medium">$4,206</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'customers' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Customer Segments</h3>
                    <div className="h-64 bg-white rounded-lg flex items-center justify-center">
                      <div className="text-center">
                        <Users className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                        <p className="text-gray-500">Customer segmentation chart would be displayed here</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Customer Lifetime Value</h3>
                    <div className="h-64 bg-white rounded-lg flex items-center justify-center">
                      <div className="text-center">
                        <DollarSign className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                        <p className="text-gray-500">CLV chart would be displayed here</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white border rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Customer Insights</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-gray-900">68%</p>
                      <p className="text-sm text-gray-600">Returning Customers</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-gray-900">$156</p>
                      <p className="text-sm text-gray-600">Average CLV</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-gray-900">4.2</p>
                      <p className="text-sm text-gray-600">Avg Orders per Customer</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'reports' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">Available Reports</h3>
                  <Button>
                    <FileText className="h-4 w-4 mr-2" />
                    Generate Custom Report
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {reports.map((report) => (
                    <div key={report.id} className="bg-white border rounded-lg p-6 hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h4 className="text-lg font-semibold text-gray-900 mb-2">{report.name}</h4>
                          <p className="text-sm text-gray-600 mb-3">{report.description}</p>
                          <p className="text-xs text-gray-500">Last generated: {report.lastGenerated}</p>
                        </div>
                        <div className="bg-blue-100 text-blue-600 rounded-lg p-2">
                          <FileText className="h-5 w-5" />
                        </div>
                      </div>
                      
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">
                          <Download className="h-4 w-4 mr-2" />
                          Download
                        </Button>
                        <Button size="sm">
                          Regenerate
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
