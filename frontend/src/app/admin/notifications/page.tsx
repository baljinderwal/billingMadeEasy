'use client'

import React, { useState } from 'react'
import { Plus, Search, Filter, MoreHorizontal, Bell, Mail, MessageSquare, Send } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'

const notifications = [
  {
    id: 1,
    title: 'Order Confirmation',
    message: 'Your order #12345 has been confirmed and is being processed.',
    type: 'order',
    channel: 'email',
    status: 'sent',
    recipient: 'john@example.com',
    sentAt: '2024-03-15 10:30 AM'
  },
  {
    id: 2,
    title: 'Flash Sale Alert',
    message: 'Don\'t miss our 50% off flash sale ending tonight!',
    type: 'marketing',
    channel: 'sms',
    status: 'delivered',
    recipient: '+1234567890',
    sentAt: '2024-03-15 09:15 AM'
  },
  {
    id: 3,
    title: 'Payment Failed',
    message: 'Your payment for order #12344 could not be processed.',
    type: 'payment',
    channel: 'push',
    status: 'failed',
    recipient: 'jane@example.com',
    sentAt: '2024-03-15 08:45 AM'
  }
]

const templates = [
  {
    id: 1,
    name: 'Order Confirmation',
    type: 'email',
    subject: 'Order Confirmation - {{orderNumber}}',
    usage: 156,
    lastUsed: '2024-03-15'
  },
  {
    id: 2,
    name: 'Shipping Notification',
    type: 'sms',
    subject: 'Your order is on the way!',
    usage: 89,
    lastUsed: '2024-03-14'
  },
  {
    id: 3,
    name: 'Welcome Email',
    type: 'email',
    subject: 'Welcome to billingMadeEasy!',
    usage: 234,
    lastUsed: '2024-03-13'
  }
]

const notificationStats = [
  { label: 'Total Sent', value: '12,450', change: '+156 today', icon: <Send className="h-5 w-5" /> },
  { label: 'Delivery Rate', value: '98.5%', change: '+0.3% this week', icon: <Bell className="h-5 w-5" /> },
  { label: 'Open Rate', value: '24.8%', change: '+2.1% this week', icon: <Mail className="h-5 w-5" /> },
  { label: 'Click Rate', value: '3.2%', change: '+0.5% this week', icon: <MessageSquare className="h-5 w-5" /> }
]

export default function NotificationsPage() {
  const [activeTab, setActiveTab] = useState('notifications')

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'sent':
      case 'delivered':
        return 'bg-green-100 text-green-800'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'failed':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getChannelIcon = (channel: string) => {
    switch (channel) {
      case 'email':
        return <Mail className="h-4 w-4" />
      case 'sms':
        return <MessageSquare className="h-4 w-4" />
      case 'push':
        return <Bell className="h-4 w-4" />
      default:
        return <Bell className="h-4 w-4" />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Notification Center</h1>
          <p className="text-gray-600">Manage customer communications and messaging campaigns</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {notificationStats.map((stat, index) => (
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
                onClick={() => setActiveTab('notifications')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'notifications'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Notifications
              </button>
              <button
                onClick={() => setActiveTab('templates')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'templates'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Templates
              </button>
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
                onClick={() => setActiveTab('settings')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'settings'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Settings
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
                {activeTab === 'notifications' ? 'Send Notification' : 
                 activeTab === 'templates' ? 'Create Template' : 
                 activeTab === 'campaigns' ? 'Create Campaign' : 'Add Setting'}
              </Button>
            </div>

            {activeTab === 'notifications' && (
              <div className="space-y-4">
                {notifications.map((notification) => (
                  <div key={notification.id} className="border rounded-lg p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-4">
                        <div className="bg-blue-100 text-blue-600 rounded-lg p-2">
                          {getChannelIcon(notification.channel)}
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">{notification.title}</h3>
                          <p className="text-sm text-gray-600">{notification.message}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline">{notification.type}</Badge>
                        <Badge variant="outline">{notification.channel}</Badge>
                        <Badge className={getStatusColor(notification.status)}>
                          {notification.status}
                        </Badge>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="text-gray-600">Recipient</p>
                        <p className="font-medium">{notification.recipient}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Sent At</p>
                        <p className="font-medium">{notification.sentAt}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Actions</p>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline">View</Button>
                          <Button size="sm" variant="outline">Resend</Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'templates' && (
              <div className="space-y-4">
                {templates.map((template) => (
                  <div key={template.id} className="border rounded-lg p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-4">
                        <div className="bg-green-100 text-green-600 rounded-lg p-2">
                          {getChannelIcon(template.type)}
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">{template.name}</h3>
                          <p className="text-sm text-gray-600">{template.subject}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline">{template.type}</Badge>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="text-gray-600">Usage Count</p>
                        <p className="font-medium">{template.usage}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Last Used</p>
                        <p className="font-medium">{template.lastUsed}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Actions</p>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline">Edit</Button>
                          <Button size="sm">Use Template</Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'campaigns' && (
              <div className="text-center py-12">
                <Send className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Notification Campaigns</h3>
                <p className="text-gray-600 mb-6">Create and manage automated notification campaigns</p>
                <Button>Create Campaign</Button>
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="space-y-6">
                <div className="bg-white border rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Email Settings</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">SMTP Server</label>
                      <Input placeholder="smtp.gmail.com" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">From Email</label>
                      <Input placeholder="noreply@billingmadeeasy.com" />
                    </div>
                  </div>
                </div>

                <div className="bg-white border rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">SMS Settings</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Twilio Account SID</label>
                      <Input placeholder="Enter your Twilio Account SID" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">From Number</label>
                      <Input placeholder="+1234567890" />
                    </div>
                  </div>
                </div>

                <div className="bg-white border rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Push Notification Settings</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Firebase Server Key</label>
                      <Input placeholder="Enter your Firebase Server Key" />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button>Save Settings</Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
