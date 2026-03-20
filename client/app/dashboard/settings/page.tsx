'use client'

import { useState } from 'react'
import { useAuth } from '@/contexts/auth-context'
import { useRouter } from 'next/navigation'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Settings, LogOut, AlertCircle } from 'lucide-react'

export default function SettingsPage() {
  const { user, updateProfile, logout } = useAuth()
  const router = useRouter()
  const [name, setName] = useState(user?.name || '')
  const [isSaving, setIsSaving] = useState(false)
  const [message, setMessage] = useState('')
  const [messageType, setMessageType] = useState<'success' | 'error'>('success')

  const handleNameChange = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim()) {
      setMessageType('error')
      setMessage('Name cannot be empty')
      return
    }

    try {
      setIsSaving(true)
      await updateProfile(name)
      setMessageType('success')
      setMessage('Profile updated successfully')
      setTimeout(() => setMessage(''), 3000)
    } catch (error) {
      setMessageType('error')
      setMessage('Failed to update profile')
    } finally {
      setIsSaving(false)
    }
  }

  const handleLogout = async () => {
    if (confirm('Are you sure you want to sign out?')) {
      await logout()
      router.push('/login')
    }
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-2xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
          <Settings className="h-8 w-8" />
          Settings
        </h1>
        <p className="text-muted-foreground">Manage your account and preferences</p>
      </div>

      {/* Profile Section */}
      <Card className="p-6 mb-6">
        <h2 className="text-xl font-semibold mb-6">Account Information</h2>

        {message && (
          <div className={`mb-6 flex gap-3 rounded-lg p-4 ${
            messageType === 'success'
              ? 'bg-green-500/10 text-green-700 dark:text-green-400'
              : 'bg-destructive/10 text-destructive'
          }`}>
            <AlertCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
            <p className="text-sm">{message}</p>
          </div>
        )}

        <form onSubmit={handleNameChange} className="space-y-4">
          <div>
            <label className="text-sm font-medium" htmlFor="email">
              Email Address
            </label>
            <Input
              id="email"
              type="email"
              value={user?.email || ''}
              disabled
              className="mt-1 bg-muted"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Your email address is used to sign in. It cannot be changed.
            </p>
          </div>

          <div>
            <label className="text-sm font-medium" htmlFor="name">
              Full Name
            </label>
            <Input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your full name"
              className="mt-1"
            />
          </div>

          <div className="pt-4 border-t border-border">
            <Button type="submit" disabled={isSaving}>
              {isSaving ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
        </form>
      </Card>

      {/* Notification Settings */}
      <Card className="p-6 mb-6">
        <h2 className="text-xl font-semibold mb-6">Notification Settings</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 border border-border rounded-lg bg-muted/30">
            <div>
              <p className="font-medium text-sm">Birthday Reminders</p>
              <p className="text-xs text-muted-foreground">
                Get notified on the day of each birthday
              </p>
            </div>
            <div className="inline-flex items-center h-6 w-11 rounded-full bg-primary cursor-not-allowed">
              <div className="h-5 w-5 rounded-full bg-background transform translate-x-5 transition-transform" />
            </div>
          </div>
          <p className="text-xs text-muted-foreground">
            Notification settings coming soon. Birthdays will be sent automatically on their day.
          </p>
        </div>
      </Card>

      {/* Security Section */}
      <Card className="p-6 mb-6">
        <h2 className="text-xl font-semibold mb-6">Security</h2>
        <div className="space-y-3">
          <p className="text-sm text-muted-foreground mb-4">
            Your account is secure with us. To change your password, please create a new account.
          </p>
          <Button variant="outline" className="w-full" disabled>
            Change Password (Coming Soon)
          </Button>
        </div>
      </Card>

      {/* Danger Zone */}
      <Card className="p-6 border-destructive/50 bg-destructive/5">
        <h2 className="text-xl font-semibold mb-6 text-destructive">Danger Zone</h2>
        <div className="space-y-4">
          <div>
            <h3 className="font-medium text-sm mb-2">Sign Out</h3>
            <p className="text-xs text-muted-foreground mb-4">
              Sign out from your account on this device.
            </p>
            <Button
              variant="outline"
              onClick={handleLogout}
              className="border-destructive/50 text-destructive hover:bg-destructive/10"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </Card>

      {/* Footer Info */}
      <div className="mt-8 text-xs text-muted-foreground text-center space-y-1">
        <p>Account created: {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'Unknown'}</p>
        <p>Birthmark v1.0 • All your data is stored securely</p>
      </div>
    </div>
  )
}
