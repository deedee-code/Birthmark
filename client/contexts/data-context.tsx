'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import { useAuth } from './auth-context'

export interface Contact {
  id: string
  name: string
  email?: string
  phone?: string
  relationship: string
  dateOfBirth: string
  customMessage?: string
  createdAt: string
}

export interface MessageTemplate {
  id: string
  name: string
  message: string
  isDefault?: boolean
  createdAt: string
}

export interface DataContextType {
  contacts: Contact[]
  messageTemplates: MessageTemplate[]
  isLoading: boolean
  addContact: (contact: Omit<Contact, 'id' | 'createdAt'>) => void
  updateContact: (id: string, contact: Partial<Contact>) => void
  deleteContact: (id: string) => void
  getUpcomingBirthdays: (days?: number) => Contact[]
  addMessageTemplate: (template: Omit<MessageTemplate, 'id' | 'createdAt'>) => void
  updateMessageTemplate: (id: string, template: Partial<MessageTemplate>) => void
  deleteMessageTemplate: (id: string) => void
}

const DataContext = createContext<DataContextType | undefined>(undefined)

export function DataProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth()
  const [contacts, setContacts] = useState<Contact[]>([])
  const [messageTemplates, setMessageTemplates] = useState<MessageTemplate[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // Initialize from localStorage
  useEffect(() => {
    if (!user) {
      setContacts([])
      setMessageTemplates([])
      setIsLoading(false)
      return
    }

    const userId = user.id
    const storedContacts = localStorage.getItem(`contacts_${userId}`)
    const storedTemplates = localStorage.getItem(`templates_${userId}`)

    if (storedContacts) {
      try {
        setContacts(JSON.parse(storedContacts))
      } catch (error) {
        console.error('Error loading contacts:', error)
      }
    }

    if (storedTemplates) {
      try {
        setMessageTemplates(JSON.parse(storedTemplates))
      } catch (error) {
        console.error('Error loading templates:', error)
      }
    } else {
      // Create default template
      const defaultTemplate: MessageTemplate = {
        id: Math.random().toString(36).substr(2, 9),
        name: 'Default Birthday Wish',
        message: 'Happy birthday! Wishing you a wonderful day filled with joy and celebration. May all your dreams come true!',
        isDefault: true,
        createdAt: new Date().toISOString(),
      }
      setMessageTemplates([defaultTemplate])
      localStorage.setItem(`templates_${userId}`, JSON.stringify([defaultTemplate]))
    }

    setIsLoading(false)
  }, [user])

  // Save contacts to localStorage
  const saveContacts = (newContacts: Contact[]) => {
    if (!user) return
    setContacts(newContacts)
    localStorage.setItem(`contacts_${user.id}`, JSON.stringify(newContacts))
  }

  // Save templates to localStorage
  const saveTemplates = (newTemplates: MessageTemplate[]) => {
    if (!user) return
    setMessageTemplates(newTemplates)
    localStorage.setItem(`templates_${user.id}`, JSON.stringify(newTemplates))
  }

  const addContact = (contact: Omit<Contact, 'id' | 'createdAt'>) => {
    const newContact: Contact = {
      ...contact,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date().toISOString(),
    }
    saveContacts([...contacts, newContact])
  }

  const updateContact = (id: string, updatedData: Partial<Contact>) => {
    const updated = contacts.map((c) =>
      c.id === id ? { ...c, ...updatedData } : c
    )
    saveContacts(updated)
  }

  const deleteContact = (id: string) => {
    const filtered = contacts.filter((c) => c.id !== id)
    saveContacts(filtered)
  }

  const getUpcomingBirthdays = (days = 30) => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    return contacts.filter((contact) => {
      const birthDate = new Date(contact.dateOfBirth)
      const thisYearBirthday = new Date(today.getFullYear(), birthDate.getMonth(), birthDate.getDate())
      
      // If birthday already passed this year, check next year
      if (thisYearBirthday < today) {
        thisYearBirthday.setFullYear(today.getFullYear() + 1)
      }

      const daysUntil = Math.ceil((thisYearBirthday.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
      return daysUntil >= 0 && daysUntil <= days
    }).sort((a, b) => {
      const aDate = new Date(a.dateOfBirth)
      const bDate = new Date(b.dateOfBirth)
      const aThisYear = new Date(new Date().getFullYear(), aDate.getMonth(), aDate.getDate())
      const bThisYear = new Date(new Date().getFullYear(), bDate.getMonth(), bDate.getDate())
      
      if (aThisYear < new Date()) aThisYear.setFullYear(new Date().getFullYear() + 1)
      if (bThisYear < new Date()) bThisYear.setFullYear(new Date().getFullYear() + 1)
      
      return aThisYear.getTime() - bThisYear.getTime()
    })
  }

  const addMessageTemplate = (template: Omit<MessageTemplate, 'id' | 'createdAt'>) => {
    const newTemplate: MessageTemplate = {
      ...template,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date().toISOString(),
    }
    saveTemplates([...messageTemplates, newTemplate])
  }

  const updateMessageTemplate = (id: string, updatedData: Partial<MessageTemplate>) => {
    const updated = messageTemplates.map((t) =>
      t.id === id ? { ...t, ...updatedData } : t
    )
    saveTemplates(updated)
  }

  const deleteMessageTemplate = (id: string) => {
    // Don't delete default template
    const template = messageTemplates.find((t) => t.id === id)
    if (template?.isDefault) return

    const filtered = messageTemplates.filter((t) => t.id !== id)
    saveTemplates(filtered)
  }

  return (
    <DataContext.Provider
      value={{
        contacts,
        messageTemplates,
        isLoading,
        addContact,
        updateContact,
        deleteContact,
        getUpcomingBirthdays,
        addMessageTemplate,
        updateMessageTemplate,
        deleteMessageTemplate,
      }}
    >
      {children}
    </DataContext.Provider>
  )
}

export function useData() {
  const context = useContext(DataContext)
  if (context === undefined) {
    throw new Error('useData must be used within DataProvider')
  }
  return context
}
