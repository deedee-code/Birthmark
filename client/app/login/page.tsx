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
      <Link href="/" className="flex flex-col items-center gap-4 mb-8 group transition-all">
        <div className="bg-primary/10 p-4 rounded-3xl group-hover:scale-110 transition-transform duration-500 shadow-xl shadow-primary/5">
          <img src="/icons/logo.png" alt="Birthmark" className="h-12 w-12 object-contain" />
        </div>
        <h1 className="text-3xl font-black tracking-tighter text-primary">Birthmark</h1>
      </Link>
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
