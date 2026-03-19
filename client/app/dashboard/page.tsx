'use client'

import { useData } from '@/contexts/data-context'
import { Card } from '@/components/ui/card'
import { Users, Cake, MessageSquare, Calendar } from 'lucide-react'
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
      bgColor: 'bg-primary/10',
    },
    {
      label: 'Upcoming Birthdays',
      value: upcomingBirthdays.length,
      icon: Cake,
      color: 'text-accent',
      bgColor: 'bg-accent/10',
    },
    {
      label: 'Message Templates',
      value: messageTemplates.length,
      icon: MessageSquare,
      color: 'text-primary',
      bgColor: 'bg-primary/10',
    },
  ]

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back! Here's your birthday overview.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.label} className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                  <p className="text-3xl font-bold">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                  <Icon className={`h-6 w-6 ${stat.color}`} />
                </div>
              </div>
            </Card>
          )
        })}
      </div>

      {/* Upcoming Birthdays */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upcoming */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <Calendar className="h-5 w-5 text-accent" />
              Upcoming Birthdays (Next 7 Days)
            </h2>
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
                const age = today.getFullYear() - birthDate.getFullYear()

                return (
                  <div
                    key={contact.id}
                    className="flex items-center justify-between p-3 rounded-lg bg-muted/50 border border-border"
                  >
                    <div>
                      <p className="font-medium">{contact.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {contact.relationship} • Turning {age + 1}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold text-accent">
                        {daysUntil === 0 ? 'Today!' : `In ${daysUntil} days`}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          ) : (
            <div className="text-center py-8">
              <Cake className="h-12 w-12 text-muted mx-auto mb-3 opacity-50" />
              <p className="text-muted-foreground mb-4">No upcoming birthdays in the next 7 days</p>
              <Link href="/dashboard/contacts">
                <Button size="sm" variant="outline">
                  Add a Contact
                </Button>
              </Link>
            </div>
          )}
        </Card>

        {/* Quick Actions */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-6">Quick Actions</h2>
          <div className="space-y-3">
            <Link href="/dashboard/contacts" className="block">
              <Button variant="outline" className="w-full justify-start">
                <Users className="h-4 w-4 mr-2" />
                Manage Contacts
              </Button>
            </Link>
            <Link href="/dashboard/birthdays" className="block">
              <Button variant="outline" className="w-full justify-start">
                <Cake className="h-4 w-4 mr-2" />
                View All Birthdays
              </Button>
            </Link>
            <Link href="/dashboard/messages" className="block">
              <Button variant="outline" className="w-full justify-start">
                <MessageSquare className="h-4 w-4 mr-2" />
                Edit Message Templates
              </Button>
            </Link>
            <Link href="/dashboard/settings" className="block">
              <Button variant="outline" className="w-full justify-start">
                <Cake className="h-4 w-4 mr-2" />
                Settings
              </Button>
            </Link>
          </div>
        </Card>
      </div>
    </div>
  )
}
