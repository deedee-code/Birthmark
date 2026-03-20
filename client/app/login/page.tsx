import { LoginForm } from '@/components/auth/login-form'
import Link from 'next/link'
import { Cake } from 'lucide-react'

export const metadata = {
  title: 'Sign In - Birthmark',
  description: 'Sign in to your Birthmark account',
}

export default function LoginPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 py-12 bg-background">
      <div className="flex items-center gap-2">
        <img src="/icons/birthmark-logo-1024.png" alt="Birthmark Logo" className="h-24 w-24" />
      </div>
      <LoginForm />
      <p className="text-xs text-muted-foreground text-center mt-8">
        Remember your password?{' '}
        <Link href="/" className="text-primary hover:underline">
          Back to home
        </Link>
      </p>
    </main>
  )
}
