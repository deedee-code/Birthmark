'use client'

import { useState } from 'react'
import { useData } from '@/contexts/data-context'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { MessageSquare, Plus, Trash2, Edit2 } from 'lucide-react'
import { MessageTemplateForm } from '@/components/dashboard/message-template-form'

export default function MessagesPage() {
  const { messageTemplates, deleteMessageTemplate } = useData()
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingTemplateId, setEditingTemplateId] = useState<string | null>(null)

  const handleEdit = (templateId: string) => {
    setEditingTemplateId(templateId)
    setIsFormOpen(true)
  }

  const handleClose = () => {
    setIsFormOpen(false)
    setEditingTemplateId(null)
  }

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this template?')) {
      deleteMessageTemplate(id)
    }
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Message Templates</h1>
          <p className="text-muted-foreground">Create and manage your birthday message templates</p>
        </div>
        <Button onClick={() => setIsFormOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          New Template
        </Button>
      </div>

      {/* Form Modal */}
      {isFormOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4 md:p-0">
          <Card className="w-full max-w-lg">
            <MessageTemplateForm
              templateId={editingTemplateId || undefined}
              onClose={handleClose}
            />
          </Card>
        </div>
      )}

      {/* Templates List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {messageTemplates.length > 0 ? (
          messageTemplates.map((template) => (
            <Card key={template.id} className="p-6 flex flex-col">
              <div className="mb-4 flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-lg font-semibold">{template.name}</h3>
                    {template.isDefault && (
                      <span className="inline-flex items-center rounded-full bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
                        Default
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <p className="text-muted-foreground mb-6 flex-1 leading-relaxed whitespace-pre-wrap">
                {template.message}
              </p>

              {!template.isDefault && (
                <div className="flex gap-2 pt-4 border-t border-border">
                  <button
                    onClick={() => handleEdit(template.id)}
                    className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg border border-border hover:bg-muted transition-colors text-sm font-medium"
                  >
                    <Edit2 className="h-4 w-4" />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(template.id)}
                    className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg border border-destructive/50 hover:bg-destructive/10 transition-colors text-sm font-medium text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                    Delete
                  </button>
                </div>
              )}
            </Card>
          ))
        ) : (
          <Card className="col-span-full p-12 text-center">
            <MessageSquare className="h-12 w-12 text-muted mx-auto mb-4 opacity-50" />
            <h3 className="text-lg font-semibold mb-2">No Templates Yet</h3>
            <p className="text-muted-foreground mb-6">
              Create custom message templates for different people or occasions.
            </p>
            <Button onClick={() => setIsFormOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Create Your First Template
            </Button>
          </Card>
        )}
      </div>
    </div>
  )
}
