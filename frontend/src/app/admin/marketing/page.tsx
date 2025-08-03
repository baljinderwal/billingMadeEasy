'use client'

import React, { useState } from 'react'
import { Plus, Search, Filter, MoreHorizontal, TrendingUp, Users, Mail, MessageSquare } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'

const campaigns = [
  {
    id: 1,
    name: 'Summer Sale 2024',
    type: 'email',
    status: 'active',
    audience: 5420,
    sent: 5200,
    opened: 3640,
    clicked: 728,
    revenue: '$45,230',
    createdAt: '2024-06-15'
  },
  {
    id: 2,
    name: 'Welcome Series',
    type: 'email',
    status: 'active',
    audience: 1250,
    sent: 1200,
    opened: 850,
    clicked: 120,
    revenue: '$8,450',
    createdAt: '2024-06-10'
  },
  {
    id: 3,
    name: 'Flash Sale Alert',
    type: 'sms',
    status: 'completed',
    audience: 8500,
    sent: 8350,
    opened: 8100,
    clicked: 2430,
    revenue: '$67,890',
    createdAt: '2024-06-08'
  }
]

const promotions = [
  {
    id: 1,
    name: 'SUMMER20',
    type: 'percentage',
    value: 20,
    status: 'active',
    used: 156,
    limit: 1000,
    revenue: '$12,450',
    expiresAt: '2024-08-31'
  },
  {
    id: 2,
    name: 'WELCOME10',
    type: 'percentage',
    value: 10,
    status: 'active',
    used: 89,
    limit: null,
    revenue: '$3,240',
    expiresAt: '2024-12-31'
  },
  {
    id: 3,
    name: 'FREESHIP',
    type: 'shipping',
    value: 0,
    status: 'paused',
    used: 234,
    limit: 500,
    revenue: '$8,760',
    expiresAt: '2024-07-31'
  }
]

const marketingStats = [
  { label: 'Total Campaigns', value: '24', change: '+3 this month', icon: <Mail className="h-5 w-5" /> },
  { label: 'Active Promotions', value: '8', change: '+2 this week', icon: <TrendingUp className="h-5 w-5" /> },
  { label: 'Email Subscribers', value: '12,450', change: '+156 this week', icon: <Users className="h-5 w-5" /> },
  { label: 'SMS Subscribers', value: '8,230', change: '+89 this week', icon: <MessageSquare className="h-5 w-5" /> }
]

export default function MarketingPage() {
  const [activeTab, setActiveTab] = useState('campaigns')

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Marketing Center</h1>
          <p className="text-gray-600">Manage campaigns, promotions, and customer engagement</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {marketingStats.map((stat, index) => (
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
                onClick={() => setActiveTab('campaigns')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'campaigns'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Campaigns
              </button>
              <button
                onClick={() => setActiveTab('promotions')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'promotions'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Promotions
              </button>
              <button
                onClick={() => setActiveTab('referrals')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'referrals'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Referrals
              </button>
              <button
                onClick={() => setActiveTab('loyalty')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'loyalty'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Loyalty
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
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Create {activeTab.slice(0, -1)}
              </Button>
            </div>

            {activeTab === 'campaigns' && (
              <div className="space-y-4">
                {campaigns.map((campaign) => (
                  <div key={campaign.id} className="border rounded-lg p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-4">
                        <h3 className="text-lg font-semibold text-gray-900">{campaign.name}</h3>
                        <Badge variant={campaign.status === 'active' ? 'default' : 'secondary'}>
                          {campaign.status}
                        </Badge>
                        <Badge variant="outline">{campaign.type}</Badge>
                      </div>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-6 gap-4 text-sm">
                      <div>
                        <p className="text-gray-600">Audience</p>
                        <p className="font-medium">{campaign.audience.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Sent</p>
                        <p className="font-medium">{campaign.sent.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Opened</p>
                        <p className="font-medium">{campaign.opened.toLocaleString()}</p>
                        <p className="text-xs text-gray-500">{((campaign.opened / campaign.sent) * 100).toFixed(1)}%</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Clicked</p>
                        <p className="font-medium">{campaign.clicked.toLocaleString()}</p>
                        <p className="text-xs text-gray-500">{((campaign.clicked / campaign.opened) * 100).toFixed(1)}%</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Revenue</p>
                        <p className="font-medium text-green-600">{campaign.revenue}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Created</p>
                        <p className="font-medium">{campaign.createdAt}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'promotions' && (
              <div className="space-y-4">
                {promotions.map((promotion) => (
                  <div key={promotion.id} className="border rounded-lg p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-4">
                        <h3 className="text-lg font-semibold text-gray-900">{promotion.name}</h3>
                        <Badge variant={promotion.status === 'active' ? 'default' : promotion.status === 'paused' ? 'secondary' : 'outline'}>
                          {promotion.status}
                        </Badge>
                        <Badge variant="outline">{promotion.type}</Badge>
                      </div>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
                      <div>
                        <p className="text-gray-600">Discount</p>
                        <p className="font-medium">
                          {promotion.type === 'percentage' ? `${promotion.value}%` : 
                           promotion.type === 'shipping' ? 'Free Shipping' : `$${promotion.value}`}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-600">Used</p>
                        <p className="font-medium">{promotion.used}</p>
                        {promotion.limit && (
                          <p className="text-xs text-gray-500">of {promotion.limit}</p>
                        )}
                      </div>
                      <div>
                        <p className="text-gray-600">Revenue</p>
                        <p className="font-medium text-green-600">{promotion.revenue}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Expires</p>
                        <p className="font-medium">{promotion.expiresAt}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Usage Rate</p>
                        <p className="font-medium">
                          {promotion.limit ? `${((promotion.used / promotion.limit) * 100).toFixed(1)}%` : 'Unlimited'}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'referrals' && (
              <div className="text-center py-12">
                <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Referral Program</h3>
                <p className="text-gray-600 mb-6">Set up and manage customer referral programs</p>
                <Button>Create Referral Program</Button>
              </div>
            )}

            {activeTab === 'loyalty' && (
              <div className="text-center py-12">
                <TrendingUp className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Loyalty Program</h3>
                <p className="text-gray-600 mb-6">Create customer loyalty and rewards programs</p>
                <Button>Create Loyalty Program</Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
