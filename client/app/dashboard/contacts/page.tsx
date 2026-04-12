'use client'

import { useState } from 'react'
import { useData } from '@/contexts/data-context'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Users, Plus, Trash2, Edit2, Search, Mail, Phone, Cake } from 'lucide-react'
import { ContactForm } from '@/components/dashboard/contact-form'
import { Input } from '@/components/ui/input'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

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
    <div className="p-4 sm:p-6 lg:p-10 max-w-7xl mx-auto min-h-screen">
      {/* Header Area */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-12">
        <div>
          <h1 className="text-4xl font-black tracking-tighter mb-2 text-primary">Contacts</h1>
          <p className="text-muted-foreground font-medium text-lg">Manage all your contacts and their birthdays.</p>
        </div>
        <Button onClick={() => setIsFormOpen(true)} className="rounded-2xl h-12 px-8 font-black bg-primary text-white shadow-xl shadow-primary/20 hover:scale-[1.02] transition-all">
          <Plus className="h-5 w-5 mr-2" />
          Add Contact
        </Button>
      </div>

      {/* Form Modal */}
      {isFormOpen && (
        <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-md flex items-center justify-center p-4">
          <Card className="w-full max-w-lg shadow-2xl rounded-[2.5rem] border-border/40 overflow-hidden ring-1 ring-primary/10">
            <ContactForm
              contactId={editingContact || undefined}
              onClose={handleClose}
            />
          </Card>
        </div>
      )}

      {/* Contacts List Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {contacts.length > 0 ? (
          contacts.map((contact) => (
            <Card
              key={contact.id}
              className="p-6 flex flex-col hover:shadow-xl hover:border-primary/40 hover:-translate-y-1 transition-all duration-500 cursor-pointer group bg-card/50 backdrop-blur-sm rounded-3xl border border-border/60 relative overflow-hidden"
              onClick={() => handleEdit(contact.id)}
            >
              <div className="absolute -top-4 -right-4 p-6 opacity-[0.03] text-primary pointer-events-none group-hover:scale-125 transition-transform duration-1000">
                <Users size={100} />
              </div>

              <div className="mb-4 relative z-10">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-xl font-black tracking-tighter group-hover:text-primary transition-colors truncate">{contact.name}</h3>
                  <div className="px-3 py-1 bg-primary/10 rounded-lg shrink-0">
                    <p className="text-[10px] text-primary font-black uppercase tracking-wider">{contact.relationship}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4 mb-5 flex-1 relative z-10">
                <div className="p-3 rounded-2xl bg-muted/40 border border-border/20 flex items-center justify-between">
                  <div>
                    <p className="text-[9px] font-black uppercase tracking-[0.2em] text-muted-foreground mb-0.5">Birthday</p>
                    <p className="text-sm font-black tracking-tight text-foreground">
                      {new Date(contact.dateOfBirth).toLocaleDateString('en-US', {
                        month: 'long',
                        day: 'numeric',
                      })}
                    </p>
                  </div>
                  <div className="h-8 w-8 rounded-lg bg-background flex items-center justify-center shadow-inner">
                    <Cake className="h-4 w-4 text-accent opacity-50" />
                  </div>
                </div>

                {(contact.email || contact.phone) && (
                  <div className="space-y-2">
                    {contact.email && (
                      <div className="flex items-center gap-2 text-xs">
                        <Mail className="h-3.5 w-3.5 text-muted-foreground/50" />
                        <span className="font-bold tracking-tight text-muted-foreground truncate">{contact.email}</span>
                      </div>
                    )}
                    {contact.phone && (
                      <div className="flex items-center gap-2 text-xs">
                        <Phone className="h-3.5 w-3.5 text-muted-foreground/50" />
                        <span className="font-bold tracking-tight text-muted-foreground">{contact.phone}</span>
                      </div>
                    )}
                  </div>
                )}

                {contact.customMessage && (
                  <div className="pt-3 border-t border-border/40">
                    <p className="text-[9px] font-black uppercase tracking-[0.2em] text-primary/60 mb-1.5">Birthday Message</p>
                    <p className="text-muted-foreground italic leading-snug text-[14px] font-medium bg-primary/[0.02] p-2.5 rounded-xl border border-primary/5">
                      "{contact.customMessage.length > 65 
                        ? contact.customMessage.substring(0, 65) + '...' 
                        : contact.customMessage}"
                    </p>
                  </div>
                )}
              </div>

              <div className="flex gap-2 pt-4 border-t border-border/40 relative z-10">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation()
                    handleEdit(contact.id)
                  }}
                  className="flex-1 h-9 rounded-xl font-bold border-border/60 hover:bg-muted text-xs shadow-none"
                >
                  <Edit2 className="h-4 w-4 mr-2" />
                  Edit
                </Button>
                
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={(e) => e.stopPropagation()}
                      className="flex-1 h-9 rounded-xl font-bold border-destructive/20 text-destructive hover:bg-destructive hover:text-white transition-all text-xs"
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent className="rounded-[2rem] border-border/40 shadow-2xl">
                    <AlertDialogHeader>
                      <AlertDialogTitle className="text-2xl font-black tracking-tighter flex items-center gap-3">
                        <div className="p-2 bg-destructive/10 rounded-xl">
                          <Trash2 className="h-5 w-5 text-destructive" />
                        </div>
                        Confirm Deletion
                      </AlertDialogTitle>
                      <AlertDialogDescription className="text-base font-medium leading-relaxed pt-2">
                        Are you sure you want to remove <span className="font-black text-primary underline underline-offset-4">{contact.name}</span> from your contacts? This action will permanently erase their birthday information.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter className="pt-6">
                      <AlertDialogCancel 
                        onClick={(e) => e.stopPropagation()}
                        className="rounded-xl font-bold border-border/60"
                      >
                        Keep Contact
                      </AlertDialogCancel>
                      <AlertDialogAction 
                        onClick={(e) => {
                          e.stopPropagation()
                          deleteContact(contact.id)
                        }}
                        className="rounded-xl font-black bg-destructive text-white hover:bg-destructive/90 shadow-lg shadow-destructive/20"
                      >
                        Yes, Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </Card>
          ))
        ) : (
          <div className="col-span-full">
            <Card className="p-20 text-center border-2 border-dashed border-border/60 bg-muted/10 rounded-[3rem]">
              <div className="h-24 w-24 bg-background rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl ring-1 ring-border/40">
                <Users className="h-10 w-10 text-muted-foreground opacity-30" />
              </div>
              <h3 className="text-2xl font-black tracking-tighter mb-3">Directory Empty</h3>
              <p className="text-muted-foreground font-medium mb-10 max-w-sm mx-auto">
                No telemetry data detected. Initialize your first automated birthday connection to begin.
              </p>
              <Button onClick={() => setIsFormOpen(true)} size="lg" className="rounded-2xl h-14 px-12 font-black bg-primary text-white shadow-2xl shadow-primary/30 hover:scale-105 transition-all">
                <Plus className="h-6 w-6 mr-3" />
                Initialize First Contact
              </Button>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
