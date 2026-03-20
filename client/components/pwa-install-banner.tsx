'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { X, Download } from 'lucide-react'

export function PWAInstallBanner() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null)
  const [isVisible, setIsVisible] = useState(false)

  const [isIOS, setIsIOS] = useState(false)

  useEffect(() => {
    // Detect iOS
    const isIOSDevice = [
      'iPad Simulator',
      'iPhone Simulator',
      'iPod Simulator',
      'iPad',
      'iPhone',
      'iPod'
    ].includes(navigator.platform) || (navigator.userAgent.includes("Mac") && "ontouchend" in document)
    
    setIsIOS(isIOSDevice)

    const handler = (e: any) => {
      e.preventDefault()
      setDeferredPrompt(e)
      const dismissed = sessionStorage.getItem('pwa-banner-dismissed')
      if (!dismissed) {
        setIsVisible(true)
      }
    }

    window.addEventListener('beforeinstallprompt', handler)

    // Fallback for iOS since beforeinstallprompt isn't supported
    if (isIOSDevice && !window.matchMedia('(display-mode: standalone)').matches) {
      const dismissed = sessionStorage.getItem('pwa-banner-dismissed')
      if (!dismissed) {
        setIsVisible(true)
      }
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handler)
    }
  }, [])

  const handleInstallClick = async () => {
    if (!deferredPrompt) return

    // Show the install prompt
    deferredPrompt.prompt()

    // Wait for the user to respond to the prompt
    const { outcome } = await deferredPrompt.userChoice
    console.log(`User response to the install prompt: ${outcome}`)

    // We've used the prompt, and can't use it again, throw it away
    setDeferredPrompt(null)
    setIsVisible(false)
  }

  const handleDismiss = () => {
    setIsVisible(false)
    sessionStorage.setItem('pwa-banner-dismissed', 'true')
  }

  if (!isVisible) return null

  return (
    <div className="bg-primary text-primary-foreground px-4 py-2 sm:px-6 lg:px-8 relative animate-in fade-in slide-in-from-top duration-500 z-[60]">
      <div className="mx-auto max-w-7xl flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="bg-white/20 p-1.5 rounded-lg hidden sm:block">
            <Download className="h-4 w-4" />
          </div>
          <p className="text-sm font-medium">
            {isIOS 
              ? <span>Tap <span className="underline underline-offset-2">Share</span> then <span className="font-bold whitespace-nowrap">"Add to Home Screen"</span> for the <span className="font-bold">Birthmark</span> App</span>
              : <span>Install <span className="font-bold">Birthmark</span> on your home screen for the best experience!</span>
            }
          </p>
        </div>
        <div className="flex items-center gap-2">
          {!isIOS && deferredPrompt && (
            <Button 
              onClick={handleInstallClick}
              variant="secondary" 
              size="sm" 
              className="h-8 px-3 text-xs sm:text-sm font-semibold whitespace-nowrap"
            >
              Install App
            </Button>
          )}
          <button 
            onClick={handleDismiss}
            className="p-1 hover:bg-white/10 rounded-full transition-colors flex-shrink-0"
            aria-label="Dismiss"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  )
}
