import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'

export function CTASection() {
  return (
    <section className="px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <div className="relative overflow-hidden rounded-3xl border border-primary/20 bg-gradient-to-br from-primary/10 via-background to-accent/10 p-12 text-center shadow-xl shadow-primary/5">
          {/* Background decoration */}
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-primary/10 blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-accent/10 blur-3xl" />
          </div>

          <div className="text-4xl mb-6">🎂</div>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Ready to Never Miss a Birthday?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-lg mx-auto">
            Start using Birthmark today and focus on celebrating the people who matter most.
          </p>
          <Link href="/signup">
            <Button size="lg" className="gap-2 shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-shadow">
              Create Your Free Account
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
          <p className="text-xs text-muted-foreground mt-4">No credit card required</p>
        </div>
      </div>
    </section>
  )
}

export function Footer() {
  return (
    <footer className="border-t border-border bg-muted/30 px-4 py-14 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-primary/10 p-1 rounded-lg">
                <img src="/icons/logo.png" alt="Birthmark Logo" className="h-6 w-6 object-contain" />
              </div>
              <span className="font-bold text-lg tracking-tight text-foreground">Birthmark</span>
            </div>
            <p className="text-sm text-muted-foreground max-w-xs leading-relaxed">
              Automated birthday wishes for the people you care about. Never let a special day slip by unnoticed.
            </p>
          </div>

          {/* Product */}
          <div>
            <h4 className="font-semibold text-sm mb-4 text-foreground">Product</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>
                <Link href="#features" className="hover:text-foreground transition-colors hover:underline underline-offset-4">
                  Features
                </Link>
              </li>
              <li>
                <Link href="#how-it-works" className="hover:text-foreground transition-colors hover:underline underline-offset-4">
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="/signup" className="hover:text-foreground transition-colors hover:underline underline-offset-4">
                  Get Started
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold text-sm mb-4 text-foreground">Legal</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>
                <Link href="/privacy" className="hover:text-foreground transition-colors hover:underline underline-offset-4">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-foreground transition-colors hover:underline underline-offset-4">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-border pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Birthmark. Made with ❤️ to help you remember what matters.
          </p>
          <p className="text-xs text-muted-foreground">
            All data stored locally in your browser
          </p>
        </div>
      </div>
    </footer>
  )
}
