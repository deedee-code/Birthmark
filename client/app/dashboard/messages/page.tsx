'use client'

import { useState, useEffect } from 'react'
import { useData } from '@/contexts/data-context'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { MessageSquare, Plus, Trash2, Edit2, Cake } from 'lucide-react'
import { MessageTemplateForm } from '@/components/dashboard/message-template-form'
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

export default function MessagesPage() {
  const { messageTemplates, deleteMessageTemplate } = useData()
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingTemplateId, setEditingTemplateId] = useState<string | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleEdit = (templateId: string) => {
    setEditingTemplateId(templateId)
    setIsFormOpen(true)
  }

  const handleClose = () => {
    setIsFormOpen(false)
    setEditingTemplateId(null)
  }

  if (!mounted) return null

  return (
    <div className="p-4 sm:p-6 lg:p-10 max-w-7xl mx-auto min-h-screen">
      {/* Header Area */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-12">
        <div>
          <h1 className="text-4xl font-black tracking-tighter mb-2 text-primary">Library</h1>
          <p className="text-muted-foreground font-medium text-lg">Manage your automated birthday payload sequences.</p>
        </div>
        <Button onClick={() => setIsFormOpen(true)} className="rounded-2xl h-12 px-8 font-black bg-primary text-white shadow-xl shadow-primary/20 hover:scale-[1.02] transition-all">
          <Plus className="h-5 w-5 mr-2" />
          New Template
        </Button>
      </div>

      {/* Form Modal */}
      {isFormOpen && (
        <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-md flex items-center justify-center p-4">
          <Card className="w-full max-w-lg shadow-2xl rounded-[2.5rem] border-border/40 overflow-hidden ring-1 ring-primary/10">
            <MessageTemplateForm
              templateId={editingTemplateId || undefined}
              onClose={handleClose}
            />
          </Card>
        </div>
      )}

      {/* Templates List Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {messageTemplates.length > 0 ? (
          messageTemplates.map((template) => (
            <Card 
              key={template.id} 
              className="p-6 flex flex-col hover:shadow-xl hover:border-primary/40 transition-all duration-500 bg-card/50 backdrop-blur-sm rounded-3xl border border-border/60 relative overflow-hidden group"
            >
              <div className="absolute -top-4 -right-4 p-6 opacity-[0.03] text-primary pointer-events-none group-hover:scale-125 transition-transform duration-1000">
                <MessageSquare size={100} />
              </div>

              <div className="mb-4 relative z-10">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="text-xl font-black tracking-tighter group-hover:text-primary transition-colors truncate">{template.name}</h3>
                  {template.isDefault && (
                    <div className="px-3 py-1 bg-primary/10 rounded-lg shrink-0 border border-primary/20">
                      <p className="text-[10px] text-primary font-black uppercase tracking-wider">Primary</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-muted/30 border border-border/20 mb-6 flex-1 relative z-10 transition-colors group-hover:bg-muted/50">
                <p className="text-[9px] font-black uppercase tracking-[0.2em] text-primary mb-3 flex items-center gap-2 opacity-60">
                  <Cake size={12} />
                  Payload Sequence
                </p>
                <p className="text-foreground/80 font-medium leading-relaxed whitespace-pre-wrap text-[13px] italic">
                  "{template.message}"
                </p>
              </div>

              {!template.isDefault && (
                <div className="flex gap-2 pt-4 border-t border-border/40 relative z-10">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(template.id)}
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
                          Are you sure you want to remove <span className="font-black text-primary underline underline-offset-4">{template.name}</span>? This action will permanently erase this automated message sequence.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter className="pt-6">
                        <AlertDialogCancel className="rounded-xl font-bold border-border/60">Keep Template</AlertDialogCancel>
                        <AlertDialogAction 
                          onClick={() => deleteMessageTemplate(template.id)}
                          className="rounded-xl font-black bg-destructive text-white hover:bg-destructive/90 shadow-lg shadow-destructive/20"
                        >
                          Yes, Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              )}
            </Card>
          ))
        ) : (
          <div className="col-span-full">
            <Card className="p-20 text-center border-2 border-dashed border-border/60 bg-muted/10 rounded-[3rem]">
              <div className="h-24 w-24 bg-background rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl ring-1 ring-border/40">
                <MessageSquare className="h-10 w-10 text-muted-foreground opacity-30" />
              </div>
              <h3 className="text-2xl font-black tracking-tighter mb-3">Library Empty</h3>
              <p className="text-muted-foreground font-medium mb-10 max-w-sm mx-auto">
                No telemetry sequences detected. Initialize your first message template to begin.
              </p>
              <Button onClick={() => setIsFormOpen(true)} size="lg" className="rounded-2xl h-14 px-12 font-black bg-primary text-white shadow-2xl shadow-primary/30 hover:scale-105 transition-all">
                <Plus className="h-6 w-6 mr-3" />
                Initialize First Template
              </Button>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
