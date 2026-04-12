import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Cake, Gift, Clock, Sparkles, ArrowRight } from 'lucide-react'

export function HeroSection() {
  return (
    <section className="relative overflow-hidden px-4 py-24 sm:px-6 lg:px-8">
      {/* Background gradient blobs */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/8 via-transparent to-accent/8" />
        <div className="absolute -top-40 -right-32 w-[500px] h-[500px] rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -bottom-40 -left-32 w-[500px] h-[500px] rounded-full bg-accent/10 blur-3xl" />
      </div>

      <div className="mx-auto max-w-5xl">
        {/* Badge */}
        <div className="flex justify-center mb-6">
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-sm font-medium text-primary">
            <Sparkles className="h-3.5 w-3.5" />
            Automated Birthday Wishes
          </span>
        </div>

        {/* Main Content */}
        <div className="text-center mb-14 sm:mb-18">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-6 leading-tight">
            <span className="text-balance">Never Miss a</span>{' '}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent text-balance">
              Birthday Again
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto text-balance leading-relaxed">
            Birthmark automatically sends thoughtful birthday wishes to your loved ones. Let technology handle the reminders so you can focus on what matters—celebrating together.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup">
              <Button size="lg" className="w-full sm:w-auto gap-2 shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-shadow">
                Get Started Free
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="#how-it-works">
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                See How It Works
              </Button>
            </Link>
          </div>
          <p className="text-xs text-muted-foreground mt-4">No credit card required · Free forever</p>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-4">
          <div className="group rounded-2xl border border-border bg-card p-7 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300">
            <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 mb-5 group-hover:from-primary/30 transition-colors">
              <Cake className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-semibold text-lg mb-2">Track Birthdays</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Easily add and manage all your loved ones' birthdays in one beautiful place.
            </p>
          </div>

          <div className="group rounded-2xl border border-border bg-card p-7 hover:border-accent/30 hover:shadow-lg hover:shadow-accent/5 transition-all duration-300">
            <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-gradient-to-br from-accent/20 to-accent/5 mb-5 group-hover:from-accent/30 transition-colors">
              <Clock className="h-6 w-6 text-accent" />
            </div>
            <h3 className="font-semibold text-lg mb-2">Automated Messages</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Set it and forget it. Personalized messages are sent automatically on the day.
            </p>
          </div>

          <div className="group rounded-2xl border border-border bg-card p-7 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300">
            <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 mb-5 group-hover:from-primary/30 transition-colors">
              <Gift className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-semibold text-lg mb-2">Fully Customizable</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Create custom message templates tailored to different relationships.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
