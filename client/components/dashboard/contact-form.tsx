'use client'

import { useState, useEffect } from 'react'
import { useData } from '@/contexts/data-context'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { contactSchema, type ContactInput } from '@/lib/schemas'
import { X, AlertCircle } from 'lucide-react'

interface ContactFormProps {
  contactId?: string
  onClose: () => void
}

export function ContactForm({ contactId, onClose }: ContactFormProps) {
  const { contacts, addContact, updateContact } = useData()
  const [formData, setFormData] = useState<ContactInput>({
    name: '',
    email: '',
    phone: '',
    relationship: '',
    dateOfBirth: '',
    customMessage: '',
  })
  const [errors, setErrors] = useState<Partial<Record<keyof ContactInput, string>>>({})
  const [isLoading, setIsLoading] = useState(false)
  const [generalError, setGeneralError] = useState('')

  // Load contact data if editing
  useEffect(() => {
    if (contactId) {
      const contact = contacts.find((c) => c.id === contactId)
      if (contact) {
        setFormData({
          name: contact.name,
          email: contact.email || '',
          phone: contact.phone || '',
          relationship: contact.relationship,
          dateOfBirth: contact.dateOfBirth,
          customMessage: contact.customMessage || '',
        })
      }
    }
  }, [contactId, contacts])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name as keyof ContactInput]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setGeneralError('')
    setErrors({})

    try {
      const validatedData = contactSchema.parse(formData)
      setIsLoading(true)

      if (contactId) {
        updateContact(contactId, validatedData)
      } else {
        addContact(validatedData)
      }

      onClose()
    } catch (error: any) {
      setIsLoading(false)
      if (error.errors) {
        const newErrors: Partial<Record<keyof ContactInput, string>> = {}
        error.errors.forEach((err: any) => {
          if (err.path && err.path.length > 0) {
            newErrors[err.path[0] as keyof ContactInput] = err.message
          }
        })
        setErrors(newErrors)
      } else {
        setGeneralError(error.message || 'An error occurred')
      }
      setIsLoading(false)
    }
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold">
          {contactId ? 'Edit Contact' : 'Add New Contact'}
        </h2>
        <button
          onClick={onClose}
          className="p-1 hover:bg-muted rounded-lg transition-colors"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {generalError && (
        <div className="mb-4 flex gap-3 rounded-lg bg-destructive/10 p-3">
          <AlertCircle className="h-5 w-5 text-destructive flex-shrink-0 mt-0.5" />
          <p className="text-sm text-destructive">{generalError}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4 max-h-96 overflow-y-auto">
        <div>
          <label className="text-sm font-medium" htmlFor="name">
            Name *
          </label>
          <Input
            id="name"
            name="name"
            placeholder="John Doe"
            value={formData.name}
            onChange={handleChange}
            disabled={isLoading}
            className="mt-1"
          />
          {errors.name && (
            <p className="text-xs text-destructive mt-1">{errors.name}</p>
          )}
        </div>

        <div>
          <label className="text-sm font-medium" htmlFor="email">
            Email
          </label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="john@example.com"
            value={formData.email}
            onChange={handleChange}
            disabled={isLoading}
            className="mt-1"
          />
          {errors.email && (
            <p className="text-xs text-destructive mt-1">{errors.email}</p>
          )}
        </div>

        <div>
          <label className="text-sm font-medium" htmlFor="phone">
            Phone
          </label>
          <Input
            id="phone"
            name="phone"
            type="tel"
            placeholder="+1 (555) 123-4567"
            value={formData.phone}
            onChange={handleChange}
            disabled={isLoading}
            className="mt-1"
          />
        </div>

        <div>
          <label className="text-sm font-medium" htmlFor="relationship">
            Relationship *
          </label>
          <Input
            id="relationship"
            name="relationship"
            placeholder="Friend, Family, Colleague, etc."
            value={formData.relationship}
            onChange={handleChange}
            disabled={isLoading}
            className="mt-1"
          />
          {errors.relationship && (
            <p className="text-xs text-destructive mt-1">{errors.relationship}</p>
          )}
        </div>

        <div>
          <label className="text-sm font-medium" htmlFor="dateOfBirth">
            Date of Birth *
          </label>
          <Input
            id="dateOfBirth"
            name="dateOfBirth"
            type="date"
            value={formData.dateOfBirth}
            onChange={handleChange}
            disabled={isLoading}
            className="mt-1"
          />
          {errors.dateOfBirth && (
            <p className="text-xs text-destructive mt-1">{errors.dateOfBirth}</p>
          )}
        </div>

        <div>
          <label className="text-sm font-medium" htmlFor="customMessage">
            Custom Birthday Message (Optional)
          </label>
          <textarea
            id="customMessage"
            name="customMessage"
            placeholder="Leave blank to use default template..."
            value={formData.customMessage}
            onChange={handleChange}
            disabled={isLoading}
            rows={3}
            className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          />
        </div>

        <div className="flex gap-3 pt-4 border-t border-border">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            disabled={isLoading}
            className="flex-1"
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isLoading} className="flex-1">
            {isLoading ? 'Saving...' : 'Save Contact'}
          </Button>
        </div>
      </form>
    </div>
  )
}
