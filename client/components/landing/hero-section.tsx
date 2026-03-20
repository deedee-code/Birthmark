import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Cake, Gift, Clock } from 'lucide-react'

export function HeroSection() {
  return (
    <section className="relative overflow-hidden px-4 py-20 sm:px-6 lg:px-8">
      {/* Background gradient */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
      </div>

      <div className="mx-auto max-w-4xl">
        {/* Main Content */}
        <div className="text-center mb-12 sm:mb-16">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
            <span className="text-balance">Never Miss a Birthday Again</span>
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto text-balance">
            Birthmark automatically sends thoughtful birthday wishes to your loved ones. Let technology handle the reminders so you can focus on what matters—celebrating together.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup">
              <Button size="lg" className="w-full sm:w-auto">
                Get Started Free
              </Button>
            </Link>
            <Link href="#how-it-works">
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                Learn More
              </Button>
            </Link>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
          <div className="rounded-lg border border-border bg-card p-6">
            <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-primary/10 mb-4">
              <Cake className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-semibold text-lg mb-2">Track Birthdays</h3>
            <p className="text-sm text-muted-foreground">
              Easily add and manage all your loved ones' birthdays in one place.
            </p>
          </div>

          <div className="rounded-lg border border-border bg-card p-6">
            <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-accent/10 mb-4">
              <Clock className="h-6 w-6 text-accent" />
            </div>
            <h3 className="font-semibold text-lg mb-2">Automated Messages</h3>
            <p className="text-sm text-muted-foreground">
              Set it and forget it. Personalized messages are sent automatically on the day.
            </p>
          </div>

          <div className="rounded-lg border border-border bg-card p-6">
            <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-primary/10 mb-4">
              <Gift className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-semibold text-lg mb-2">Customizable</h3>
            <p className="text-sm text-muted-foreground">
              Create custom message templates for different relationships.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
