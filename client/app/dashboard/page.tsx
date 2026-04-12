'use client'

import { useData } from '@/contexts/data-context'
import { Card } from '@/components/ui/card'
import { Users, Cake, MessageSquare, Calendar, Settings, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function DashboardPage() {
  const { contacts, messageTemplates, getUpcomingBirthdays } = useData()
  const upcomingBirthdays = getUpcomingBirthdays(7)

  const stats = [
    {
      label: 'Total Contacts',
      value: contacts.length,
      icon: Users,
      color: 'text-primary',
      bgGradient: 'from-primary/15 to-primary/5',
      borderColor: 'border-primary/20',
    },
    {
      label: 'Upcoming Birthdays',
      value: upcomingBirthdays.length,
      icon: Cake,
      color: 'text-accent',
      bgGradient: 'from-accent/15 to-accent/5',
      borderColor: 'border-accent/20',
    },
    {
      label: 'Message Templates',
      value: messageTemplates.length,
      icon: MessageSquare,
      color: 'text-sky-500',
      bgGradient: 'from-sky-500/15 to-sky-500/5',
      borderColor: 'border-sky-500/20',
    },
  ]

  return (
    <div className="p-4 sm:p-6 lg:p-10 max-w-7xl mx-auto min-h-screen">
      {/* Header Area */}
      <div className="mb-8">
        <h1 className="text-4xl font-black tracking-tighter mb-2 text-primary">Overview</h1>
        <p className="text-muted-foreground font-medium text-lg">Birthday intelligence summary at a glance.</p>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.label} className={`p-6 border-2 ${stat.borderColor} shadow-xl rounded-3xl hover:shadow-2xl transition-all duration-300 relative overflow-hidden group`}>
              <div className="flex items-center justify-between relative z-10">
                <div>
                  <p className="text-[9px] font-black uppercase tracking-[0.2em] text-muted-foreground mb-1.5">{stat.label}</p>
                  <p className="text-4xl font-black tracking-tighter">{stat.value}</p>
                </div>
                <div className={`p-3.5 rounded-2xl bg-gradient-to-br ${stat.bgGradient} shadow-inner group-hover:scale-110 transition-transform duration-500`}>
                  <Icon className={`h-7 w-7 ${stat.color}`} />
                </div>
              </div>
              <div className="absolute -bottom-4 -left-4 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity duration-700">
                 <Icon size={100} />
              </div>
            </Card>
          )
        })}
      </div>

      {/* Grid Content */}
      <div className="max-w-4xl">
        {/* Upcoming Section */}
        <div className="space-y-6">
          <Card className="p-6 border-border/40 shadow-xl rounded-3xl overflow-hidden relative group">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="h-10 w-1.5 bg-accent rounded-full shadow-lg shadow-accent/20" />
                <div>
                  <h2 className="text-xl font-black tracking-tighter">Upcoming Arrivals</h2>
                  <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-wide">Next 7 days telemetry</p>
                </div>
              </div>
              <Link href="/dashboard/birthdays">
                <Button variant="ghost" size="sm" className="h-8 rounded-lg font-bold hover:bg-accent/5 text-accent text-xs">
                  Full Schedule
                </Button>
              </Link>
            </div>

            {upcomingBirthdays.length > 0 ? (
              <div className="space-y-3">
                {upcomingBirthdays.map((contact) => {
                  const birthDate = new Date(contact.dateOfBirth)
                  const today = new Date()
                  const thisYearBirthday = new Date(today.getFullYear(), birthDate.getMonth(), birthDate.getDate())
                  if (thisYearBirthday < today) {
                    thisYearBirthday.setFullYear(today.getFullYear() + 1)
                  }
                  const daysUntil = Math.ceil((thisYearBirthday.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
                  
                  return (
                    <div
                      key={contact.id}
                      className="flex items-center justify-between p-4 rounded-2xl bg-muted/30 border border-border/40 hover:border-primary/30 hover:bg-card transition-all duration-300 shadow-sm group/item"
                    >
                      <div className="flex gap-3 items-center">
                        <div className="h-9 w-9 rounded-xl bg-primary/10 flex items-center justify-center font-black text-primary text-xs group-hover/item:scale-105 transition-transform">
                          {contact.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-black tracking-tight text-sm">{contact.name}</p>
                          <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-tight opacity-70">
                            {contact.relationship} · {new Date(contact.dateOfBirth).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className={`px-3 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-[0.15em] shadow-sm ${
                          daysUntil === 0 
                            ? 'bg-accent text-white animate-pulse' 
                            : daysUntil === 1
                            ? 'bg-primary text-white'
                            : 'bg-background border border-border/60 text-muted-foreground'
                        }`}>
                          {daysUntil === 0 ? 'Today' : daysUntil === 1 ? 'Tomorrow' : `In ${daysUntil}d`}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            ) : (
              <div className="text-center py-12 bg-muted/20 rounded-3xl border border-dashed border-border/60">
                <div className="h-16 w-16 bg-background rounded-full flex items-center justify-center mx-auto mb-4 shadow-inner">
                  <Cake className="h-6 w-6 text-muted-foreground opacity-30" />
                </div>
                <p className="text-sm text-muted-foreground font-bold italic mb-6 opacity-70">The schedule is currently quiet.</p>
                <Link href="/dashboard/contacts">
                  <Button size="sm" className="h-10 rounded-xl font-black bg-primary text-white shadow-xl shadow-primary/20 hover:scale-105 transition-all px-8">
                    Add Contact
                  </Button>
                </Link>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  )
}
