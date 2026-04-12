'use client'

import { useState, useEffect } from 'react'
import { useData } from '@/contexts/data-context'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { messageTemplateSchema, type MessageTemplateInput } from '@/lib/schemas'
import { X, AlertCircle } from 'lucide-react'

interface MessageTemplateFormProps {
  templateId?: string
  onClose: () => void
}

export function MessageTemplateForm({ templateId, onClose }: MessageTemplateFormProps) {
  const { messageTemplates, addMessageTemplate, updateMessageTemplate } = useData()
  const [formData, setFormData] = useState<MessageTemplateInput>({
    name: '',
    message: '',
    isDefault: false,
  })
  const [errors, setErrors] = useState<Partial<Record<keyof MessageTemplateInput, string>>>({})
  const [isLoading, setIsLoading] = useState(false)
  const [generalError, setGeneralError] = useState('')

  // Load template data if editing
  useEffect(() => {
    if (templateId) {
      const template = messageTemplates.find((t) => t.id === templateId)
      if (template) {
        setFormData({
          name: template.name,
          message: template.message,
          isDefault: template.isDefault || false,
        })
      }
    }
  }, [templateId, messageTemplates])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name as keyof MessageTemplateInput]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setGeneralError('')
    setErrors({})

    try {
      const validatedData = messageTemplateSchema.parse(formData)
      setIsLoading(true)

      if (templateId) {
        updateMessageTemplate(templateId, validatedData)
      } else {
        addMessageTemplate(validatedData)
      }

      onClose()
    } catch (error: any) {
      setIsLoading(false)
      if (error.errors) {
        const newErrors: Partial<Record<keyof MessageTemplateInput, string>> = {}
        error.errors.forEach((err: any) => {
          if (err.path && err.path.length > 0) {
            newErrors[err.path[0] as keyof MessageTemplateInput] = err.message
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
          {templateId ? 'Edit Template' : 'New Message Template'}
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

      <form onSubmit={handleSubmit} className="space-y-4 max-h-[450px] overflow-y-auto pr-3">
        <div className="space-y-1.5">
          <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" htmlFor="name">
            Template Name *
          </label>
          <Input
            id="name"
            name="name"
            placeholder="e.g., Friend Birthday, Family Birthday"
            value={formData.name}
            onChange={handleChange}
            disabled={isLoading}
          />
          {errors.name && (
            <p className="text-xs text-destructive">{errors.name}</p>
          )}
        </div>

        <div className="space-y-1.5">
          <div className="flex justify-between items-center">
            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" htmlFor="message">
              Birthday Message *
            </label>
            <span className="text-[10px] text-muted-foreground font-mono">
              {formData.message.length} Characters
            </span>
          </div>
          <Textarea
            id="message"
            name="message"
            placeholder="Write a heartfelt birthday message..."
            value={formData.message}
            onChange={handleChange}
            disabled={isLoading}
            className="min-h-[150px] resize-none"
          />
          <p className="text-[10px] text-muted-foreground italic">
            Tip: Keep it personal and memorable for the recipient.
          </p>
          {errors.message && (
            <p className="text-xs text-destructive">{errors.message}</p>
          )}
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
            {isLoading ? 'Saving...' : 'Save Template'}
          </Button>
        </div>
      </form>
    </div>
  )
}
