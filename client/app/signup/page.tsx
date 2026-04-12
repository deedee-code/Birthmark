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
      <Link href="/" className="flex flex-col items-center gap-4 mb-8 group transition-all">
        <div className="bg-primary/10 p-4 rounded-3xl group-hover:scale-110 transition-transform duration-500 shadow-xl shadow-primary/5">
          <img src="/icons/logo.png" alt="Birthmark" className="h-12 w-12 object-contain" />
        </div>
        <h1 className="text-3xl font-black tracking-tighter text-primary">Birthmark</h1>
      </Link>
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
