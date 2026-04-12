'use client'

import { useData } from '@/contexts/data-context'
import { Card } from '@/components/ui/card'
import { Cake, Calendar } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function BirthdaysPage() {
  const { contacts, getUpcomingBirthdays } = useData()
  const upcomingBirthdays = getUpcomingBirthdays(365)

  // Group birthdays by month
  const birthdaysByMonth: { [key: string]: typeof contacts } = {}
  upcomingBirthdays.forEach((contact) => {
    const date = new Date(contact.dateOfBirth)
    const monthKey = date.toLocaleDateString('en-US', { month: 'long' })
    if (!birthdaysByMonth[monthKey]) {
      birthdaysByMonth[monthKey] = []
    }
    birthdaysByMonth[monthKey].push(contact)
  })

  const monthOrder = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ]

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Upcoming Birthdays</h1>
        <p className="text-muted-foreground">View all upcoming birthdays throughout the year</p>
      </div>

      {contacts.length === 0 ? (
        <Card className="p-12 text-center">
          <Cake className="h-12 w-12 text-muted mx-auto mb-4 opacity-50" />
          <h3 className="text-lg font-semibold mb-2">No Contacts Yet</h3>
          <p className="text-muted-foreground mb-6">
            Add your first contact to see upcoming birthdays.
          </p>
          <Link href="/dashboard/contacts">
            <Button>
              <Cake className="h-4 w-4 mr-2" />
              Add First Contact
            </Button>
          </Link>
        </Card>
      ) : upcomingBirthdays.length === 0 ? (
        <Card className="p-12 text-center">
          <Calendar className="h-12 w-12 text-muted mx-auto mb-4 opacity-50" />
          <h3 className="text-lg font-semibold mb-2">No Upcoming Birthdays</h3>
          <p className="text-muted-foreground">
            No birthdays scheduled in the next year.
          </p>
        </Card>
      ) : (
        <div className="space-y-8">
          {monthOrder.map((month) => {
            if (!birthdaysByMonth[month]) return null

            return (
              <div key={month}>
                <h2 className="text-xl font-semibold mb-4">{month}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {birthdaysByMonth[month].map((contact) => {
                    const birthDate = new Date(contact.dateOfBirth)
                    const today = new Date()
                    const thisYearBirthday = new Date(today.getFullYear(), birthDate.getMonth(), birthDate.getDate())
                    if (thisYearBirthday < today) {
                      thisYearBirthday.setFullYear(today.getFullYear() + 1)
                    }
                    const daysUntil = Math.ceil((thisYearBirthday.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
                    const age = today.getFullYear() - birthDate.getFullYear()

                    return (
                      <Card key={contact.id} className="p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h3 className="font-semibold">{contact.name}</h3>
                            <p className="text-xs text-muted-foreground">{contact.relationship}</p>
                          </div>
                        </div>
                        
                        <div className="space-y-2 text-xs">
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-muted-foreground uppercase tracking-wider text-[10px] font-bold">Status</span>
                            <div className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-tighter ${
                              daysUntil === 0 
                                ? 'bg-accent text-accent-foreground animate-pulse' 
                                : daysUntil === 1
                                ? 'bg-primary text-primary-foreground'
                                : 'bg-muted text-muted-foreground border border-border'
                            }`}>
                              {daysUntil === 0 ? 'Today!' : daysUntil === 1 ? 'Tomorrow' : `In ${daysUntil} days`}
                            </div>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Birthday</span>
                            <span className="font-medium text-foreground">{birthDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                          </div>
                        </div>
                      </Card>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
