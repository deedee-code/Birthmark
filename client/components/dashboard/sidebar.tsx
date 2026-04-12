'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useAuth } from '@/contexts/auth-context'
import { Button } from '@/components/ui/button'
import {
  Cake,
  Users,
  MessageSquare,
  Settings,
  LogOut,
  Home,
  BarChart3,
  Menu,
  X,
  User,
  ChevronUp,
} from 'lucide-react'
import { useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

const navItems = [
  { href: '/dashboard', icon: Home, label: 'Dashboard', exact: true },
  { href: '/dashboard/contacts', icon: Users, label: 'Contacts' },
  { href: '/dashboard/birthdays', icon: Cake, label: 'Upcoming Birthdays' },
  { href: '/dashboard/messages', icon: MessageSquare, label: 'Message Templates' },
  { href: '/dashboard/settings', icon: Settings, label: 'Settings' },
]

export function Sidebar() {
  const pathname = usePathname()
  const { user, logout } = useAuth()
  const [isOpen, setIsOpen] = useState(false)

  const handleLogout = async () => {
    await logout()
  }

  const isActive = (href: string, exact?: boolean) => {
    if (exact) return pathname === href
    return pathname.startsWith(href)
  }

  return (
    <>
      {/* Mobile Menu Trigger */}
      <div className="fixed top-4 right-4 z-50 md:hidden">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center justify-center w-12 h-12 rounded-2xl bg-background/80 backdrop-blur-xl border border-border/60 shadow-lg hover:bg-background transition-all active:scale-90 group"
          aria-label="Toggle Menu"
        >
          {isOpen ? (
            <X className="h-6 w-6 text-primary group-hover:rotate-90 transition-transform duration-300" />
          ) : (
            <Menu className="h-6 w-6 text-primary group-hover:scale-110 transition-transform duration-300" />
          )}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } fixed md:relative md:translate-x-0 left-0 top-0 z-30 h-screen w-64 bg-sidebar border-r border-sidebar-border transition-transform duration-200 flex flex-col`}
      >
        {/* Header */}
        <div className="border-b border-sidebar-border px-6 py-5">
          <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <div className="bg-primary/10 p-1.5 rounded-lg">
              <img src="/icons/logo.png" alt="Birthmark" className="h-8 w-8 object-contain" />
            </div>
            <span className="font-bold text-lg tracking-tight text-sidebar-foreground">Birthmark</span>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon
            const active = isActive(item.href, item.exact)
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  active
                    ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                    : 'text-sidebar-foreground hover:bg-sidebar-accent/50'
                }`}
              >
                <Icon className="h-5 w-5" />
                {item.label}
              </Link>
            )
          })}
        </nav>

        {/* Footer */}
        <div className="border-t border-sidebar-border p-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="w-full flex items-center gap-3 p-2 rounded-xl hover:bg-sidebar-accent/50 transition-all duration-300 group text-left outline-hidden">
                <Avatar className="h-10 w-10 border-2 border-primary/10 shadow-sm group-hover:border-primary/30 transition-colors">
                  <AvatarFallback className="bg-primary/10 text-primary font-bold text-xs">
                    {user?.name?.charAt(0) || user?.email?.charAt(0) || 'U'}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 overflow-hidden">
                  <p className="text-sm font-bold text-sidebar-foreground truncate tracking-tight">
                    {user?.name || 'User'}
                  </p>
                  <p className="text-[11px] text-sidebar-foreground/60 truncate font-medium">
                    {user?.email}
                  </p>
                </div>
                <ChevronUp className="h-4 w-4 text-sidebar-foreground/40 group-hover:text-sidebar-foreground transition-colors" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent 
              side="top" 
              align="start" 
              className="w-56 p-2 rounded-2xl border-sidebar-border bg-sidebar-card shadow-2xl animate-in fade-in zoom-in-95 duration-200 mb-2"
            >
              <DropdownMenuLabel className="px-2 pb-2">
                <p className="text-[10px] font-black uppercase tracking-widest text-sidebar-foreground/40">My Account</p>
              </DropdownMenuLabel>
              <Link href="/dashboard/settings">
                <DropdownMenuItem className="rounded-xl gap-3 cursor-pointer">
                  <User className="h-4 w-4" />
                  <span className="font-bold">Profile Settings</span>
                </DropdownMenuItem>
              </Link>
              <DropdownMenuSeparator className="bg-sidebar-border opacity-50" />
              <DropdownMenuItem 
                onClick={handleLogout}
                className="rounded-xl gap-3 text-destructive focus:bg-destructive/10 focus:text-destructive cursor-pointer"
              >
                <LogOut className="h-4 w-4" />
                <span className="font-bold">Sign Out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/50 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  )
}
