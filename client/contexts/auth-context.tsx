'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

export interface User {
  id: string
  email: string
  name: string
  createdAt: string
}

export interface AuthContextType {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
  signup: (email: string, password: string, name: string) => Promise<void>
  login: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
  updateProfile: (name: string) => Promise<void>
  updatePassword: (currentPassword: string, newPassword: string) => Promise<void>
  deleteAccount: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Initialize auth from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem('birthmark_user')
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser))
      } catch (error) {
        localStorage.removeItem('birthmark_user')
      }
    }
    setIsLoading(false)
  }, [])

  const signup = async (email: string, password: string, name: string) => {
    // For demo purposes, we'll use localStorage
    // In production, this would call your backend API
    const users = JSON.parse(localStorage.getItem('birthmark_users') || '[]')
    
    if (users.find((u: any) => u.email === email)) {
      throw new Error('User already exists')
    }

    const newUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      email,
      name,
      createdAt: new Date().toISOString(),
    }

    users.push({ ...newUser, password }) // In production, password would be hashed on backend
    localStorage.setItem('birthmark_users', JSON.stringify(users))
    localStorage.setItem('birthmark_user', JSON.stringify(newUser))
    setUser(newUser)
  }

  const login = async (email: string, password: string) => {
    const users = JSON.parse(localStorage.getItem('birthmark_users') || '[]')
    const foundUser = users.find((u: any) => u.email === email && u.password === password)

    if (!foundUser) {
      throw new Error('Invalid email or password')
    }

    const { password: _, ...userWithoutPassword } = foundUser
    localStorage.setItem('birthmark_user', JSON.stringify(userWithoutPassword))
    setUser(userWithoutPassword)
  }

  const logout = async () => {
    localStorage.removeItem('birthmark_user')
    setUser(null)
  }

  const updateProfile = async (name: string) => {
    if (!user) throw new Error('Not authenticated')

    const updatedUser = { ...user, name }
    const users = JSON.parse(localStorage.getItem('birthmark_users') || '[]')
    const userIndex = users.findIndex((u: any) => u.id === user.id)
    if (userIndex !== -1) {
      users[userIndex].name = name
      localStorage.setItem('birthmark_users', JSON.stringify(users))
    }
    localStorage.setItem('birthmark_user', JSON.stringify(updatedUser))
    setUser(updatedUser)
  }

  const updatePassword = async (currentPassword: string, newPassword: string) => {
    if (!user) throw new Error('Not authenticated')

    const users = JSON.parse(localStorage.getItem('birthmark_users') || '[]')
    const userIndex = users.findIndex((u: any) => u.id === user.id)
    
    if (userIndex === -1) {
      throw new Error('User not found')
    }

    if (users[userIndex].password !== currentPassword) {
      throw new Error('Incorrect current password')
    }

    users[userIndex].password = newPassword
    localStorage.setItem('birthmark_users', JSON.stringify(users))
  }

  const deleteAccount = async () => {
    if (!user) return

    // Remove from users list
    const users = JSON.parse(localStorage.getItem('birthmark_users') || '[]')
    const updatedUsers = users.filter((u: any) => u.id !== user.id)
    localStorage.setItem('birthmark_users', JSON.stringify(updatedUsers))

    // Remove current session
    localStorage.removeItem('birthmark_user')
    setUser(null)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        signup,
        login,
        logout,
        updateProfile,
        updatePassword,
        deleteAccount,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
