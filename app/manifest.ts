import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Alsnippets | WordPress Support & Maintenance',
    short_name: 'Alsnippets',
    description: 'Soporte técnico real, optimización y snippets para WordPress.',
    start_url: '/',
    display: 'standalone',
    background_color: '#0a0a0a',
    theme_color: '#c9a34e',
    icons: [
      {
        src: '/icon.png',
        sizes: 'any',
        type: 'image/png',
      },
    ],
  }
}