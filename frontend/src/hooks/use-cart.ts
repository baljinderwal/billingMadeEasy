'use client'

import { useState, useEffect } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

interface CartItem {
  id: string
  productId: string
  name: string
  price: number
  quantity: number
  image?: string
  variant?: {
    size?: string
    color?: string
  }
}

interface Cart {
  id: string
  items: CartItem[]
  total: number
  itemCount: number
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000/api'

export function useCart() {
  const queryClient = useQueryClient()
  const [sessionId, setSessionId] = useState<string>('')

  useEffect(() => {
    let storedSessionId = localStorage.getItem('cart-session-id')
    if (!storedSessionId) {
      storedSessionId = `session-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
      localStorage.setItem('cart-session-id', storedSessionId)
    }
    setSessionId(storedSessionId)
  }, [])

  const { data: cart, isLoading } = useQuery({
    queryKey: ['cart', sessionId],
    queryFn: async (): Promise<Cart> => {
      if (!sessionId) return { id: '', items: [], total: 0, itemCount: 0 }
      
      const response = await fetch(`${API_BASE_URL}/cart`, {
        headers: {
          'x-session-id': sessionId,
        },
      })
      
      if (!response.ok) {
        return { id: '', items: [], total: 0, itemCount: 0 }
      }
      
      return response.json()
    },
    enabled: !!sessionId,
  })

  const addToCartMutation = useMutation({
    mutationFn: async ({ productId, quantity = 1, variant }: { productId: string; quantity?: number; variant?: any }) => {
      const response = await fetch(`${API_BASE_URL}/cart/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-session-id': sessionId,
        },
        body: JSON.stringify({ productId, quantity, variant }),
      })
      
      if (!response.ok) {
        throw new Error('Failed to add item to cart')
      }
      
      return response.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart', sessionId] })
    },
  })

  const updateQuantityMutation = useMutation({
    mutationFn: async ({ itemId, quantity }: { itemId: string; quantity: number }) => {
      const response = await fetch(`${API_BASE_URL}/cart/update`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-session-id': sessionId,
        },
        body: JSON.stringify({ itemId, quantity }),
      })
      
      if (!response.ok) {
        throw new Error('Failed to update cart item')
      }
      
      return response.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart', sessionId] })
    },
  })

  const removeFromCartMutation = useMutation({
    mutationFn: async (itemId: string) => {
      const response = await fetch(`${API_BASE_URL}/cart/remove`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'x-session-id': sessionId,
        },
        body: JSON.stringify({ itemId }),
      })
      
      if (!response.ok) {
        throw new Error('Failed to remove item from cart')
      }
      
      return response.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart', sessionId] })
    },
  })

  const clearCartMutation = useMutation({
    mutationFn: async () => {
      const response = await fetch(`${API_BASE_URL}/cart/clear`, {
        method: 'DELETE',
        headers: {
          'x-session-id': sessionId,
        },
      })
      
      if (!response.ok) {
        throw new Error('Failed to clear cart')
      }
      
      return response.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart', sessionId] })
    },
  })

  return {
    cart,
    cartItems: cart?.items || [],
    cartTotal: cart?.total || 0,
    cartItemCount: cart?.itemCount || 0,
    isLoading,
    addToCart: addToCartMutation.mutate,
    updateQuantity: updateQuantityMutation.mutate,
    removeFromCart: removeFromCartMutation.mutate,
    clearCart: clearCartMutation.mutate,
    isAddingToCart: addToCartMutation.isPending,
    isUpdating: updateQuantityMutation.isPending,
    isRemoving: removeFromCartMutation.isPending,
  }
}
