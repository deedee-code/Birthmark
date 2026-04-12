'use client'

import { useState } from 'react'
import { useAuth } from '@/contexts/auth-context'
import { useRouter } from 'next/navigation'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Settings, LogOut, AlertCircle, User, Bell, Shield, ShieldAlert, BadgeCheck } from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { cn } from '@/lib/utils'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

export default function SettingsPage() {
  const { user, updateProfile, updatePassword, logout, deleteAccount } = useAuth()
  const router = useRouter()
  const [name, setName] = useState(user?.name || '')
  const [notificationsEnabled, setNotificationsEnabled] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  
  // Password state
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isChangingPassword, setIsChangingPassword] = useState(false)
  const [passwordMessage, setPasswordMessage] = useState('')
  const [passwordMessageType, setPasswordMessageType] = useState<'success' | 'error'>('success')

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

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault()
    setPasswordMessage('')

    if (!currentPassword || !newPassword || !confirmPassword) {
      setPasswordMessageType('error')
      setPasswordMessage('All password fields are required')
      return
    }

    if (newPassword !== confirmPassword) {
      setPasswordMessageType('error')
      setPasswordMessage('New passwords do not match')
      return
    }

    if (newPassword.length < 6) {
      setPasswordMessageType('error')
      setPasswordMessage('New password must be at least 6 characters')
      return
    }

    try {
      setIsChangingPassword(true)
      await updatePassword(currentPassword, newPassword)
      setPasswordMessageType('success')
      setPasswordMessage('Password updated successfully')
      setCurrentPassword('')
      setNewPassword('')
      setConfirmPassword('')
      setTimeout(() => setPasswordMessage(''), 3000)
    } catch (error: any) {
      setPasswordMessageType('error')
      setPasswordMessage(error.message || 'Failed to update password')
    } finally {
      setIsChangingPassword(false)
    }
  }

  const handleLogout = async () => {
    await logout()
    router.push('/login')
  }

  const handleConfirmDelete = async () => {
    try {
      await deleteAccount()
      router.push('/login')
    } catch (error) {
      alert('Failed to delete account')
    }
  }

  return (
    <div className="p-4 sm:p-6 lg:p-10 max-w-6xl mx-auto min-h-screen">
      {/* Header Area */}
      <div className="mb-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-extrabold mb-2 flex items-center gap-3 text-primary tracking-tighter">
            <Settings className="h-10 w-10 p-2 bg-primary/10 rounded-2xl animate-spin-slow" />
            Settings
          </h1>
          <p className="text-muted-foreground font-medium text-lg">Manage your account and preferences.</p>
        </div>
        <div className="flex gap-3">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => router.push('/dashboard')}
            className="rounded-xl border-border/60 font-bold hover:bg-muted"
          >
            Back to Dashboard
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleLogout}
            className="rounded-xl text-muted-foreground hover:text-destructive hover:bg-destructive/5 font-bold"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Sign Out
          </Button>
        </div>
      </div>

      <Tabs defaultValue="account" className="flex flex-col lg:flex-row gap-8 items-start">
        {/* Left Sidebar Pane */}
        <aside className="w-full lg:w-80 shrink-0 space-y-6">
          <Card className="p-6 border-border/40 bg-card/50 backdrop-blur-xl shadow-xl rounded-3xl overflow-hidden relative">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-accent to-red-500" />
            <div className="flex flex-col items-center text-center">
              <div className="h-20 w-20 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center text-3xl font-black text-white shadow-2xl shadow-primary/20 mb-4 ring-4 ring-background">
                {user?.name?.charAt(0) || user?.email?.charAt(0) || 'U'}
              </div>
              <h3 className="text-lg font-black tracking-tight">{user?.name || 'Anonymous User'}</h3>
              <p className="text-xs text-muted-foreground font-mono mb-6 whitespace-nowrap overflow-hidden text-ellipsis w-full px-2">{user?.email}</p>
              
              <TabsList className="flex flex-col w-full bg-transparent p-0 gap-2 h-auto">
                <TabsTrigger 
                  value="account" 
                  className="w-full justify-start gap-3 px-4 py-3 rounded-xl data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:shadow-primary/20 transition-all border border-transparent hover:border-border/60"
                >
                  <User className="h-4 w-4" />
                  <span className="font-bold">General</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="notifications" 
                  className="w-full justify-start gap-3 px-4 py-3 rounded-xl data-[state=active]:bg-accent data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:shadow-accent/20 transition-all border border-transparent hover:border-border/60"
                >
                  <Bell className="h-4 w-4" />
                  <span className="font-bold">Reminders</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="security" 
                  className="w-full justify-start gap-3 px-4 py-3 rounded-xl data-[state=active]:bg-foreground data-[state=active]:text-background data-[state=active]:shadow-lg transition-all border border-transparent hover:border-border/60"
                >
                  <Shield className="h-4 w-4" />
                  <span className="font-bold">Security</span>
                </TabsTrigger>
              </TabsList>
            </div>
          </Card>
        </aside>

        {/* Right Content Pane */}
        <main className="flex-1 w-full space-y-6">
          <TabsContent value="account" className="mt-0 space-y-6 animate-in fade-in slide-in-from-right-4 duration-500 outline-none">
            <Card className="p-8 border-border/40 shadow-xl rounded-3xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-8 opacity-5 text-primary pointer-events-none group-hover:scale-110 transition-transform duration-700">
                <User size={120} />
              </div>

              <div className="flex items-center gap-3 mb-8">
                <div className="h-10 w-1.5 bg-primary rounded-full shadow-lg shadow-primary/20" />
                <div>
                  <h2 className="text-2xl font-black tracking-tighter">Identity Settings</h2>
                  <p className="text-xs text-muted-foreground font-medium">Update your profile.</p>
                </div>
              </div>

              {message && (
                <div className={`mb-8 flex gap-4 rounded-2xl p-5 border animate-in zoom-in-95 duration-500 shadow-sm ${
                  messageType === 'success'
                    ? 'bg-green-500/5 text-green-700 dark:text-green-400 border-green-500/20'
                    : 'bg-destructive/5 text-destructive border-destructive/20'
                }`}>
                  <AlertCircle className="h-6 w-6 flex-shrink-0" />
                  <p className="text-sm font-bold tracking-tight">{message}</p>
                </div>
              )}

              <form onSubmit={handleNameChange} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-1" htmlFor="email">
                    Email Address
                  </label>
                  <div className="relative group/input">
                    <Input
                      id="email"
                      type="email"
                      value={user?.email || ''}
                      disabled
                      className="h-12 bg-muted/30 cursor-not-allowed border-dashed focus-visible:ring-0 rounded-xl"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-1" htmlFor="name">
                    Full Name
                  </label>
                  <Input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Full name"
                    className="h-12 rounded-xl focus:ring-primary/20 transition-all border-border/60"
                  />
                </div>

                <div className="pt-6 border-t border-border/40 flex justify-end">
                  <Button type="submit" disabled={isSaving} className="h-12 px-10 rounded-xl font-black bg-primary text-white shadow-xl shadow-primary/20 hover:shadow-primary/40 active:scale-95 transition-all">
                    {isSaving ? 'Updating...' : 'Save Changes'}
                  </Button>
                </div>
              </form>
            </Card>

            {/* Danger Zone */}
            <Card className="p-8 border-destructive/20 bg-destructive/[0.02] rounded-3xl relative overflow-hidden group">
               <div className="absolute -bottom-4 -right-4 opacity-5 text-destructive pointer-events-none group-hover:rotate-12 transition-transform duration-1000">
                <ShieldAlert size={100} />
              </div>
              
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-destructive/10 rounded-xl">
                  <ShieldAlert className="h-6 w-6 text-destructive" />
                </div>
                <div>
                  <h2 className="text-xl font-black tracking-tighter text-destructive">Danger Zone</h2>
                  <p className="text-xs text-muted-foreground/60">Manage high-risk account operations.</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 border border-destructive/10 rounded-2xl bg-background/50 backdrop-blur-sm">
                <div>
                  <h3 className="font-bold text-sm mb-1">Permanent Deletion</h3>
                  <p className="text-[11px] text-muted-foreground max-w-sm font-medium">
                    This will wipe all your birthmarks, contacts, and personal data from our servers.
                  </p>
                </div>
                
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="outline"
                      className="h-10 px-6 rounded-xl border-destructive/30 text-destructive hover:bg-destructive hover:text-white transition-all font-black text-xs shrink-0"
                    >
                      Delete Account
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent className="rounded-3xl border-border/40 shadow-2xl">
                    <AlertDialogHeader>
                      <AlertDialogTitle className="text-2xl font-black tracking-tighter flex items-center gap-3">
                        <div className="p-2 bg-destructive/10 rounded-xl">
                          <ShieldAlert className="h-5 w-5 text-destructive" />
                        </div>
                        Final Confirmation
                      </AlertDialogTitle>
                      <AlertDialogDescription className="text-base font-medium leading-relaxed pt-2">
                        Are you absolutely sure you want to delete your account? This action is <span className="text-destructive font-black underline underline-offset-4 font-mono">permanent</span> and will erase all your birthmarks and contact information.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter className="pt-6">
                      <AlertDialogCancel className="rounded-xl font-bold border-border/60">Cancel</AlertDialogCancel>
                      <AlertDialogAction 
                        onClick={handleConfirmDelete}
                        className="rounded-xl font-black bg-destructive text-white hover:bg-destructive/90 shadow-lg shadow-destructive/20"
                      >
                        Yes, Delete My Data
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="notifications" className="mt-0 space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
            <Card className="p-8 border-border/40 shadow-xl rounded-3xl min-h-[400px] flex flex-col justify-between overflow-hidden relative group">
              <div className="absolute top-0 right-0 p-8 opacity-5 text-accent pointer-events-none group-hover:rotate-12 transition-transform duration-700">
                <Bell size={120} />
              </div>

              <div>
                <div className="flex items-center gap-3 mb-10">
                  <div className="h-10 w-1.5 bg-accent rounded-full shadow-lg shadow-accent/20" />
                  <div>
                    <h2 className="text-2xl font-black tracking-tighter">Reminders & Alerts</h2>
                    <p className="text-xs text-muted-foreground font-medium">Control how and when you want to be notified.</p>
                  </div>
                </div>
                
                <div className="space-y-6">
                  <div 
                    className="flex items-center justify-between p-6 border border-border/60 rounded-3xl bg-card hover:bg-muted/10 transition-all cursor-pointer group/item shadow-sm hover:shadow-lg hover:border-accent/30"
                    onClick={() => setNotificationsEnabled(!notificationsEnabled)}
                  >
                    <div className="flex gap-5 items-center">
                      <div className={cn(
                        "p-4 rounded-2xl transition-all duration-500 shadow-inner",
                        notificationsEnabled ? "bg-accent/10 text-accent shadow-accent/5 scale-110" : "bg-muted text-muted-foreground grayscale"
                      )}>
                        <Bell className="h-6 w-6" />
                      </div>
                      <div>
                        <p className="font-black text-base tracking-tight mb-1">Birthday Reminders</p>
                        <p className="text-[13px] text-muted-foreground leading-relaxed max-w-xs">
                          Instantly notified when one of your favorite people is having a special day.
                        </p>
                      </div>
                    </div>
                    <div 
                      className={cn(
                        "relative inline-flex items-center h-7 w-14 rounded-full transition-all duration-500 shadow-inner",
                        notificationsEnabled ? 'bg-accent' : 'bg-muted-foreground/30'
                      )}
                    >
                      <span
                        className={cn(
                          "inline-block w-5 h-5 transform bg-white rounded-full transition-all duration-500 shadow-lg",
                          notificationsEnabled ? 'translate-x-[32px]' : 'translate-x-[5px]'
                        )}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-12 p-6 bg-accent/5 rounded-[2rem] border border-accent/10 flex items-center gap-5 border-dashed">
                <div className="p-4 bg-accent/10 rounded-2xl shrink-0">
                   <Shield className="h-6 w-6 text-accent" />
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-black text-accent tracking-tighter">Precision Privacy</p>
                  <p className="text-xs text-muted-foreground font-medium leading-relaxed">
                    We never sell your contact data. Birthmark sends automated greetings only when you authorize them through this interface.
                  </p>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="security" className="mt-0 space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
            <Card className="p-8 border-border/40 shadow-xl rounded-3xl relative overflow-hidden group">
               <div className="absolute top-0 right-0 p-8 opacity-5 text-foreground pointer-events-none group-hover:-translate-y-2 transition-transform duration-700">
                <Shield size={120} />
              </div>

              <div className="flex items-center gap-3 mb-10">
                <div className="h-10 w-1.5 bg-foreground rounded-full shadow-lg" />
                <div>
                  <h2 className="text-2xl font-black tracking-tighter">Security Credentials</h2>
                  <p className="text-xs text-muted-foreground font-medium">Manage your account security.</p>
                </div>
              </div>

              {passwordMessage && (
                <div className={`mb-10 flex gap-4 rounded-2xl p-5 border animate-in zoom-in-95 duration-500 shadow-sm ${
                  passwordMessageType === 'success'
                    ? 'bg-green-500/5 text-green-700 dark:text-green-400 border-green-500/20'
                    : 'bg-destructive/5 text-destructive border-destructive/20'
                }`}>
                  <AlertCircle className="h-6 w-6 flex-shrink-0" />
                  <p className="text-sm font-bold tracking-tight">{passwordMessage}</p>
                </div>
              )}

              <form onSubmit={handlePasswordChange} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-1" htmlFor="currentPassword">
                    Current Secure Password
                  </label>
                  <Input
                    id="currentPassword"
                    type="password"
                    placeholder="Enter current password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    className="h-12 bg-muted/20 rounded-xl"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-1" htmlFor="newPassword">
                      New Secret Phrase
                    </label>
                    <Input
                      id="newPassword"
                      type="password"
                      placeholder="Min. 6 chars"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="h-12 rounded-xl"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground ml-1" htmlFor="confirmPassword">
                      Validate Phrase
                    </label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      placeholder="Repeat new password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="h-12 rounded-xl"
                    />
                  </div>
                </div>

                <div className="pt-8 border-t border-border/40 flex justify-end">
                  <Button type="submit" disabled={isChangingPassword} className="h-12 px-12 rounded-xl font-black bg-foreground text-background shadow-xl hover:shadow-2xl hover:scale-[1.02] active:scale-95 transition-all">
                    {isChangingPassword ? 'Updating...' : 'Update'}
                  </Button>
                </div>
              </form>
            </Card>
          </TabsContent>
        </main>
      </Tabs>
    </div>
  )
}
