'use client'

import { useState, useEffect } from 'react'
import { useData } from '@/contexts/data-context'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { contactSchema, type ContactInput } from '@/lib/schemas'
import { X, AlertCircle, Sparkles, MessageSquare, Wand2 } from 'lucide-react'

interface ContactFormProps {
  contactId?: string
  onClose: () => void
}

export function ContactForm({ contactId, onClose }: ContactFormProps) {
  const { contacts, messageTemplates, addContact, updateContact } = useData()
  const [formData, setFormData] = useState<ContactInput>({
    name: '',
    email: '',
    phone: '',
    relationship: '',
    dateOfBirth: '',
    customMessage: '',
  })
  const [dobMonth, setDobMonth] = useState<string>('')
  const [dobDay, setDobDay] = useState<string>('')
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
        const [year, month, day] = contact.dateOfBirth.split('-')
        setDobMonth(month)
        setDobDay(day)
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
      const birthDate = dobMonth && dobDay ? `2000-${dobMonth}-${dobDay.padStart(2, '0')}` : ''
      const dataToValidate = { ...formData, dateOfBirth: birthDate }
      const validatedData = contactSchema.parse(dataToValidate)
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

  const handleAiGenerate = () => {
    const aiMessages = [
      `Happy birthday, ${formData.name || 'friend'}! Wishing you a day filled with laughter, love, and all your favorite things.`,
      `Cheers to another trip around the sun! May this year be your best one yet, ${formData.name || 'there'}.`,
      `Thinking of you on your special day. Have a magnificent birthday and a fantastic year ahead!`,
    ]
    const randomMessage = aiMessages[Math.floor(Math.random() * aiMessages.length)]
    setFormData(prev => ({ ...prev, customMessage: randomMessage }))
  }

  const handleTemplateSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const template = messageTemplates.find(t => t.id === e.target.value)
    if (template) {
      setFormData(prev => ({ ...prev, customMessage: template.message }))
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

      <form onSubmit={handleSubmit} className="space-y-4 max-h-[400px] overflow-y-auto pr-3">
        <div className="space-y-1.5">
          <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" htmlFor="name">
            Name *
          </label>
          <Input
            id="name"
            name="name"
            placeholder="John Doe"
            value={formData.name}
            onChange={handleChange}
            disabled={isLoading}
          />
          {errors.name && (
            <p className="text-xs text-destructive">{errors.name}</p>
          )}
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" htmlFor="email">
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
          />
          {errors.email && (
            <p className="text-xs text-destructive">{errors.email}</p>
          )}
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" htmlFor="phone">
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
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" htmlFor="relationship">
            Relationship *
          </label>
          <Input
            id="relationship"
            name="relationship"
            placeholder="Friend, Family, Colleague, etc."
            value={formData.relationship}
            onChange={handleChange}
            disabled={isLoading}
          />
          {errors.relationship && (
            <p className="text-xs text-destructive">{errors.relationship}</p>
          )}
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" htmlFor="dateOfBirth">
            Date of Birth *
          </label>
          <div className="flex gap-2">
            <select
              className="flex h-9 w-full rounded-md border border-input bg-transparent dark:bg-input/30 px-3 py-1 text-sm shadow-xs transition-[color,box-shadow] outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 appearance-none cursor-pointer"
              value={dobMonth}
              onChange={(e) => setDobMonth(e.target.value)}
              disabled={isLoading}
            >
              <option value="" className="bg-background">Month</option>
              {Array.from({ length: 12 }, (_, i) => {
                const val = (i + 1).toString().padStart(2, '0')
                const name = new Date(2000, i).toLocaleString('en-US', { month: 'long' })
                return <option key={val} value={val} className="bg-background">{name}</option>
              })}
            </select>
            <select
              className="flex h-9 w-40 rounded-md border border-input bg-transparent dark:bg-input/30 px-3 py-1 text-sm shadow-xs transition-[color,box-shadow] outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 appearance-none cursor-pointer"
              value={dobDay}
              onChange={(e) => setDobDay(e.target.value)}
              disabled={isLoading}
            >
              <option value="" className="bg-background">Day</option>
              {Array.from({ length: 31 }, (_, i) => {
                const val = (i + 1).toString().padStart(2, '0')
                return <option key={val} value={val} className="bg-background">{i + 1}</option>
              })}
            </select>
          </div>
          {errors.dateOfBirth && (
            <p className="text-xs text-destructive">{errors.dateOfBirth}</p>
          )}
        </div>

        <div className="space-y-3 pt-2 border-t border-border/50">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium leading-none text-primary/80" htmlFor="customMessage">
                Birthday Message
              </label>
            </div>
            <span className="text-[10px] text-muted-foreground font-mono">
              {formData.customMessage?.length || 0}/1000
            </span>
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex gap-2">
              <select
                className="flex h-9 flex-1 rounded-md border border-input bg-transparent dark:bg-input/30 px-3 py-1 text-xs shadow-xs transition-[color,box-shadow] outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] appearance-none cursor-pointer"
                onChange={handleTemplateSelect}
                defaultValue=""
              >
                <option value="" className="bg-background">Use a saved template...</option>
                {messageTemplates.map((template) => (
                  <option key={template.id} value={template.id} className="bg-background text-sm">
                    {template.name}
                  </option>
                ))}
              </select>
              
              <Button 
                type="button" 
                size="sm" 
                variant="outline" 
                className="h-9 gap-1.5 text-xs font-semibold border-accent/30 hover:bg-accent/10 hover:text-accent group"
                onClick={handleAiGenerate}
              >
                <Sparkles className="h-3.5 w-3.5 text-accent group-hover:animate-spin-slow transition-transform" />
                AI Generate
              </Button>
            </div>

            <Textarea
              id="customMessage"
              name="customMessage"
              placeholder="Select a template or type your own special message..."
              value={formData.customMessage}
              onChange={handleChange}
              disabled={isLoading}
              className="min-h-[120px] resize-none text-sm leading-relaxed"
              maxLength={1000}
            />
          </div>
        </div>

        <div className="flex gap-3 pt-4 border-t border-border">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            disabled={isLoading}
            className="flex-1 cursor-pointer"
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isLoading} className="flex-1 cursor-pointer">
            {isLoading ? 'Saving...' : 'Save Contact'}
          </Button>
        </div>
      </form>
    </div>
  )
}
