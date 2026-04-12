'use client'

import { useEffect } from 'react'

export function SwRegister() {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').then((registration) => {
        // Check for updates periodically
        registration.update();
      }).catch((error) => {
        console.error('Service Worker registration failed:', error)
      })

      // Reload the page when a new service worker takes over
      let refreshing = false;
      navigator.serviceWorker.addEventListener('controllerchange', () => {
        if (!refreshing) {
          window.location.reload();
          refreshing = true;
        }
      });
    }
  }, [])

  return null
}
