'use client'

import { useState } from 'react'
import { useData } from '@/contexts/data-context'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Users, Plus, Trash2, Edit2 } from 'lucide-react'
import { ContactForm } from '@/components/dashboard/contact-form'

export default function ContactsPage() {
  const { contacts, deleteContact } = useData()
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingContact, setEditingContact] = useState<string | null>(null)

  const handleEdit = (contactId: string) => {
    setEditingContact(contactId)
    setIsFormOpen(true)
  }

  const handleClose = () => {
    setIsFormOpen(false)
    setEditingContact(null)
  }

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this contact?')) {
      deleteContact(id)
    }
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Contacts</h1>
          <p className="text-muted-foreground">Manage all your birthday contacts</p>
        </div>
        <Button onClick={() => setIsFormOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Contact
        </Button>
      </div>

      {/* Form Modal */}
      {isFormOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4 md:p-0">
          <Card className="w-full max-w-md">
            <ContactForm
              contactId={editingContact || undefined}
              onClose={handleClose}
            />
          </Card>
        </div>
      )}

      {/* Contacts List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {contacts.length > 0 ? (
          contacts.map((contact) => {
            const birthDate = new Date(contact.dateOfBirth)
            const today = new Date()
            const age = today.getFullYear() - birthDate.getFullYear() - 
              (today.getMonth() < birthDate.getMonth() || 
               (today.getMonth() === birthDate.getMonth() && today.getDate() < birthDate.getDate()) ? 1 : 0)

            return (
              <Card key={contact.id} className="p-6 flex flex-col">
                <div className="mb-4">
                  <h3 className="text-lg font-semibold">{contact.name}</h3>
                  <p className="text-sm text-muted-foreground">{contact.relationship}</p>
                </div>

                <div className="space-y-2 mb-6 text-sm flex-1">
                  <div>
                    <p className="text-xs text-muted-foreground">Date of Birth</p>
                    <p className="text-foreground">
                      {new Date(contact.dateOfBirth).toLocaleDateString('en-US', {
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </p>
                  </div>
                  {contact.email && (
                    <div>
                      <p className="text-xs text-muted-foreground">Email</p>
                      <p className="text-foreground truncate">{contact.email}</p>
                    </div>
                  )}
                  {contact.phone && (
                    <div>
                      <p className="text-xs text-muted-foreground">Phone</p>
                      <p className="text-foreground">{contact.phone}</p>
                    </div>
                  )}
                  <div>
                    <p className="text-xs text-muted-foreground">Age</p>
                    <p className="text-foreground">{age} years old</p>
                  </div>
                </div>

                <div className="flex gap-2 pt-4 border-t border-border">
                  <button
                    onClick={() => handleEdit(contact.id)}
                    className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg border border-border hover:bg-muted transition-colors text-sm font-medium"
                  >
                    <Edit2 className="h-4 w-4" />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(contact.id)}
                    className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg border border-destructive/50 hover:bg-destructive/10 transition-colors text-sm font-medium text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                    Delete
                  </button>
                </div>
              </Card>
            )
          })
        ) : (
          <div className="col-span-full">
            <Card className="p-12 text-center">
              <Users className="h-12 w-12 text-muted mx-auto mb-4 opacity-50" />
              <h3 className="text-lg font-semibold mb-2">No Contacts Yet</h3>
              <p className="text-muted-foreground mb-6">
                Add your first contact to get started with automated birthday wishes.
              </p>
              <Button onClick={() => setIsFormOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Add Your First Contact
              </Button>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
