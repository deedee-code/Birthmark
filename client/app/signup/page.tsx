import { SignupForm } from '@/components/auth/signup-form'
import Link from 'next/link'
import { Cake } from 'lucide-react'

export const metadata = {
  title: 'Sign Up - Birthmark',
  description: 'Create your Birthmark account to start automating birthday wishes',
}

export default function SignupPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 py-12 bg-background">
      <div className="mb-8 flex items-center gap-2">
        <Cake className="h-6 w-6 text-primary" />
        <span className="text-xl font-semibold">Birthmark</span>
      </div>
      <SignupForm />
      <p className="text-xs text-muted-foreground text-center mt-8 max-w-md">
        By signing up, you agree to our{' '}
        <Link href="/terms" className="text-primary hover:underline">
          Terms of Service
        </Link>
        {' '}and{' '}
        <Link href="/privacy" className="text-primary hover:underline">
          Privacy Policy
        </Link>
      </p>
    </main>
  )
}
