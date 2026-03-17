'use client'

import { createContext, useContext, useState, useEffect } from 'react'

interface User {
  id: string
  name: string
  email: string
  avatar?: string
  role: 'user' | 'admin' | 'premium'
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

const DEMO_USER: User = {
  id: '1',
  name: 'Adrián Loaiza',
  email: 'adrian@alsnippets.com',
  avatar: '/images/tarjetas/adrian.webp',
  role: 'admin'
}

export function AuthProvider ({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Solo ejecutamos en el cliente para evitar errores de hidratación
    const savedUser = localStorage.getItem('alsnippets_user')
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser))
      } catch (error) {
        console.error('Error parsing user from storage', error)
      }
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true)

    // Simular latencia de red
    await new Promise(resolve => setTimeout(resolve, 800))

    if (password === 'admin') {
      setUser(DEMO_USER)
      localStorage.setItem('alsnippets_user', JSON.stringify(DEMO_USER))
      setIsLoading(false)
      return true
    }

    setIsLoading(false)
    return false
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('alsnippets_user')
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        logout,
        isAuthenticated: !!user
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth () {
  const context = useContext(AuthContext)
  if (context === undefined) {
    // Mantenemos este error para depuración interna
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
