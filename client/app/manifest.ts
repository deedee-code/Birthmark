import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Birthmark',
    short_name: 'Birthmark',
    description: 'Automated birthday wishes for your loved ones',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#000000',
    icons: [
      {
        src: '/icons/birthmark-192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icons/birthmark-512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}