'use client'

import { useState, useEffect, createContext, useContext } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  role: 'customer' | 'admin' | 'vendor'
  avatar?: string
  phone?: string
  isEmailVerified: boolean
}

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  register: (data: RegisterData) => Promise<void>
  logout: () => void
  refreshToken: () => Promise<void>
}

interface RegisterData {
  email: string
  password: string
  firstName: string
  lastName: string
  phone?: string
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000/api'

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    return useAuthLogic()
  }
  return context
}

function useAuthLogic() {
  const queryClient = useQueryClient()
  const [token, setToken] = useState<string | null>(null)

  useEffect(() => {
    const storedToken = localStorage.getItem('auth-token')
    if (storedToken) {
      setToken(storedToken)
    }
  }, [])

  const { data: user, isLoading } = useQuery({
    queryKey: ['user', token],
    queryFn: async (): Promise<User | null> => {
      if (!token) return null
      
      try {
        const response = await fetch(`${API_BASE_URL}/auth/me`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        })
        
        if (!response.ok) {
          localStorage.removeItem('auth-token')
          setToken(null)
          return null
        }
        
        const data = await response.json()
        return data.user
      } catch (error) {
        console.warn('Auth service unavailable, running in offline mode')
        localStorage.removeItem('auth-token')
        setToken(null)
        return null
      }
    },
    enabled: !!token,
  })

  const loginMutation = useMutation({
    mutationFn: async ({ email, password }: { email: string; password: string }) => {
      try {
        const response = await fetch(`${API_BASE_URL}/auth/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        })
        
        if (!response.ok) {
          const error = await response.json()
          throw new Error(error.message || 'Login failed')
        }
        
        return response.json()
      } catch (error) {
        if (error instanceof Error) {
          throw error
        }
        throw new Error('Auth service unavailable. Please try again later.')
      }
    },
    onSuccess: (data) => {
      const { token: newToken } = data
      localStorage.setItem('auth-token', newToken)
      setToken(newToken)
      queryClient.invalidateQueries({ queryKey: ['user'] })
    },
  })

  const registerMutation = useMutation({
    mutationFn: async (userData: RegisterData) => {
      try {
        const response = await fetch(`${API_BASE_URL}/auth/register`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userData),
        })
        
        if (!response.ok) {
          const error = await response.json()
          throw new Error(error.message || 'Registration failed')
        }
        
        return response.json()
      } catch (error) {
        if (error instanceof Error) {
          throw error
        }
        throw new Error('Auth service unavailable. Please try again later.')
      }
    },
    onSuccess: (data) => {
      const { token: newToken } = data
      localStorage.setItem('auth-token', newToken)
      setToken(newToken)
      queryClient.invalidateQueries({ queryKey: ['user'] })
    },
  })

  const logout = () => {
    localStorage.removeItem('auth-token')
    setToken(null)
    queryClient.clear()
  }

  const refreshToken = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/refresh`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })
      
      if (response.ok) {
        const data = await response.json()
        const { token: newToken } = data
        localStorage.setItem('auth-token', newToken)
        setToken(newToken)
      }
    } catch (error) {
      console.error('Token refresh failed:', error)
      logout()
    }
  }

  return {
    user: user || null,
    isAuthenticated: !!user,
    isLoading,
    login: async (email: string, password: string) => {
      await loginMutation.mutateAsync({ email, password })
    },
    register: async (data: RegisterData) => {
      await registerMutation.mutateAsync(data)
    },
    logout,
    refreshToken,
  }
}
